/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./features/**/*.{js,ts,jsx,tsx,mdx}",
        "./providers/**/*.{js,ts,jsx,tsx,mdx}",
        "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'background-primary': '#0f1419',
                'background-secondary': '#1a2632',
                'background-navbar': '#0f1419',
                'background-sidebar': '#0f1419',
                'text-primary': '#ffffff',
                'text-secondary': '#94a3b8',
                'text-muted': '#64748b',
                'accent': '#3b82f6',
                'accent-hover': '#2563eb',
                'border-light': '#2d3748',
                'border': '#1f2937',
            }
        },
    },
}