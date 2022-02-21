module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#effafb",
        "primary-blue": "#21bdca",
        "sky-blue": "#25d5e6",
        "dark-color": "#0e5359",
        "brown-color":"#666666"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};
