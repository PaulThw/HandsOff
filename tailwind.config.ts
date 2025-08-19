import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Basisfarben, gemappt auf deine CSS-Variablen aus globals.css
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',

        // Markenfarben
        petrol: {
          50: 'hsl(180 60% 15%)',
          100: 'hsl(180 60% 20%)',
          200: 'hsl(180 60% 25%)',
          300: 'hsl(180 60% 30%)',
          400: 'hsl(180 60% 35%)',
          500: 'hsl(180 60% 40%)',
          600: 'hsl(180 60% 45%)',
          700: 'hsl(180 60% 50%)',
          800: 'hsl(180 60% 55%)',
          900: 'hsl(180 60% 60%)',
        },
        apricot: {
          50: 'hsl(30 80% 15%)',
          100: 'hsl(30 80% 20%)',
          200: 'hsl(30 80% 25%)',
          300: 'hsl(30 80% 30%)',
          400: 'hsl(30 80% 35%)',
          500: 'hsl(30 80% 40%)',
          600: 'hsl(30 80% 45%)',
          700: 'hsl(30 80% 50%)',
          800: 'hsl(30 80% 55%)',
          900: 'hsl(30 80% 60%)',
        },
        blue: {
          50: 'hsl(210 80% 15%)',
          100: 'hsl(210 80% 20%)',
          200: 'hsl(210 80% 25%)',
          300: 'hsl(210 80% 30%)',
          400: 'hsl(210 80% 35%)',
          500: 'hsl(210 80% 40%)',
          600: 'hsl(210 80% 45%)',
          700: 'hsl(210 80% 50%)',
          800: 'hsl(210 80% 55%)',
          900: 'hsl(210 80% 60%)',
        },
        green: {
          50: 'hsl(120 60% 15%)',
          100: 'hsl(120 60% 20%)',
          200: 'hsl(120 60% 25%)',
          300: 'hsl(120 60% 30%)',
          400: 'hsl(120 60% 35%)',
          500: 'hsl(120 60% 40%)',
          600: 'hsl(120 60% 45%)',
          700: 'hsl(120 60% 50%)',
          800: 'hsl(120 60% 55%)',
          900: 'hsl(120 60% 60%)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
