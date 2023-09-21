// text-red-primary -> hex values
// text-gray-base -> hex values
// border-gray-primary -> hex values
// text-blue-primary -> hex values


module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  fill: (theme) => ({
    'red': theme('colors.red.500'),
  }),
  content: [
    './src/**/*.{html, js, ts, vue}',
    './src/**/*'
  ],
  theme: {
    colors: {
      white: {
        normal: '#ffffff',
      },
      black: {
        normal: '#000000',
      },
      blue: {
        primary: '#343843',
        secondary: '#21252E',
        tertiary: '#11141D',
      },
      gray: {
        primary: '#959DA6',
        secondary: '#99A0AA'
      }

    },
    // FONTS
    fontFamily: {
      // Nunita Sans
      'Nunito': ['Nunito Sans', 'sans-serif'],
   
    }
  },
  variants: {
    extend: {
      display: ['group-hover', 'dropdown'],
    }
  },
  plugins: [require('tailwindcss-dropdown')]

};

