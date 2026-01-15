/** @type {import('tailwindcss').Config} */
module.exports = {

    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                netflixRed: '#E50914',
                netflixBlack: '#000000',
                netflixDarkGray: '#141414',
                netflixGray: '#B3B3B3',
            },
        },
    },
    plugins: [],
}
