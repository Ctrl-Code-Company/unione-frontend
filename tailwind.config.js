/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
    },
    extend: {
      boxShadow: {
        "custom-gray": "0 0 20px 0 gray",
        "button-card": "0 0 10px 0 gray",
      },
    },
  },
  plugins: [],
};
