/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#004C78",
      },
      fontFamily: {
        inter: ["jakarta", "sans-serif"],
      },
      screens: {
        sm: "640px", // Default small breakpoint
        md: "768px", // Default medium breakpoint
        lg: "1024px", // Default large breakpoint
        xl: "1280px", // Default extra-large breakpoint
        "2xl": "1536px", // Default 2x extra-large breakpoint
        "3xl": "1920px", // Custom: Full HD screens
        "4k": "2560px", // Custom: 4K displays
        "5k": "3200px", // Custom: Larger resolutions
        "1366px": "1366px", // Specific: Common laptop resolution
        "1440px": "1440px", // Specific: Large desktop resolution
        "1600px": "1600px", // Specific: Wider desktop resolution
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          DEFAULT: "100%",
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1200px",
          "1366px": "1280px",
          "1440px": "1360px",
          "1920px": "1800px",
        },
      },
      backgroundImage: {
        "search-icon": "url('./src/assets/images/search-icon.png')",
      },
      backgroundSize: {
        "20px": "20px",
      },
      backgroundPosition: {
        "10px-center": "10px center",
      },
      screens: {
        'sm': '640px',    // Default small breakpoint
        'md': '768px',    // Default medium breakpoint
        'lg': '1024px',   // Default large breakpoint
        'xl': '1280px',   // Default extra-large breakpoint
        '2xl': '1536px',  // Default 2x extra-large breakpoint
        '3xl': '1920px',  // Custom: Full HD screens
        '4k': '2560px',   // Custom: 4K displays
        '5k': '3200px',   // Custom: Larger resolutions
        '1366px': '1366px', // Specific: Common laptop resolution
        '1440px': '1440px', // Specific: Large desktop resolution
        '1600px': '1600px', // Specific: Wider desktop resolution
      },
      
    },
  },
  plugins: [],
};
