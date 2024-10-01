/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{css,scss,sass}",
  ],
  theme: {
    extend: {
      screens: {
        xxsm: "100px",
        xsm: "150px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      dropShadow: {
        custom: "#00000050 10px 7px 5px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#DDD",
        // 'primary-color': 'rgb(49,188,175)',
        "secondary-color": "#202020",
        // 'primary-color': '#666',
        "primary-color": "#00e769",
        // "primary-color": "#D5A115",
        // 'primary-color': '#ff0000',
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        sprite: {
          "0%": {
            backgroundPosition: "100%",
          },
          "100%": {
            backgroundPosition: "-100%",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      calibri: ["--font-calibri", "Calibri", "Montserrat", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-animate")],
});
