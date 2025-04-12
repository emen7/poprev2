import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', 'dist', '.turbo', '.next'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});
