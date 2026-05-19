export default function BrandLogo() {
  return (
    <div className="text-center mb-10">
      {/* 타로 카드 모양 로고 */}
      <div className="relative mx-auto mb-5" style={{ width: 56, height: 80 }}>
        <svg viewBox="0 0 56 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_16px_rgba(167,139,250,0.5)]">
          {/* 카드 배경 */}
          <rect x="1" y="1" width="54" height="78" rx="7" fill="#1a0a2e" stroke="url(#borderGrad)" strokeWidth="1.5"/>
          {/* 장식 테두리 내부 */}
          <rect x="5" y="5" width="46" height="70" rx="4" stroke="url(#innerBorder)" strokeWidth="0.8" strokeDasharray="3 2"/>

          {/* 초승달 */}
          <path d="M28 20 C22 20 18 25 18 31 C18 37 22 42 28 42 C24 40 21 36 21 31 C21 26 24 22 28 20Z" fill="url(#moonGrad)"/>
          {/* 달 광채 */}
          <circle cx="28" cy="31" r="8" fill="url(#moonGlow)" opacity="0.15"/>

          {/* 별 3개 */}
          <g fill="url(#starGrad)">
            {/* 중앙 큰 별 */}
            <path d="M28 48 L29.2 51.6 L33 51.6 L30 53.8 L31.2 57.4 L28 55.2 L24.8 57.4 L26 53.8 L23 51.6 L26.8 51.6Z"/>
            {/* 좌측 작은 별 */}
            <path d="M16 37 L16.8 39.4 L19.4 39.4 L17.3 40.9 L18.1 43.3 L16 41.8 L13.9 43.3 L14.7 40.9 L12.6 39.4 L15.2 39.4Z" opacity="0.7" transform="scale(0.7) translate(7, 13)"/>
            {/* 우측 작은 별 */}
            <path d="M40 37 L40.8 39.4 L43.4 39.4 L41.3 40.9 L42.1 43.3 L40 41.8 L37.9 43.3 L38.7 40.9 L36.6 39.4 L39.2 39.4Z" opacity="0.7" transform="scale(0.7) translate(-5, 13)"/>
          </g>

          {/* 하단 장식 점들 */}
          <g fill="#a78bfa" opacity="0.5">
            <circle cx="20" cy="66" r="1.2"/>
            <circle cx="28" cy="66" r="1.2"/>
            <circle cx="36" cy="66" r="1.2"/>
          </g>

          <defs>
            <linearGradient id="borderGrad" x1="0" y1="0" x2="56" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a78bfa"/>
              <stop offset="50%" stopColor="#e879f9"/>
              <stop offset="100%" stopColor="#a78bfa"/>
            </linearGradient>
            <linearGradient id="innerBorder" x1="0" y1="0" x2="56" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#e879f9" stopOpacity="0.3"/>
            </linearGradient>
            <linearGradient id="moonGrad" x1="18" y1="20" x2="28" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f0e6ff"/>
              <stop offset="100%" stopColor="#c4b5fd"/>
            </linearGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa"/>
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a"/>
              <stop offset="100%" stopColor="#f59e0b"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h1 className="text-headline-lg-mobile font-bold text-on-surface tracking-tight">Mistik Tarot</h1>
      <p className="text-body-md text-on-surface-variant mt-1">AI 타로 상담 서비스</p>
    </div>
  )
}
