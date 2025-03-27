import type { Config } from "tailwindcss";

const config: Config = {
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
        'solo-dark': '#190019',
        'solo-purple': '#2B124C',
        'solo-accent': '#522B5B',
        'solo-highlight': '#854F6C',
        'solo-light': '#DFB6B2',
        'solo-beige': '#FBE4D8',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "theme-gradient": "linear-gradient(to bottom right, var(--dark), var(--primary) 20%, var(--dark))",
      },
      gridTemplateColumns: {
        // For the activity heatmap (26 weeks in 6 months)
        '26': 'repeat(26, minmax(0, 1fr))',
      },
      boxShadow: {
        'glow-sm': '0 0 4px rgba(var(--theme-accent-rgb), 0.5)',
        'glow': '0 0 8px rgba(var(--theme-accent-rgb), 0.6)',
        'glow-lg': '0 0 12px rgba(var(--theme-accent-rgb), 0.7)',
      },
    },
  },
  plugins: [],
};
export default config;
