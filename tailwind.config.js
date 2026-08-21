/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          bg: "#FAF8F2",
          cream: "#F3EDE1",
          champagne: "#E8D9B5",
          card: "#FFFFFF",
          cardMuted: "#F7F4EC",
          border: "#E2D7C3",
          goldBorder: "#D8BD6A",
          
          blue: {
            DEFAULT: "#173B67",
            dark: "#0F2847",
            sapphire: "#234F7D",
            light: "#EBF2FA",
            glow: "rgba(23, 59, 103, 0.18)",
          },
          gold: {
            DEFAULT: "#C9A227",
            light: "#D8BD6A",
            pale: "#FAF3DE",
            dark: "#9A7815",
            glow: "rgba(201, 162, 39, 0.25)",
          },
          vermilion: {
            DEFAULT: "#B63A32",
            dark: "#8F2922",
            light: "#FDF2F1",
            glow: "rgba(182, 58, 50, 0.2)",
          },
          text: {
            charcoal: "#263238",
            slate: "#5F6872",
            muted: "#8B95A0",
          },
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'royal-sm': '0 2px 8px rgba(23, 59, 103, 0.06), 0 1px 2px rgba(201, 162, 39, 0.08)',
        'royal-md': '0 8px 24px rgba(23, 59, 103, 0.08), 0 2px 6px rgba(201, 162, 39, 0.12)',
        'royal-lg': '0 16px 40px rgba(23, 59, 103, 0.12), 0 4px 12px rgba(201, 162, 39, 0.16)',
        'royal-card': '0 10px 25px -5px rgba(23, 59, 103, 0.07), 0 0 0 1px rgba(216, 189, 106, 0.35)',
        'gold-glow': '0 0 20px rgba(201, 162, 39, 0.3)',
        'blue-glow': '0 0 20px rgba(23, 59, 103, 0.25)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
