import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4edea3',
          hover: '#3bc48a',
          active: '#2aa876',
        },
        error: {
          DEFAULT: '#ffb4ab',
          hover: '#ff9a8e',
        },
        background: '#0c1324',
        surface: {
          DEFAULT: '#191f31',
          hover: '#232a3d',
        },
        'on-surface': {
          DEFAULT: '#dce1fb',
          muted: '#9aa3c2',
        },
        'on-primary': '#0c1324',
        border: {
          DEFAULT: '#2a3147',
          hover: '#3a4159',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
