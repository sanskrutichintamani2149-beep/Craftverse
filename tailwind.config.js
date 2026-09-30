/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#040A1C',
          navy: '#071433',
          navyLight: '#0B2A6B',
          blue: '#1346E0',
          cyan: '#12B8FF',
          teal: '#19E3C0',
          glow: '#2F7BFF',
        },
        surface: {
          dark: 'rgba(7, 20, 51, 0.65)',
          darkBorder: 'rgba(40, 200, 255, 0.3)',
          light: 'rgba(230, 239, 251, 0.8)',
          lightBorder: 'rgba(255, 255, 255, 0.8)',
        },
        typography: {
          headingDark: '#FFFFFF',
          bodyDark: '#B8C7E6',
          mutedDark: '#7F92B8',
          headingLight: '#0B1B4A',
          bodyLight: '#5B6B8C',
          mutedLight: '#8C9BB5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glass-glow': '0 0 35px -5px rgba(18, 184, 255, 0.25)',
        'btn-glow': '0 4px 20px -2px rgba(19, 70, 224, 0.45), 0 0 15px -2px rgba(25, 227, 192, 0.3)',
        'card-glow': '0 8px 32px 0 rgba(7, 20, 51, 0.4), inset 0 0 0 1px rgba(40, 200, 255, 0.25)',
        'card-glow-hover': '0 12px 40px 0 rgba(18, 184, 255, 0.25), inset 0 0 0 1px rgba(40, 200, 255, 0.45)',
      },
      borderRadius: {
        'card': '22px',
        'tile': '18px',
        'btn': '16px',
        'field': '14px',
      },
      backdropBlur: {
        'glass': '16px',
      }
    },
  },
  plugins: [],
}
