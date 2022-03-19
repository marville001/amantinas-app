module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "light-blue": "#effafb",
        "primary-blue": "#21bdca",
        "sky-blue": "#25d5e6",
        "dark-blue-color": "#0e5359",
        "brown-color": "#666666",
        'dark-default':'#525659',
        'dark-primary-color':"#1f2024",
        'dark-secondary-color':"#232429",
        'gray-primary-color':"#2e2f34",
        'gray-secondary-color':"#393a3e",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};
