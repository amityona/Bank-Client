/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#a6bbe2',
        inputColor: '#c9d6ed',
        buttonColor: '#f4b183',
        balanceColor:'#2f5597'
      },
    },
  },
  plugins: [],
}

