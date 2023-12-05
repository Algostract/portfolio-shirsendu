/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      '3xs': ['0.5rem', '0.5625rem'],
      '2xs': ['0.625rem', '0.75rem'],
      xs: ['0.75rem', '0.875rem'],
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
      '4xl': ['3rem', '3.625rem'],
      '5xl': ['3.5rem', '4.1875rem'],
    },
    fontFamily: {
      head: ['"Exo 2"', 'sans-serif'],
      body: ['"Exo 2"', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      regular: 400,
      'semi-bold': 500,
      bold: 600,
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {
        400: '#EDF0F5',
        500: '#C1C9D6',
        600: '#9AA5B8',
      },
      black: '#000000',
      dark: {
        400: '#0E0E11',
        500: '#22252A',
        600: '#2D2F34',
      },
      primary: {
        300: '#60A5fA',
        400: '#3B82F6',
        500: '#2563EB',
      }
    },
    extend: {
      animation: {
        'gradient-rotate': 'gradient-rotate 5s linear 0s infinite reverse',
      },
      keyframes: {
        'gradient-rotate': {
          '0%': { '--gradient-angle': '360deg' },
          '100%': { '--gradient-angle': '0deg' },
        }
      }
    }
  }
}

