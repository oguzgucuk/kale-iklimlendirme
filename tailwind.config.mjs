/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/preline/preline.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#0ea5b7',
          600: '#0891a5',
          700: '#0e7485',
          800: '#155e6c',
          900: '#164e59',
          950: '#08333c',
        },
        navy: {
          900: '#101828',
          950: '#0b0f19',
        },
        surface: {
          DEFAULT: '#F7F8FA',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        alert: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
