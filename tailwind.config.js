/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: "'Roboto', sans-serif;",
      },
      boxShadow: {
        cardPost: ` 3px 0px 33px 0px rgba(0,0,0,0.75)
        -webkit-box-shadow: 3px 0px 33px 0px rgba(0,0,0,0.75)
        -moz-box-shadow: 3px 0px 33px 0px rgba(0,0,0,0.75)`,
      },
    },
  },
  plugins: [],
};
