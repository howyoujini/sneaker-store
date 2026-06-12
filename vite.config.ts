import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// base is '/sneaker-store/' for the production build (GitHub Pages serves the
// app under the repo path) and '/' during local dev.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/sneaker-store/' : '/',
  plugins: [react()],
  server: { port: 5191, open: true },
}));
