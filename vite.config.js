import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'site',
  base: './',
  publicDir: false,
  build: {
    outDir: '../docs',
    emptyOutDir: false
  }
});
