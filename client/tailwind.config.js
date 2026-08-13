/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F5',
          200: '#F5EFE9',
          300: '#EBE2D8',
        },
        blush: {
          100: '#FBE8EA',
          200: '#F4D3D6',
          300: '#E8B4B8',
          400: '#D8A48F',
          500: '#C58872',
        },
        lavender: {
          100: '#F1EEF8',
          200: '#E1D9F0',
          300: '#B5A6C9',
          400: '#9B8EB9',
          500: '#7E6F9D',
        },
        sage: {
          100: '#F0F4EC',
          200: '#DDE6D5',
          300: '#A3B18A',
          400: '#849368',
          500: '#64734A',
        },
        charcoal: {
          800: '#2D2727',
          900: '#1C1917',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
