/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'find-blue': '#3B82F6',
        'find-orange': '#F97316',
        'find-green': '#10B981',
        'find-purple': '#8B5CF6',
        'find-pink': '#EC4899',
        't007-intro': '#5B5BCC',
        't007-summary': '#D5DBF9',
        't009-special': '#FFB74D',
        't010-summary': '#E8F5E9',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        'japanese': ['Noto Sans JP', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
        't009-special': ['M PLUS Rounded 1c', 'Noto Sans JP', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}