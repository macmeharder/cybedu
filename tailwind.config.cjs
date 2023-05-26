/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ce: {
          purple: {
            DEFAULT: "var(--ce-purple)",
            dark: "var(--ce-purple-dark)",
          },
          gray: {
            DEFAULT: "var(--ce-gray)",
            2: "var(--ce-gray-2)",
            3: "var(--ce-gray-3)",
          },
          yellow: "var(--ce-yellow)",
          blue: {
            gray: "var(--ce-blue-gray)",
          },
          red: {
            DEFAULT: "var(--ce-red)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-safe-area"), require("@tailwindcss/forms")],
};
