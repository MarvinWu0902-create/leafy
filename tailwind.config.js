/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Noto Sans TC', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '12px',
      screens: {
        md: '1200px',
      },
    },
    extend: {
      margin: {
        '1/6': '16.666667%',
      },
      colors: {
        dark: '#212529',
        primary: {
          DEFAULT: '#a1887f',
          darker: '#8d6e63',
        },
        secondary: {
          DEFAULT: '#6c757d',
          darker: '#a5d6a7',
        },
      },
      backgroundColor: {
        main: '#f5f5f5',
      },
      backgroundImage: {
        logo: "url('/leafy_logo-removebg.png')",
        'home-banner': "url('https://images.unsplash.com/photo-1487099174927-da3cd6408862?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'subscribe-banner': "url('https://images.unsplash.com/photo-1492778297155-7be4c83960c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'content-1': "url('https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'content-2': "url('https://images.unsplash.com/photo-1586675502584-b7cb808400df?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        note: "url('https://images.unsplash.com/photo-1596343621063-c7a7aaf37aa6?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        about: "url('https://images.unsplash.com/photo-1519095615130-d36e0fe3bf63?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'product-1': "url('https://images.unsplash.com/photo-1515094264130-1c21fc4c9dcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'product-2': "url('https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        join: "url('https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        service: "url('https://images.unsplash.com/photo-1470162656305-6f429ba817bf?w=800&auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHRlYXxlbnwwfHwwfHx8MA%3D%3D')",
      },

    },
  },
  plugins: [],
};
