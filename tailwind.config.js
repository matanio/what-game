/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                extendWidth: 'extendWidth 0.5s linear forwards',
            },
            keyframes: {
                extendWidth: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
            },
        },
    },
    plugins: [],
};
