/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mm: '410px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        animate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        animate: 'animate 2s infinite',
      },
      transitionDuration: {
        700: '700ms',
        800: '800ms',
      },
      scale: {
        120: '1.2',
      },
      placeholderColor: ['hover', 'focus'],
      borderRadius: {
        'custom-1': '6px 0 0 6px',
      },
      backgroundColor: {
        'custom-black': 'rgba(0, 0, 0, 0.4)',
      },
      colors: {
        white: '#FFF',
        black: '#000',

        'dark-900': '#101026',
        'dark-700': '#1D1D2E',

        'gray-100': '#8A8A8A',
        'gray-200': '#C8C8C8',

        'green-900': '#3fffa3',
        'red-900': '#FF3F4B',

        'placeholder-white': 'rgba(255, 255, 255, 0.8)',
      },
    },
  },
  plugins: [],
};
