/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: 'var(--dark)',
          accent: 'var(--accent)',
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          light: 'var(--light)',
          highlight: 'var(--highlight)',
        },
        solo: {
          dark: '#190019',
          purple: '#2B124C',
          accent: '#522B5B',
          highlight: '#854F6C',
          light: '#DFB6B2',
          beige: '#FBE4D8',
        }
      }
    },
  },
  plugins: [],
}

