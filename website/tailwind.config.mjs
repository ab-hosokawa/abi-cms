/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind';
export default {
  content: [
    __dirname + '/pages/**/*.{js,ts,jsx,tsx,mdx}',
    __dirname + '/components/**/*.{js,ts,jsx,tsx,mdx}',
    __dirname + '/app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content({ base: __dirname + '/' }),
  ],
  darkMode: 'class',
  plugins: [flowbite.plugin()],
};
