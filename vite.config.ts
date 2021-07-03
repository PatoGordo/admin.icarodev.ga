import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#2D333B",
        background_color: "#22272E",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Admin Page",
        short_name: "Admin Page",
        description: "My general admin page",
        icons: [
          {
            src: "images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "images/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {},
    }),
  ],
});
