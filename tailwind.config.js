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
          DEFAULT: '#233C82',   // Primary Blue
          dark:    '#1B2F6A',
          mid:     '#465A96',
          light:   '#6473A5',
        },
        red: {
          DEFAULT: '#D72D23',   // Primary Red
          dark:    '#B8241B',
          600:     '#D73732',
          400:     '#DC5550',
        },
        accent: {
          DEFAULT: '#233C82',
          dark:    '#1B2F6A',
          light:   '#465A96',
        },
        gold: '#D72D23',   // Red replaces old orange
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient':  'linear-gradient(135deg, #233C82 0%, #465A96 100%)',
        'red-gradient':    'linear-gradient(135deg, #D72D23 0%, #D73732 100%)',
      },
      animation: {
        'float':      'floatSide 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s infinite',
        'marquee':    'marquee 30s linear infinite',
        'spin-slow':  'spin 8s linear infinite',
      },
      boxShadow: {
        'brand':  '0 8px 32px rgba(35,60,130,0.35)',
        'red':    '0 8px 32px rgba(215,45,35,0.35)',
        'glow':   '0 0 30px rgba(35,60,130,0.25)',
      }
    },
  },
  plugins: [],
}
