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
          gold: '#D4A853',
          goldLight: '#F2D594',
          goldDark: '#9C7430',
          brand: '#FDDA56',
          obsidian: '#09090C',
          alabaster: '#F8F7F4',
        },
        obsidian: {
          DEFAULT: '#09090C',
          50: '#22252F',
          100: '#181A22',
          200: '#111217',
          300: '#0E0F13',
          400: '#0B0C0F',
          500: '#09090C',
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
        glass: 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 50px -20px rgba(0,0,0,0.6)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        laserScan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        laserScan: 'laserScan 0.7s cubic-bezier(0.65,0,0.35,1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
