/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{jsx,js}",
    "./src/views/app/**/*.{jsx,js}"
  ],
  theme: {
    letterSpacing: {
      wide: '.25em'
    },
    colors: {
      'dark-chocolate': '#401303',
      'watermelon': '#F25757',
      'sunny-yellow': '#f2d06b',
      'wood': '#8C4C27',
      'pale-wood': '#A68C76',
      'paper': '#FFF8E3',
      'green' : '#AFBF73',
      'dark-green': '#538c51',
      'white': '#FFFFFF',
      'black': '#000000',
      'transparent': 'transparent'
    },
    fontFamily: {
      title: ['newyork','sans'],
      subtitle: ['agrandir','sans'],
      paragraph: ['montserrat','sans']
    },
    screens: {
      'xxxsm': '320px',
      'xxsm': '375px',
      'xsm': '390px',
      'sm': '414px',
      'md': '640px',
      'md2': '900px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1400px',
      'xxxl': '1815px',
    },
    extend: {
      fontSize: {
        'sm': '12px',
        'base': '14px',
        'base2': '16px',
        'base3': '18px',
        'md' : '24px',
        'md2' : '32px',
        'lg': '48px',
        'xl': '72px',
        'xxl': '96px',
        'xxxl': '144px',
      },
      margin: {
        '0': '0',
        auto: 'auto',
      },
      padding: {
        '0': '0',
      },
      borderRadius: {
        'base': '200px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class' 
    }),
    require('@tailwindcss/container-queries'),
  ],
}

