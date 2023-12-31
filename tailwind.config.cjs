/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fuchsia: {
          '50': '#fdf6fd',
          '100': '#fbecfb',
          '200': '#f6d8f6',
          '300': '#efb8ec',
          '400': '#e48edf',
          '500': '#d362cc',
          '600': '#b643ac',
          '700': '#97348d',
          '800': '#7b2d72',
          '900': '#6d2c64',
          '950': '#42103b',
        },
        eggplant: {
          '50': '#fbf8fa',
          '100': '#f6f0f7',
          '200': '#eee0ee',
          '300': '#dfc8de',
          '400': '#cba7ca',
          '500': '#b382b1',
          '600': '#956491',
          '700': '#7b5177',
          '800': '#654362',
          '900': '#4e364b',
          '950': '#341e32',
        },
        violet: {
          '50': '#f8f5f8',
          '100': '#f1ecf3',
          '200': '#e5dce9',
          '300': '#d6c7da',
          '400': '#c6afca',
          '500': '#b79aba',
          '600': '#a883a8',
          '700': '#927091',
          '800': '#775c77',
          '900': '#614e61',
          '950': '#1f191f',
        },
        night: {
          '50': '#f8f6f9',
          '100': '#f1edf1',
          '200': '#ded7e0',
          '300': '#c0b4c5',
          '400': '#9e8ba5',
          '500': '#836d8a',
          '600': '#6c5772',
          '700': '#59475d',
          '800': '#4a3e4e',
          '900': '#413644',
          '950': '#1e191f',
        },
        cinder: {
          '50': '#f7f6f9',
          '100': '#efebf3',
          '200': '#dbd3e4',
          '300': '#baadcc',
          '400': '#9480b0',
          '500': '#766097',
          '600': '#624c7d',
          '700': '#503e66',
          '800': '#443656',
          '900': '#3c3149',
          '950': '#050406',
        },
      },
      boxShadow: {
        simpleInset: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
