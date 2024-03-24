/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primaryColor: "#000",
      secondaryColor: "#fff",

      primaryHoverColor: "#000000cb",
      secondaryHoverColor: "#ffffff94",

      tertiaryColor: "rgb(156 163 175)",
      tertiaryHoverColor: "#ffffffcc",
      tertiaryActiveColor: "#ffffff",
    },
    screens: {
      sm: [{ max: "500px" }],
    },
  },
  plugins: [],
};
