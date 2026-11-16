import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { ink: "#101828", brand: "#1457d9", mist: "#f4f7fb" } } },
  plugins: []
};
export default config;
