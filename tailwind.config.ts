import type { Config } from "tailwindcss";
import { spazioTheme } from "./src/tokens/generated/tailwind";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: spazioTheme.colors,
      borderRadius: spazioTheme.borderRadius,
      boxShadow: spazioTheme.boxShadow,
    },
  },
  plugins: [],
};

export default config;
