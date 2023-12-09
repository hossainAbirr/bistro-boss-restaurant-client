/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
     fontCinzel : ['Cinzel', 'serif'],
     fontInter : ['Inter', 'sans-serif']
    }
  },
  plugins: [require("daisyui")],
};
