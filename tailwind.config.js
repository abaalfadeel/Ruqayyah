/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FFF9F6',
          100: '#FDEFEA',
          200: '#F9DCD3',
          300: '#F4C4B8',
          400: '#EFA697',
          500: '#E58979',
          600: '#D06B5C'
        },
        cream: {
          50: '#FFFDF9',
          100: '#FCF6EC',
          200: '#F6EAD6'
        },
        gold: {
          200: '#EFDBAE',
          300: '#E4C486',
          400: '#D4AB5B',
          500: '#BE9142'
        },
        midnight: {
          800: '#241B2E',
          900: '#160F1F'
        }
      },
      fontFamily: {
        display: ['"Aref Ruqaa"', 'serif'],
        body: ['"Cairo"', 'sans-serif'],
        hand: ['"Reem Kufi"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(190,145,66,0.25)',
        glow: '0 0 40px rgba(228,196,134,0.45)'
      },
      backdropBlur: { xs: '2px' },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        twinkle: {
          '0%,100%': { opacity: 0.25, transform: 'scale(0.85)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' }
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(228,196,134,0.3)' },
          '50%': { boxShadow: '0 0 45px rgba(228,196,134,0.65)' }
        },
        driftSlow: {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '100%': { transform: 'translate(-12px,20px) rotate(8deg)' }
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        glowPulse: 'glowPulse 3.2s ease-in-out infinite',
        driftSlow: 'driftSlow 6s ease-in-out infinite alternate'
      }
    }
  },
  plugins: []
};
