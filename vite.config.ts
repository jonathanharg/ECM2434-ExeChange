/// <reference types="vitest" />
import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ["text"],
    },
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    VitePWA({
      // strategies: "injectManifest",
      registerType: "autoUpdate",
      injectRegister: "script",
      manifest: {
        name: 'ExeChange',
        short_name: 'ExeChange',
        start_url: '/',
        scope: '/',
        description: 'Swap your your clothes on campus!',
        theme_color: '#166534',
        background_color: '#ffffff',
        icons: [
          {
            src: '/static/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/static/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
  build: { manifest: true },
  base: "/static/",
  root: "./frontend",
});
