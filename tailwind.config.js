/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "desktop-sm": "1280px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "hero-reveal": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "hand-slide-in-left": {
          from: { opacity: "0", transform: "translateX(-30%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "hand-slide-in-right": {
          from: { opacity: "0", transform: "translateX(30%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
        "hero-reveal":
          "hero-reveal 300ms cubic-bezier(0.215, 0.61, 0.355, 1) both",
        "hand-slide-in-left":
          "hand-slide-in-left 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "hand-slide-in-right":
          "hand-slide-in-right 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
