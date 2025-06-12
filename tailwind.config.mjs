/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Retro Athletics Colors
        'track-red': "hsl(var(--track-red))",
        'timing-yellow': "hsl(var(--timing-yellow))",
        'lane-white': "hsl(var(--lane-white))",
        'retro-gold': "hsl(var(--retro-gold))",
        'marathon-green': "hsl(var(--marathon-green))",
        'vintage-maroon': "hsl(var(--vintage-maroon))",
        'copper-bronze': "hsl(var(--copper-bronze))",
        'worn-leather': "hsl(var(--worn-leather))",
        'dusty-tan': "hsl(var(--dusty-tan))",
        'starting-block': "hsl(var(--starting-block))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-in-up": "fade-in-up 0.5s ease-in-out",
        "fade-in-down": "fade-in-down 0.5s ease-in-out",
        "slide-in-left": "slide-in-left 0.5s ease-in-out",
        "slide-in-right": "slide-in-right 0.5s ease-in-out",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
