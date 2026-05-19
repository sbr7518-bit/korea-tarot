# 🔮 Mistik Tarot

> AI 기반 타로 상담 서비스

---

## 프로젝트 개요

사용자가 고민을 입력하고 타로 카드 3장을 선택하면,  
RAG 기반 AI가 카드 설명 문서를 참조하여 맥락 있는 해석을 제공하는 웹 서비스.

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| Frontend | React (Vite) |
| Backend | Spring Boot, Spring Data JPA, Spring Security |
| AI Server | Python FastAPI, OpenAI API, FAISS |
| Database | PostgreSQL |
| 인증 | JWT |
| 배포 | 미정 |

---

## 시스템 아키텍처
[사용자]
↕ HTTP
[Frontend - React/Vite :3000]
↕ REST API (JWT)
[Backend - Spring Boot :8080]
↕ REST                    ↕ JPA
[AI Server - FastAPI :8000]  [PostgreSQL :5432]
↕
[OpenAI API]

---

## 기능 범위

### IN Scope
- 회원가입 / 로그인 / 로그아웃
- 고민 입력 + 타로 카드 3장 선택
- AI RAG 기반 해석 생성
- 상담 기록 저장 / 목록 / 상세 조회
- 상담 기록 삭제 (소프트 딜리트)

### OUT of Scope
- 소셜 로그인
- 결제 / 유료 플랜
- 실시간 채팅 상담
- 카드 역방향(리버스) 해석
- 관리자 페이지

---

## 스펙 문서 목록

| 문서 | 경로 | 설명 |
|---|---|---|
| ERD | `specs/backend/erd.md` | 테이블 설계 + DDL |
| 도메인 규칙 | `specs/backend/domain.md` | 비즈니스 규칙 + ENUM |
| Backend API | `specs/backend/api.md` | REST API 명세 전체 |
| AI Server API | `specs/ai-server/api.md` | AI 서버 엔드포인트 명세 |
| RAG 설계 | `specs/ai-server/rag.md` | FAISS 구조 + 프롬프트 |
| 화면 설계 | `specs/front/pages.md` | URL + 플로우차트 |
| 컴포넌트 | `specs/front/components.md` | 컴포넌트 트리 + props |

---

## 디렉토리 구조
```
korea-tarot/
├── specs/                    # 스펙 문서
│   ├── backend/              # api.md, domain.md, erd.md
│   ├── front/                # pages.md, components.md
│   └── ai-server/            # api.md, rag.md
├── backend/                  # Spring Boot 4.0.6
│   ├── src/
│   │   └── main/
│   │       ├── java/com/mistiktarot/
│   │       └── resources/    # application.yml
│   ├── build.gradle
│   └── gradlew
├── frontend/                 # React + Vite + Tailwind
│   └── src/
│       ├── api/              # axios 클라이언트 + 도메인별 API
│       ├── store/            # Zustand (authStore)
│       ├── hooks/            # 커스텀 훅
│       ├── components/       # common / layout / tarot
│       ├── pages/            # 라우트별 페이지
│       └── utils/
└── ai-server/                # FastAPI (기능 개발 시 생성)
```

---

## 개발 순서

1. 스펙 문서 작성 완료 → GitHub push
2. Backend 구현 (인증 → 카드 → 상담 API)
3. AI Server 구현 (FAISS 인덱싱 → RAG → 해석 API)
4. Frontend 구현 (라우팅 → 카드 선택 → 결과 페이지)
5. 통합 테스트 → PR → AI 코드 리뷰
