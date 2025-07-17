/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: '#F7931A',
        primary: '#3D3049',
        'primary-dark': '#2A1F35',
        'primary-light': '#504060',
        secondary: '#C0C0C0',
        'secondary-dark': '#A0A0A0',
        'secondary-light': '#E0E0E0',
        dark: '#0F172A',
        'dark-light': '#1E293B',
        neon: '#00FF88',
        silver: '#C0C0C0',
        coral: '#E96D77',
        'coral-dark': '#E55A66',
        'custom-purple': '#B9ACBE',
      },
      fontFamily: {
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
