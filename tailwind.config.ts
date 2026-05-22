import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fitzroy-charcoal': '#231F20',
        'fitzroy-stone': '#B9AC9C',
        'fitzroy-sage': '#7A8172',
        'fitzroy-cream': '#F7F5F2',
        'fitzroy-sand': '#D8CBB8',
        'fitzroy-taupe': '#706248',
        'fitzroy-olive': '#5E685F',
        'fitzroy-mushroom': '#CFC6BB',
        'fitzroy-bronze': '#9B7B5A',
        'fitzroy-clay': '#A06D5D',
      },
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'Georgia', 'serif'],
        'inter': ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, rgba(35,31,32,0.92) 0%, rgba(35,31,32,0.75) 40%, rgba(35,31,32,0.30) 70%, transparent 90%)',
        'hero-gradient-mobile': 'linear-gradient(to bottom, rgba(35,31,32,0.30) 0%, rgba(35,31,32,0.75) 60%)',
      },
    },
  },
  plugins: [],
}
export default config
