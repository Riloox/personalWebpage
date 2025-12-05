import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const defaultProductionBase = '/personalWebpage/';
const envBase = process.env.VITE_BASE_PATH;

const ensureTrailingSlash = (value: string) => (value.endsWith('/') ? value : `${value}/`);
const base = envBase ? ensureTrailingSlash(envBase) : defaultProductionBase;

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
  },
});
