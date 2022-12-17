/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                desktop: '1250px',
                large: '1450px',
                // Max container width = 1520 + 7em margin eachside (7*20px = 140px, 280 px total) = 1800
                largest: '1800px',
            },
        },
    },
    plugins: [],
};
