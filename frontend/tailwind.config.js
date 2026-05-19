/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Surface
        'surface': '#f8f9fa',
        'surface-dim': '#d9dadb',
        'surface-bright': '#f8f9fa',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f3f4f5',
        'surface-container': '#edeeef',
        'surface-container-high': '#e7e8e9',
        'surface-container-highest': '#e1e3e4',
        'surface-variant': '#e1e3e4',
        'surface-tint': '#635b6e',
        'on-surface': '#191c1d',
        'on-surface-variant': '#49454c',
        'inverse-surface': '#2e3132',
        'inverse-on-surface': '#f0f1f2',
        // Primary
        'primary': '#635b6e',
        'on-primary': '#ffffff',
        'primary-container': '#f4e8ff',
        'on-primary-container': '#70677a',
        'inverse-primary': '#cdc2d8',
        'primary-fixed': '#eadef5',
        'primary-fixed-dim': '#cdc2d8',
        'on-primary-fixed': '#1f1929',
        'on-primary-fixed-variant': '#4b4455',
        // Secondary (Coral)
        'secondary': '#a43b2f',
        'on-secondary': '#ffffff',
        'secondary-container': '#fd7d6c',
        'on-secondary-container': '#71160f',
        'secondary-fixed': '#ffdad5',
        'secondary-fixed-dim': '#ffb4a9',
        'on-secondary-fixed': '#410000',
        'on-secondary-fixed-variant': '#84241a',
        // Tertiary (Purple)
        'tertiary': '#6d3bd7',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#f2e9ff',
        'on-tertiary-container': '#7a49e4',
        'tertiary-fixed': '#e9ddff',
        'tertiary-fixed-dim': '#d0bcff',
        'on-tertiary-fixed': '#23005c',
        'on-tertiary-fixed-variant': '#5516be',
        // Background
        'background': '#f8f9fa',
        'on-background': '#191c1d',
        // Outline
        'outline': '#7a757c',
        'outline-variant': '#cbc4cc',
        // Error
        'error': '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
      },
      borderRadius: {
        sm: '0.5rem',
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      spacing: {
        'container-margin': '20px',
        'gutter': '12px',
        'section-gap': '40px',
        'component-padding': '16px',
        'chip-gap': '8px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Pretendard', 'sans-serif'],
      },
      fontSize: {
        'headline-lg': ['32px', { lineHeight: '1.4', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-sm': ['20px', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.7', letterSpacing: '0.01em', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }],
        'headline-lg-mobile': ['26px', { lineHeight: '1.3', fontWeight: '700' }],
        'chat-bubble': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      boxShadow: {
        'purple-sm': '0 4px 20px rgba(139, 92, 246, 0.04)',
        'purple-md': '0 10px 30px rgba(139, 92, 246, 0.08)',
        'purple-lg': '0 25px 50px rgba(139, 92, 246, 0.15)',
        'card-glow': '0 10px 30px rgba(139, 92, 246, 0.08), inset 0 0 15px rgba(234, 222, 245, 0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bubbleSlideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'bubble-in': 'bubbleSlideUp 0.3s ease-out forwards',
      },
      maxWidth: {
        app: '768px',
      },
    },
  },
  plugins: [],
}
