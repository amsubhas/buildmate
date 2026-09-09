/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#010C1E',
          900: '#071428',
          800: '#0D1F42',
          700: '#122550',
          600: '#1A2F60',
        },
        // Official Buildmate Brand Colors
        brand: {
          DEFAULT: '#192D78',   // Primary Blue
          dark:    '#13245F',
          mid:     '#2F4590',
          light:   '#52639F',
        },
        red: {
          DEFAULT: '#C8281E',   // Primary Red
          dark:    '#B8241B',
          600:     '#D73732',
          400:     '#DC5550',
        },
        accent: {
          DEFAULT: '#192D78',
          dark:    '#13245F',
          light:   '#2F4590',
        },
        gold: '#C8281E',   // Red replaces old orange
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient':  'linear-gradient(135deg, #192D78 0%, #2F4590 100%)',
        'red-gradient':    'linear-gradient(135deg, #C8281E 0%, #D73732 100%)',
      },
      animation: {
        'float':      'floatSide 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s infinite',
        'marquee':    'marquee 30s linear infinite',
        'spin-slow':  'spin 8s linear infinite',
      },
      boxShadow: {
        'brand':  '0 8px 32px rgba(25,45,120,0.35)',
        'red':    '0 8px 32px rgba(200,40,30,0.35)',
        'glow':   '0 0 30px rgba(25,45,120,0.25)',
      }
    },
  },
  plugins: [],
}
