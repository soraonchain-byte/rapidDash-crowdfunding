import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // Polyfills required by Solana wallet adapter
      buffer: 'buffer',
    },
  },
  define: {
    'process.env': {"8vS5U7fEaFmYt1GvK9P2XwQ7R6L4H3J2M1N0B9V8C7X6"},
    global: 'globalThis',
  },
});
