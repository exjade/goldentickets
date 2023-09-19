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

    },
    // FONTS
    fontFamily: {
      // lato
      'lato-300': ['Lato', 'sans-serif;'],
      'lato-100': ['Lato', 'sans-serif;'],
      'lato-bold-700': ['Lato', 'sans-serif;'],
      'lato-900': ['Lato', 'sans-serif;'],
    }
  },
  variants: {
    extend: {
      display: ['group-hover', 'dropdown'],
    }
  },
  plugins: [require('tailwindcss-dropdown')]

};

