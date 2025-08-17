import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // '@shadcn': path.resolve(__dirname, './src/shadcn'),
    },
  },
  optimizeDeps: {
    include: ['xlsx'],
    force: true,
  },
  server: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:3456',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
