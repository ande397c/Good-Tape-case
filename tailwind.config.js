/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        pulseScale: 'pulseScale 1.5s ease-in-out infinite'
      },
      keyframes: {
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.11)' }
        }
      },
      colors: {
        primary: '#853BFD',
        white: '#FFFFFF',
        black: '#000000',
        grey: '#dee1e3',
        primaryHover: '#5D10DA',
        primaryDisabled: '#BC93FE'
      }
    }
  },
  plugins: []
}
