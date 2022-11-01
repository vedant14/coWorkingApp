module.exports = {
  content: ["./pages/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        "light-green": "#F0FBF8",
        "dark-green": "#1C4848",
        "pastel-red": "#FA7E6D",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(139.83deg, #56B5DA -1.86%, #62D6BA 117.55%);",
      },
      dropShadow: {
        "custom-button": "5px 5px 0px rgba(209,167,87,1) ",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
};
