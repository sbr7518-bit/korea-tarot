# AI Server API 명세

## 기본 정보
Base URL: http://localhost:8000/ai/v1
Framework: FastAPI

---

## 공통 규칙

### 호출 주체
- AI 서버 API는 **Backend 서버에서만 호출** 한다
- 프론트엔드에서 직접 호출하지 않는다
- Frontend → Backend → AI Server

### 공통 오류 코드

| HTTP Status | 설명 |
|---|---|
| 400 | 잘못된 요청 (필수값 누락 등) |
| 422 | 유효성 검증 실패 (FastAPI 기본) |
| 500 | AI 서버 내부 오류 |
| 503 | OpenAI API 연결 실패 |

---

## 1. 헬스 체크

### 1-1. 서버 상태 확인
GET /health

**Response 200**
```json
{
  "status": "ok",
  "faiss_loaded": true,
  "openai_connected": true
}
```

> Backend 서버 시작 시 AI 서버 상태를 먼저 확인하는 용도

---

## 2. 타로 해석 API

### 2-1. 타로 카드 해석 요청
POST /interpret
**Request**
```json
{
  "concern": "요즘 이직을 고민 중인데 어떻게 해야 할까요?",
  "cards": [
    {
      "tarot_cards_id": 1,
      "name_kr": "광대",
      "name_en": "The Fool",
      "position": 1,
      "position_label": "과거"
    },
    {
      "tarot_cards_id": 15,
      "name_kr": "악마",
      "name_en": "The Devil",
      "position": 2,
      "position_label": "현재"
    },
    {
      "tarot_cards_id": 42,
      "name_kr": "완드 에이스",
      "name_en": "Ace of Wands",
      "position": 3,
      "position_label": "미래"
    }
  ]
}
```

**처리 흐름**
1. 요청 유효성 검증 (카드 3장, concern 길이)
2. 각 카드 ID로 FAISS에서 관련 문서 검색 (카드당 top-3)
3. 검색된 문서 + 고민 + 카드 정보를 프롬프트에 조합
4. OpenAI API 호출
5. 해석 결과 반환

**Response 200**
```json
{
  "interpretation": "과거를 나타내는 광대 카드는 새로운 시작과 순수한 열정을 상징합니다. 당신이 이직을 처음 꿈꾸던 시절의 설렘이 느껴집니다. 현재의 악마 카드는 현실적인 제약과 두려움을 나타냅니다. 안정적인 현재 직장에 대한 집착이 당신을 붙잡고 있을 수 있습니다. 미래의 완드 에이스는 새로운 열정과 창의적인 기회를 암시합니다. 용기를 내어 도전한다면 더 큰 성취가 기다리고 있습니다."
}
```

**Error**
| 상황 | Status | 설명 |
|---|---|---|
| 카드 3장 아님 | 400 | "cards는 반드시 3개여야 합니다" |
| concern 누락 | 400 | "concern은 필수값입니다" |
| FAISS 검색 실패 | 500 | "문서 검색에 실패했습니다" |
| OpenAI 호출 실패 | 503 | "AI 서비스에 일시적인 문제가 발생했습니다" |

---

## 3. FAISS 관리 API

### 3-1. FAISS 인덱스 재빌드
POST /faiss/rebuild

> 카드 설명 문서가 변경되었을 때 인덱스를 다시 빌드하는 용도
> 운영 중에는 거의 사용하지 않음

**Response 200**
```json
{
  "status": "ok",
  "indexed_count": 78,
  "message": "FAISS 인덱스가 재빌드되었습니다"
}
```
