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
    'process.env': {},
    global: 'globalThis',
  },
});
