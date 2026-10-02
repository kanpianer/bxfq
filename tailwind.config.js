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
        obsidian: {
          950: '#050608',
          900: '#090a0f',
          850: '#0e1117',
          800: '#141821',
          750: '#1c212c',
          700: '#252b3a',
          600: '#384152',
          500: '#525d73',
          400: '#7e8a9f',
          300: '#b0b8c6',
          200: '#d7dce4',
          100: '#f0f3f8',
          50: '#f8fafc',
        },
      },
      fontFamily: {
        sans: [
          '"LXGW WenKai"',
          '"LXGW WenKai TC"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'glow-subtle': '0 0 25px -5px rgba(255, 255, 255, 0.05)',
        'glow-white': '0 0 20px -3px rgba(255, 255, 255, 0.12)',
      },
    },
  },
  plugins: [],
}
