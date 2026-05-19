# Backend API 명세

## 공통 규칙

### Base URL

http://localhost:8080/api/v1

### 인증
- JWT Bearer Token 사용
- 인증이 필요한 API는 요청 헤더에 토큰 포함
- Authorization: Bearer {token}

### 공통 응답 형식

```json
// 성공
{
  "status": 200,
  "message": "success",
  "data": { }
}

// 실패
{
  "status": 400,
  "message": "오류 메시지",
  "data": null
}
```

### 공통 오류 코드

| HTTP Status | 설명 |
|---|---|
| 400 | 유효성 검증 실패 |
| 401 | 인증 실패 (토큰 없음 / 만료) |
| 403 | 인가 실패 (본인 리소스 아님) |
| 404 | 리소스 없음 |
| 500 | 서버 내부 오류 |

---

## 1. 인증 API

### 1-1. 회원가입
POST /auth/signup
인증: 불필요

**Request**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "또미"
}
```

**Response 201**
```json
{
  "status": 201,
  "message": "success",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "nickname": "또미",
    "createdAt": "2026-05-19T10:00:00"
  }
}
```

> 회원가입 성공 후 프론트엔드는 `/login`으로 리다이렉트한다. 자동 로그인 없음.

**Error**
| 상황 | Status | message |
|---|---|---|
| 필수값 누락 | 400 | "필수 항목을 입력해주세요" |
| 이메일 형식 오류 | 400 | "올바른 이메일 형식을 입력해주세요" |
| 이메일 중복 | 400 | "이미 사용 중인 이메일입니다" |
| 비밀번호 형식 오류 | 400 | "비밀번호는 영문, 숫자를 포함한 8자 이상이어야 합니다" |

---

### 1-2. 로그인
POST /auth/login
인증: 불필요

**Request**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response 200**
```json
{
  "status": 200,
  "message": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "tokenType": "Bearer",
    "nickname": "또미"
  }
}
```

**Error**
| 상황 | Status | message |
|---|---|---|
| 이메일 없음 | 401 | "이메일 또는 비밀번호를 확인해주세요" |
| 비밀번호 불일치 | 401 | "이메일 또는 비밀번호를 확인해주세요" |
| 탈퇴한 회원 | 401 | "탈퇴한 계정입니다" |

---

### 1-3. 로그아웃
POST /auth/logout
인증: 필요

> JWT는 stateless이므로 서버에서 토큰을 무효화하지 않는다.
> 프론트엔드가 localStorage의 토큰을 삭제하는 것으로 처리한다.
> 백엔드는 인증 확인 후 200만 반환한다.

**Response 200**
```json
{
  "status": 200,
  "message": "success",
  "data": null
}
```

---

## 2. 타로 카드 API

### 2-1. 카드 전체 목록 조회
GET /cards
인증: 불필요

**Response 200**
```json
{
  "status": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "광대",
      "nameEn": "The Fool",
      "cardNumber": 0,
      "arcanaType": "MAJOR",
      "suit": "NONE",
      "imageUrl": "https://..."
    }
  ]
}
```

---

### 2-2. 카드 단건 조회
GET /cards/{cardId}
인증: 불필요

**Response 200**
```json
{
  "status": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "광대",
    "nameEn": "The Fool",
    "cardNumber": 0,
    "arcanaType": "MAJOR",
    "suit": "NONE",
    "description": "새로운 시작, 순수함, 모험을 상징한다.",
    "imageUrl": "https://..."
  }
}
```

**Error**
| 상황 | Status | message |
|---|---|---|
| 카드 없음 | 404 | "존재하지 않는 카드입니다" |

---

## 3. 상담 API

### 3-1. 상담 생성 (해석 요청)
POST /consultations
인증: 필요

**Request**
```json
{
  "concern": "요즘 이직을 고민 중인데 어떻게 해야 할까요?",
  "cards": [
    { "cardId": 1,  "position": 1 },
    { "cardId": 15, "position": 2 },
    { "cardId": 42, "position": 3 }
  ]
}
```

**처리 흐름**
1. 유효성 검증 (고민 10~500자, 카드 3장, 중복 카드 체크)
2. consultations 테이블에 PENDING 상태로 저장
3. consultation_cards 3건 저장
4. AI 서버에 해석 요청 (POST /ai/v1/interpret)
5. 해석 결과를 interpretation 컬럼에 저장
6. 상태를 COMPLETED로 업데이트
7. 결과 반환 (실패 시 FAILED로 업데이트)

**Response 201**
```json
{
  "status": 201,
  "message": "success",
  "data": {
    "id": 42,
    "concern": "요즘 이직을 고민 중인데 어떻게 해야 할까요?",
    "interpretation": "과거 카드인 광대는...(AI 해석 텍스트)",
    "status": "COMPLETED",
    "cards": [
      {
        "position": 1,
        "positionLabel": "과거",
        "card": {
          "id": 1,
          "name": "광대",
          "nameEn": "The Fool",
          "arcanaType": "MAJOR",
          "suit": "NONE",
          "imageUrl": "https://...",
          "description": "새로운 시작, 순수함, 모험을 상징한다."
        }
      },
      {
        "position": 2,
        "positionLabel": "현재",
        "card": {
          "id": 15,
          "name": "악마",
          "nameEn": "The Devil",
          "arcanaType": "MAJOR",
          "suit": "NONE",
          "imageUrl": "https://...",
          "description": "유혹, 속박, 물질주의를 상징한다."
        }
      },
      {
        "position": 3,
        "positionLabel": "미래",
        "card": {
          "id": 42,
          "name": "완드 에이스",
          "nameEn": "Ace of Wands",
          "arcanaType": "MINOR",
          "suit": "WANDS",
          "imageUrl": "https://...",
          "description": "창의적 에너지, 새로운 시작, 열정을 상징한다."
        }
      }
    ],
    "createdAt": "2026-05-19T10:00:00"
  }
}
```

**Error**
| 상황 | Status | message |
|---|---|---|
| 비로그인 | 401 | "로그인이 필요합니다" |
| 고민 내용 누락 | 400 | "고민 내용을 입력해주세요" |
| 고민 내용 길이 오류 | 400 | "고민 내용은 10자 이상 500자 이하로 입력해주세요" |
| 카드 3장 미만/초과 | 400 | "타로 카드를 3장 선택해주세요" |
| 카드 중복 선택 | 400 | "같은 카드를 중복 선택할 수 없습니다" |
| AI 서버 오류 | 500 | "해석 생성에 실패했습니다. 다시 시도해주세요" |

---

### 3-2. 상담 기록 목록 조회
GET /consultations
인증: 필요

> 무한 스크롤 지원. page=0부터 시작하여 `hasNext: false`가 될 때까지 요청한다.

**Query Parameter**
| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|---|---|---|---|---|
| page | int | N | 0 | 페이지 번호 (0-based) |
| size | int | N | 10 | 페이지 크기 |

**Response 200**
```json
{
  "status": 200,
  "message": "success",
  "data": {
    "content": [
      {
        "id": 42,
        "concern": "요즘 이직을 고민 중인데...",
        "status": "COMPLETED",
        "cards": [
          { "position": 1, "name": "광대", "imageUrl": "https://..." },
          { "position": 2, "name": "악마", "imageUrl": "https://..." },
          { "position": 3, "name": "완드 에이스", "imageUrl": "https://..." }
        ],
        "createdAt": "2026-05-19T10:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "hasNext": false
  }
}
```

---

### 3-3. 상담 기록 상세 조회
GET /consultations/{consultationId}
인증: 필요

**Response 200**
```json
{
  "status": 200,
  "message": "success",
  "data": {
    "id": 42,
    "concern": "요즘 이직을 고민 중인데 어떻게 해야 할까요?",
    "interpretation": "과거 카드인 광대는...(AI 해석 텍스트 전문)",
    "status": "COMPLETED",
    "cards": [
      {
        "position": 1,
        "positionLabel": "과거",
        "card": {
          "id": 1,
          "name": "광대",
          "nameEn": "The Fool",
          "arcanaType": "MAJOR",
          "suit": "NONE",
          "imageUrl": "https://...",
          "description": "새로운 시작, 순수함, 모험을 상징한다."
        }
      },
      {
        "position": 2,
        "positionLabel": "현재",
        "card": {
          "id": 15,
          "name": "악마",
          "nameEn": "The Devil",
          "arcanaType": "MAJOR",
          "suit": "NONE",
          "imageUrl": "https://...",
          "description": "유혹, 속박, 물질주의를 상징한다."
        }
      },
      {
        "position": 3,
        "positionLabel": "미래",
        "card": {
          "id": 42,
          "name": "완드 에이스",
          "nameEn": "Ace of Wands",
          "arcanaType": "MINOR",
          "suit": "WANDS",
          "imageUrl": "https://...",
          "description": "창의적 에너지, 새로운 시작, 열정을 상징한다."
        }
      }
    ],
    "createdAt": "2026-05-19T10:00:00"
  }
}
```

**Error**
| 상황 | Status | message |
|---|---|---|
| 상담 없음 | 404 | "존재하지 않는 상담입니다" |
| 본인 상담 아님 | 403 | "접근 권한이 없습니다" |

---

### 3-4. 상담 기록 삭제
DELETE /consultations/{consultationId}
인증: 필요

**Response 200**
```json
{
  "status": 200,
  "message": "success",
  "data": null
}
```

**Error**
| 상황 | Status | message |
|---|---|---|
| 상담 없음 | 404 | "존재하지 않는 상담입니다" |
| 본인 상담 아님 | 403 | "접근 권한이 없습니다" |
