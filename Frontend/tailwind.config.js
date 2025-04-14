
import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // Enables dark mode using class strategy
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Include all your files
    theme: { extend: {} },
    plugins: [daisyui],
  };
  