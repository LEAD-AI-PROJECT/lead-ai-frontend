/** @type {import('tailwindcss').Config} */
module.exports = {
     content: [
          "./src/app/**/*.{js,ts,jsx,tsx,css,scss,sass}",
          "./src/components/**/*.{js,ts,jsx,tsx,css,scss,sass}",
          "./src/pages/**/*.{js,ts,jsx,tsx,css,scss,sass}",
          // include node_modules if you use classes from packages
          "./node_modules/daisyui/dist/**/*.js",
     ],
     theme: {
          extend: {},
     },
     plugins: [require("daisyui")],
     daisyui: {
          themes: ["light", "dark"],
     },
};
