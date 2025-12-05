import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const defaultProductionBase = '/personalWebpage/';
const ensureTrailingSlash = (value: string) => (value.endsWith('/') ? value : `${value}/`);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const envBase = env.VITE_BASE_PATH || process.env.VITE_BASE_PATH;
  const fallbackBase = mode === 'production' ? defaultProductionBase : '/';
  const baseFromEnv = envBase ?? fallbackBase;

  return {
    base: ensureTrailingSlash(baseFromEnv),
    plugins: [react()],
    server: {
      port: 5173,
    },
  };
});
