/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020817',
          900: '#0a1628',
          800: '#0d1f3c',
          700: '#122650',
          600: '#1b3568',
        },
        accent: { DEFAULT: '#0ea5e9', dark: '#0284c7', light: '#38bdf8' },
        gold: '#f97316',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
