/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // gray2: "#041733",
        // gray2: "#0D253C",
        gray2: "#041733",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        upload: `url('/photo.svg')`,
        card: "linear-gradient(44.21deg, rgb(255, 255, 255) -1.964%, rgb(244, 247, 255) 107.765%)",
      },
      boxShadow: {
        card: "0px 10px 15px 0px rgba(82, 130, 255, 0.06)",
        footer: "0px -3px 20px 0px rgba(45, 45, 45, 0.14);",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
