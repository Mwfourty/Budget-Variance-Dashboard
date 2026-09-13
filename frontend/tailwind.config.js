/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          25: '#fafafa',
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0a0a0a',
        },
        ember: {
          100: '#ffedd5',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f2600e',
          600: '#ea580c',
          700: '#c2410c',
        },
        oled: {
          DEFAULT: '#000000',
          panel: '#0a0a0a',
          border: '#262626',
        },
        negative: '#dc2626',
        positive: '#16a34a',
        pending: '#ca8a04',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}