/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(0,190, 76, 0.1)",
          "0 0px 10px rgba(0,190, 76, 0.1)",
        ],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-1.5rem)" },
        },
        shadow: {
          "0%, 100%": { transform: "scaleX(1)", opacity: "0.4" },
          "50%": { transform: "scaleX(0.85)", opacity: "0.2" },
        },
        scaleUp: {
          "0%, 100%": { transform: "scaleX(1)", opacity: "0.4" },
          "50%": { transform: "scaleX(0.85)", opacity: "0.2" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shadow: "shadow 6s ease-in-out infinite",
      },
    },
    colors: {
      white: "#ffffff",
      "dark-grey": "#171717",
      "light-grey": "#353535",
      green: "#00BE4C",
      grey: "#a3a3a3",
    },
  },
  plugins: [],
};
