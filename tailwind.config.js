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
          "0%, 100%": { transform: "scaleX(0.85)", opacity: "0.2" },
          "50%": { transform: "scaleX(1)", opacity: "0.4" },
        },
        scaleUp: {
          "0%, 100%": { transform: "scaleX(1)", opacity: "0.4" },
          "50%": { transform: "scaleX(0.85)", opacity: "0.2" },
        },
        shake: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(2px, 2px) rotate(2deg)" },
          "50%": { transform: "translate(0, 0) rotate(0eg)" },
          "75%": { transform: "translate(-2px, 2px) rotate(-2deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        shakeUpDown: {
          "0%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(2px)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(-2px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shadow: "shadow 6s ease-in-out infinite",
        shake: "shake .5s ease-in-out infinite",
        shakeUpDown: "shakeUpDown .3s ease-in-out infinite",
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
