import type { Config } from "tailwindcss";

// Tailwind CSS v4: configuration is optional. Create this file only if you want
// to customize the default design system (theme, plugins, etc.).
// With the @tailwindcss/vite plugin, you do not need a `content` option.
export default {
  darkMode: "class",
  theme: {
    extend: {
      // Example: add your brand color and use it as `text-brand` / `bg-brand`.
      colors: {
        brand: {
          DEFAULT: "#1e40af",
          foreground: "#ffffff",
        },
      },
    },
  },
  // plugins: [], // Add Tailwind plugins here if needed
} satisfies Config;
