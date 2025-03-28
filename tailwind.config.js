/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme dynamic colors
        'theme-primary': 'rgb(var(--theme-primary-rgb) / <alpha-value>)',
        'theme-secondary': 'rgb(var(--theme-secondary-rgb) / <alpha-value>)',
        'theme-accent': 'rgb(var(--theme-accent-rgb) / <alpha-value>)',
        'theme-dark': 'rgb(var(--theme-dark-rgb) / <alpha-value>)',
        'theme-light': 'rgb(var(--theme-light-rgb) / <alpha-value>)',
        
        // Solo Leveling theme
        'solo-purple': '#522B5B',
        'solo-accent': '#854F6C',
        'solo-dark': '#120011',
        'solo-light': '#F6F6F6',
        'solo-beige': '#DECFC8',
      },
      backgroundImage: {
        'theme-gradient': 'linear-gradient(to bottom right, rgb(var(--theme-dark-rgb)), rgb(var(--theme-primary-rgb) / 0.3), rgb(var(--theme-dark-rgb)))',
      },
      boxShadow: {
        'theme': '0 0 20px rgb(var(--theme-primary-rgb) / 0.3)',
      },
    },
  },
  plugins: [],
}

