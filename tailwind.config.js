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
          50: '#FDFCF9',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#E9E2D5',
        },
        muse: {
          // Category-specific subtle hues
          goal: {
            DEFAULT: '#E07A5F',
            light: '#FDF4F0',
            border: '#F6D2C4',
          },
          interest: {
            DEFAULT: '#6B8E70',
            light: '#F1F6F2',
            border: '#CCE0D0',
          },
          memory: {
            DEFAULT: '#7B7E9F',
            light: '#F3F3F9',
            border: '#D7D8E8',
          },
          milestone: {
            DEFAULT: '#C9934B',
            light: '#FAF5EC',
            border: '#F2DFBE',
          },
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(28, 25, 23, 0.05)',
        'soft-lg': '0 12px 32px -4px rgba(28, 25, 23, 0.08)',
        'soft-xl': '0 20px 48px -6px rgba(28, 25, 23, 0.10)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
