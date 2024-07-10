/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'primary': '#987D9A',
        'secondary': '#BB9AB1',
        'tertiary': '#FEFBD8',
        'fourtiary': '#EECEB9'
      },
    },
  },
  plugins: [],
}

