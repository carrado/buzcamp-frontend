/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "bz-",
  theme: {
    extend: {
      colors: {
        flame: "#F15A29",
        darkPurple: "#321C3B",
        chartPurple: "#490166",
        jet: "#333333",
        romanSilver: "#878E99",
        cultured: "#EEEEEE",
        carrotOrange: "#E99323",
        blueCrayola: "rgba(34, 75, 218, 1)",
        ceruleanBlue: "#3454D1",
        queenPink: "#EACEE3",
        lightOrange: "#F4D5B0",
        mediumSeaGreen: "#13B56A",
        desire: "#EA3C53",
        ghostWhite: "#F7F7FF",
        white: "#FFFFFF",
        optima: "#1A32CC",
        ally: "#F57A4D",
        dome: "#08633B",
        lite: "#4EA4F4",
        quantum: "#303030",
        optimaBlack: "#070707",
        grayScale: "rgba(78, 93, 120, 1)",
        primaryBlue: "#377DFF"
      },
      backgroundColor: {
        "lightest-red": "rgba(243, 233, 233, 1)",
        "light-sea-green": "rgba(19, 181, 106, 0.08)",
        "light-dark-ash": "rgba(238, 238, 238, 1)",
        "dark-blue": "rgba(34, 75, 218, 1)",
        "primary-black": "rgba(23, 32, 57, 1)",
        "modal-white": "rgba(255, 255, 255, 0.5)",
        input: "#ECECF4",
      },
      width: {},
      boxShadow: {
        logo: "33px 14px 43px 2px rgba(0, 0, 0, 0.15)",
        modal: "0px 19px 19px 1px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {},
      zIndex: {},
      inset: {},
    },
  },
  plugins: [],
};
