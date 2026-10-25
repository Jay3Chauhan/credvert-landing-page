import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        credvert: {
          gold: '#C5A880',
          goldLight: '#E5C79E',
          goldDark: '#8A6E48',
          obsidian: '#07090D',
          alabaster: '#F8F7F4',
        },
        obsidian: {
          DEFAULT: '#07090D',
          50: '#1E222E',
          100: '#171922',
          200: '#13141C',
          300: '#0F1016',
          400: '#0C0D12',
          500: '#07090D',
        },
        gold: {
          light: '#F2D594',
          DEFAULT: '#D4A853',
          deep: '#9C7430',
          dim: 'rgba(212, 168, 83, 0.12)',
        },
        emerald: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dim: 'rgba(16, 185, 129, 0.12)',
        },
        sapphire: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dim: 'rgba(59, 130, 246, 0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        gold: '0 4px 20px rgba(212, 168, 83, 0.25)',
        'gold-lg': '0 10px 32px rgba(212, 168, 83, 0.35)',
        card: 'var(--card-shadow)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
