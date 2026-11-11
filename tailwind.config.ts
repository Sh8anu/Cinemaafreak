import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oled: "#030303",
        terminal: {
          green: "#00ff66",
          darkgreen: "#003b17",
          dim: "#009933",
          alert: "#ff3333",
          gold: "#ffd700"
        }
      },
      fontFamily: {
        mono: ["var(--font-roboto-mono)", "Courier New", "monospace"],
      },
      animation: {
        cursor: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        }
      }
    },
  },
  plugins: [],
};
export default config;