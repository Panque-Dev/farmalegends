/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#e5c587",
        "primary-container": "#c8aa6e",
        "secondary": "#43e2d2",
        "secondary-container": "#00c6b7",
        "surface": "#081325",
        "surface-container-lowest": "#040e20",
        "surface-container-low": "#111c2e",
        "surface-container": "#152032",
        "surface-container-high": "#202a3d",
        "surface-container-highest": "#2b3548",
        "surface-bright": "#2f394d",
        "on-surface": "#d8e2fc",
        "on-surface-variant": "#d0c5b5",
        "outline": "#998f81",
        "outline-variant": "#4d463a",
        "background": "#081325",
        "error": "#ffb4ab",
        "error-container": "#93000a",
      },
      fontFamily: {
        "display": ["Cinzel", "serif"],
        "headline": ["Cormorant Garamond", "serif"],
        "body": ["Plus Jakarta Sans", "sans-serif"],
        "mono": ["Fira Code", "monospace"]
      }
    },
  },
  plugins: [],
}
