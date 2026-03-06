/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0071E3",
        textColor: "#bcbcbc",
        activeTextColor: "#0066ff61",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    // other plugins...
  ],
};
