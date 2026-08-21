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
          bg: "#070A0F",
          surface: "#111722",
          card: "#182232",
          cardBorder: "#233348",
          glass: "rgba(17, 23, 34, 0.85)",
          gold: {
            light: "#FDE68A",
            DEFAULT: "#D4AF37",
            dark: "#997A15",
            glow: "rgba(212, 175, 55, 0.35)",
          },
          police: {
            light: "#93C5FD",
            DEFAULT: "#3B82F6",
            dark: "#1D4ED8",
            glow: "rgba(59, 130, 246, 0.4)",
          },
          chor: {
            light: "#FCA5A5",
            DEFAULT: "#EF4444",
            dark: "#B91C1C",
            glow: "rgba(239, 68, 68, 0.4)",
          },
          rani: {
            light: "#F472B6",
            DEFAULT: "#EC4899",
            dark: "#BE185D",
            glow: "rgba(236, 72, 153, 0.35)",
          },
          mantri: {
            light: "#A78BFA",
            DEFAULT: "#8B5CF6",
            dark: "#6D28D9",
            glow: "rgba(139, 92, 246, 0.35)",
          },
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.3)',
        'police-glow': '0 0 25px rgba(59, 130, 246, 0.4)',
        'chor-glow': '0 0 25px rgba(239, 68, 68, 0.4)',
        'royal-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
        'royal-glow-lg': '0 0 50px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
