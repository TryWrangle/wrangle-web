import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/wrangle-web/',
  server: {
    proxy: {
      '/api-proxy': {
        target: 'https://wrangle-wvaw.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
      },
    },
  },
});
