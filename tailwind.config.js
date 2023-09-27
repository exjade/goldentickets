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
        createAccount: '#408BFC',
        placeholder: '#02346C',
        button: '#0A58B9',
        h4: '#408BFC',
        terms: '#2977EC',
        numbers: '#2977EC'
      },
      gray: {
        primary: '#959DA6',
        secondary: '#99A0AA',
        text: '#6B7B95',
        text2: '#93A0B4',

      },
      green: {
        primary: '#0C4D13',
        secondary: '#259682',
      },
      pink: {
        primary: '#AB2E58'
      },
      yellow: {
        pending: '#FFDE5D'
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

