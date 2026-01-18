import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '1.6',
            p: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            h1: {
              marginTop: '0',
              marginBottom: '0.5em',
            },
            h2: {
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            h3: {
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            ul: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            ol: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
            blockquote: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            code: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
