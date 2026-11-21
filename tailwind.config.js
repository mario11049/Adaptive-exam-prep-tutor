/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#17213D',
          dark: '#0F1629',
          light: '#232F52',
          surface: '#1E2A4A'
        },
        indigo: {
          brand: '#6658D3',
          hover: '#5546C4',
          subtle: '#EEECFC',
          light: '#F4F3FD'
        },
        lavender: {
          brand: '#A99CF7',
          soft: '#E8E4FD'
        },
        teal: {
          emerald: '#159B85',
          light: '#E2F7F3',
          border: '#A3E8DC'
        },
        amber: {
          warm: '#E6A448',
          light: '#FEF6E9',
          border: '#F8D8A8'
        },
        coral: {
          muted: '#E16D78',
          light: '#FDEFF0',
          border: '#F6B8BD'
        },
        surface: {
          main: '#F7F8FC',
          white: '#FFFFFF',
          secondary: '#EEF0F7',
          border: '#E2E6F0',
          hover: '#F2F4FA'
        }
      },
      fontFamily: {
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        metric: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'card': '16px',
        'btn': '11px',
        'pill': '9999px'
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(23, 33, 61, 0.04), 0 1px 2px -1px rgba(23, 33, 61, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(23, 33, 61, 0.08), 0 2px 6px -1px rgba(23, 33, 61, 0.04)',
        'popover': '0 12px 32px -4px rgba(23, 33, 61, 0.14), 0 4px 12px -2px rgba(23, 33, 61, 0.08)',
        'float-btn': '0 10px 25px -5px rgba(102, 88, 211, 0.4), 0 8px 10px -6px rgba(102, 88, 211, 0.2)'
      }
    },
  },
  plugins: [],
}
