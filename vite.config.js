import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// عدّل base إلى اسم المستودع عند النشر على GitHub Pages
// مثال: base: '/journey-to-the-best-memory/'
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'رحلة إلى أجمل ذكرى',
        short_name: 'أجمل ذكرى',
        description: 'رحلة تفاعلية سينمائية — هدية عيد ميلاد',
        theme_color: '#F7E7E1',
        background_color: '#FFF9F6',
        display: 'standalone',
        dir: 'rtl',
        lang: 'ar',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  build: {
    target: 'es2019',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'gsap'],
          firebase: ['firebase/app', 'firebase/firestore']
        }
      }
    }
  },
  server: { port: 5173, open: true }
});
