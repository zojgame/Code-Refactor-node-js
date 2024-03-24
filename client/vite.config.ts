import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  outDir: 'dist',
  manifest: {
    name: 'VItejs config PWA',
    short_name: 'VitePWA',
    description: 'Code Refactoring with AI',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'assets/images/icon-128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'assets/images/icon-256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'assets/images/icon-64.png',
        sizes: '64x64',
        type: 'image/png',
      },
    ],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePWA],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: true,
  },
});
