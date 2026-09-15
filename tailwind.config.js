/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#07112F', 900: '#0B183D', 800: '#10245F', 700: '#162F72', 600: '#1C3B87',
        },
        brand: {
          DEFAULT: '#192D78', dark: '#10245F', mid: '#29469A', light: '#536BB2',
        },
        red: {
          DEFAULT: '#C8281E', dark: '#A82018', 600: '#C8281E', 400: '#D9564D',
        },
        accent: {
          DEFAULT: '#192D78', dark: '#10245F', light: '#536BB2',
        },
        gold: '#C8281E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #192D78 0%, #29469A 100%)',
        'red-gradient': 'linear-gradient(135deg, #C8281E 0%, #D9564D 100%)',
      },
      animation: {
        'float': 'floatSide 8s ease-in-out infinite', 'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite', 'marquee': 'marquee 30s linear infinite', 'spin-slow': 'spin 8s linear infinite',
      },
      boxShadow: {
        'brand': '0 8px 32px rgba(25,45,120,0.30)', 'red': '0 8px 32px rgba(200,40,30,0.28)',
        'glow': '0 0 30px rgba(25,45,120,0.22)',
      }
    },
  },
  plugins: [],
}
