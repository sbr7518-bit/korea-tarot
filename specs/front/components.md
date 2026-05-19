# 컴포넌트 설계

## 폴더 구조

```
src/
├── api/
│   ├── client.js          # axios 인스턴스 (JWT 인터셉터)
│   ├── auth.js            # signup, login, logout
│   ├── cards.js           # getAll, getOne
│   └── consultations.js   # create, getList, getOne, remove
├── store/
│   └── authStore.js       # Zustand (token, user, setAuth, clearAuth) — localStorage 영속
├── hooks/
│   ├── useAuth.js         # 로그인/로그아웃 로직 래핑
│   └── useConsultation.js # 상담 생성·조회 로직
├── utils/
│   └── constants.js       # CARD_POSITIONS, API_ERRORS 등 상수
├── components/
│   ├── common/            # 범용 UI 원자
│   ├── layout/            # 앱 레이아웃 구조
│   └── tarot/             # 타로 특화 컴포넌트
└── pages/
    ├── AuthPage/
    ├── HomePage/
    ├── CardSelectPage/
    ├── ConsultationPage/
    └── HistoryPage/
```

---

## 공통 컴포넌트 (components/common)

### `Button`
| prop | type | 설명 |
|---|---|---|
| `variant` | `'primary' \| 'ghost' \| 'chip'` | 스타일 종류 |
| `size` | `'sm' \| 'md' \| 'lg'` | 크기 |
| `loading` | `boolean` | 로딩 스피너 + 비활성화 |
| `fullWidth` | `boolean` | `w-full` |
| `onClick` | `() => void` | 클릭 핸들러 |

- `primary`: coral(`#fd7d6c`) 배경, 흰 텍스트, pill shape
- `ghost`: 테두리 없음, tertiary 텍스트
- `chip`: lavender 배경, 선택 시 solid purple

### `Input`
| prop | type | 설명 |
|---|---|---|
| `label` | `string` | 라벨 텍스트 |
| `type` | `string` | input type |
| `error` | `string` | 에러 메시지 (하단 표시) |
| `rightIcon` | `ReactNode` | 비밀번호 토글 등 |

- 배경: `surface-container-low`, pill shape, no border
- focus: `ring-2 ring-tertiary-container`

### `ErrorMessage`
- `error-container` 배경, `error` 텍스트
- `text-label-md`, `rounded-md`, `px-4 py-2`

---

## 레이아웃 컴포넌트 (components/layout)

### `AppLayout`
- 최대 너비 `768px`, 중앙 정렬
- `children`을 `<main>` 안에 렌더링

### `Header`
| prop | type | 설명 |
|---|---|---|
| `title` | `string` | 중앙 타이틀 |
| `showBack` | `boolean` | 뒤로가기 버튼 |
| `rightAction` | `ReactNode` | 우측 아이콘/버튼 |

- `fixed top-0`, `backdrop-blur-md`, `shadow-purple-sm`
- 높이 64px

### `BottomNav`
- 홈(`/`) · 히스토리(`/history`) 탭 2개
- 활성 탭: `text-tertiary`, 비활성: `text-on-surface-variant`
- `fixed bottom-0`, `bg-surface-container-lowest`

---

## 타로 특화 컴포넌트 (components/tarot)

### `TarotCard`
| prop | type | 설명 |
|---|---|---|
| `card` | `CardDto \| null` | null이면 카드 뒷면 |
| `selected` | `boolean` | 선택 상태 (위로 올라가는 효과) |
| `position` | `1 \| 2 \| 3 \| null` | 과거/현재/미래 뱃지 |
| `onClick` | `() => void` | 선택 핸들러 |

- 뒷면: 보라 그라디언트 + 별 패턴 SVG
- 앞면: 카드 이미지 + 이름/부제 하단 오버레이
- 12px border-radius, `glow-card` shadow
- `tarot-card` CSS 클래스로 3D hover/selected 적용

### `ChatBubble`
| prop | type | 설명 |
|---|---|---|
| `role` | `'bot' \| 'user'` | 말풍선 방향/색상 |
| `children` | `ReactNode` | 내용 |
| `delay` | `number` | `bubble-in` 애니메이션 딜레이(ms) |

- bot: 흰 배경 + `border-tertiary-container`, `rounded-tl-none`
- user: `bg-tertiary-container`, `rounded-tr-none`

### `CardBottomSheet`
| prop | type | 설명 |
|---|---|---|
| `open` | `boolean` | 시트 열림 여부 |
| `onClose` | `() => void` | 닫기 핸들러 |
| `cards` | `CardDto[]` | 선택된 카드 배열 (최대 3개) |
| `interpretation` | `string` | AI 해석 전문 |

- 상단 70~90% 덮음, `rounded-t-lg`(32px)
- 바깥 클릭 시 닫힘 (backdrop blur)
- `bottom-sheet-transition` 클래스

### `CardPositionBadge`
| prop | type | 설명 |
|---|---|---|
| `position` | `1 \| 2 \| 3` | |

- 1: "과거" / 2: "현재" / 3: "미래"
- chip 스타일, `bg-tertiary-container text-tertiary`

### `TypingIndicator`
- AI 응답 대기 중 표시하는 세 점 애니메이션
- `ChatBubble` 내부에 렌더링

### `ConsultationHistoryCard`
| prop | type | 설명 |
|---|---|---|
| `consultation` | `ConsultationDto` | 상담 데이터 |
| `onClick` | `() => void` | 상세 이동 |
| `onDelete` | `() => void` | 삭제 핸들러 |

- 날짜 + 카드 3장 썸네일 (작은 size)
- 고민 텍스트 1줄 미리보기
- 우측 스와이프 또는 삭제 버튼

---

## DTO 타입 정의 (참고)

```js
// CardDto
{
  id: number,
  name: string,         // 한글 이름
  nameEn: string,       // 영문 이름
  arcanaType: 'MAJOR' | 'MINOR',
  suit: 'WANDS' | 'CUPS' | 'SWORDS' | 'PENTACLES' | 'NONE',
  imageUrl: string,
  description: string,
}

// ConsultationDto
{
  id: number,
  concern: string,
  status: 'PENDING' | 'COMPLETED' | 'FAILED',
  interpretation: string | null,
  cards: [
    { position: 1, card: CardDto },
    { position: 2, card: CardDto },
    { position: 3, card: CardDto },
  ],
  createdAt: string,   // ISO 8601
}
```
