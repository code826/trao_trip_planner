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
        midnight: {
          DEFAULT: '#0B1120',
          900: '#0F172A',
          800: '#111827',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
          400: '#64748B',
          300: '#94A3B8',
          200: '#CBD5E1',
          100: '#E2E8F0',
          50: '#F1F5F9',
        },
        gold: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          deep: '#D97706',
          glow: 'rgba(245, 158, 11, 0.25)',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          glow: 'rgba(6, 182, 212, 0.2)',
        },
        // Legacy aliases for compatibility
        terracotta: '#F59E0B',
        terracottaDark: '#D97706',
        sage: '#06B6D4',
        sageDark: '#0891B2',
        cream: '#0B1120',
        creamDark: '#0F172A',
        charcoal: '#E2E8F0',
        'charcoal-light': '#CBD5E1',
        'accent-blue': '#06B6D4',
        'accent-gold': '#F59E0B',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        serif: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit': 'orbit-plane 8s linear infinite',
        'globe-rotate': 'globe-spin 40s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'glow': 'glow-pulse 3s ease-in-out infinite',
        'neon': 'neon-pulse 3s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
