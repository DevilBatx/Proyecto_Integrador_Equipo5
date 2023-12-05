/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        "custom-color": "#F2EFDF", 
        "custom-color": "#D97236",
        "custom-color": "#F2A649",
      },
      borderWidth: {
        '60': '60px',
      },
    }, 
  },
  plugins: [
    require('flowbite/plugin')
  ],
}