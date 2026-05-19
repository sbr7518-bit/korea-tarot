# AI Server RAG 설계

## RAG란?
RAG (Retrieval-Augmented Generation)
검색(Retrieval) + 생성(Generation)의 결합.
LLM이 학습 데이터에 없는 도메인 지식을
외부 문서에서 검색하여 답변 품질을 높이는 방식.

일반 LLM 호출:
질문 → LLM → 답변 (학습 데이터 기반)

RAG:
질문 → 문서 검색(FAISS) → 관련 문서 추출
→ 문서 + 질문을 LLM에 주입 → 답변

---

## 전체 아키텍처
[사전 준비 - 서버 시작 시 1회]
카드 설명 문서 (78개 텍스트)
↓
Embedding 변환 (OpenAI text-embedding-ada-002)
↓
FAISS 인덱스 저장 (faiss_index.bin)
[실시간 요청 처리]
사용자 요청 (카드 3장 + 고민)
↓
카드별 FAISS 검색 (카드당 top-3 문서)
↓
검색 결과 + 고민 → 프롬프트 조합
↓
OpenAI GPT 호출
↓
해석 결과 반환

---

## FAISS 문서 구조

### 문서 단위
- 타로 카드 1장 = 문서 1개
- 총 78개 문서

### 문서 형식
[카드 ID: 1]
카드명: 광대 (The Fool)
아르카나: 메이저
번호: 0
핵심 키워드: 새로운 시작, 순수함, 모험, 자유, 잠재력
정방향 의미:
새로운 여정의 시작을 의미합니다. 두려움 없이 앞으로 나아가는
순수한 에너지를 상징하며, 무한한 가능성과 잠재력을 나타냅니다.
직업/이직: 새로운 도전을 두려워하지 마세요. 지금이 바로
새로운 커리어를 시작하기에 좋은 시기입니다.
연애: 새로운 만남의 시작 또는 관계의 새로운 국면을 의미합니다.
조언: 과거의 틀에서 벗어나 자유롭게 새로운 길을 걸어가세요.

### 파일 구조ai-server/
├── data/
│   └── tarot_docs/
│       ├── 00_the_fool.txt
│       ├── 01_the_magician.txt
│       ├── 02_the_high_priestess.txt
│       │   ... (78개)
│       └── 77_king_of_pentacles.txt
├── faiss/
│   ├── faiss_index.bin     ← FAISS 인덱스 저장 파일
│   └── faiss_metadata.json ← 인덱스 ↔ 카드 ID 매핑
└── main.py

### faiss_metadata.json 구조

```json
{
  "0": { "tarot_cards_id": 1, "name_kr": "광대", "name_en": "The Fool" },
  "1": { "tarot_cards_id": 2, "name_kr": "마법사", "name_en": "The Magician" }
}
```

> FAISS 인덱스 번호(0~77)와 DB의 tarot_cards_id를 매핑

---

## 프롬프트 설계

### System Prompt
당신은 전문 타로 상담사입니다.
사용자의 고민과 선택한 타로 카드를 바탕으로
따뜻하고 통찰력 있는 해석을 제공합니다.
규칙:

1. 반드시 한국어로 답변합니다.
2. 과거(position 1), 현재(position 2), 미래(position 3) 순서로 해석합니다.
3. 각 카드의 의미를 사용자의 고민과 연결하여 해석합니다.
4. 부정적인 카드도 긍정적이고 건설적인 방향으로 해석합니다.
5. 전체 해석은 500자 이내로 작성합니다.
6. 점술사처럼 단정짓지 않고, 가능성과 방향을 제시합니다.

### User Prompt 조합 방식
[사용자 고민]
{concern}
[선택한 카드 정보]

과거 카드: {card1.name_kr} ({card1.name_en})
현재 카드: {card2.name_kr} ({card2.name_en})
미래 카드: {card3.name_kr} ({card3.name_en})

[카드 참고 문서]
--- 과거 카드: {card1.name_kr} ---
{faiss_search_result_card1}
--- 현재 카드: {card2.name_kr} ---
{faiss_search_result_card2}
--- 미래 카드: {card3.name_kr} ---
{faiss_search_result_card3}
위 카드 정보와 참고 문서를 바탕으로 사용자의 고민에 맞는
타로 해석을 제공해주세요.

---

## OpenAI API 설정

```python
MODEL      = "gpt-4o-mini"    # 비용 효율적인 모델
MAX_TOKENS = 1000
TEMPERATURE = 0.7             # 창의적이되 일관성 유지
EMBEDDING_MODEL = "text-embedding-ada-002"
```

---

## 서버 시작 시 초기화 순서
1. faiss_index.bin 존재 여부 확인
    ├── 있음 → FAISS 인덱스 로드
    └── 없음 → 문서 임베딩 후 인덱스 생성 및 저장
2. OpenAI API 키 유효성 확인
3. FastAPI 서버 시작
4. /health 엔드포인트로 정상 여부 확인 가능


---

## 비용 고려사항
* Embedding (사전 준비, 1회성):

- 78개 문서 × 평균 300 tokens = 약 23,400 tokens
- text-embedding-ada-002: $0.0001 / 1K tokens
- 총 비용: 약 $0.003 (1회)

* 해석 요청 (실시간, 매 상담마다):

- 입력: 프롬프트 약 800 tokens
- 출력: 해석 약 300 tokens
- gpt-4o-mini 기준: 약 $0.001 / 상담 1건



