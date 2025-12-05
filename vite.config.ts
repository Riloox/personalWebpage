import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProduction ? '/personalWebpage/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
  },
});
