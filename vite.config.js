import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";
import wasm from "vite-plugin-wasm";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    crossOriginIsolation(),
    wasm(),
    VitePWA({
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,wasm}'],
        globDirectory: 'public',
      },
      manifest: {
        icons: [
          {
            src: "assets/favicon.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "assets/favicon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
        name: "InstaChess",
        short_name: "InstaChess",
        orientation: "portrait",
        description: "Instagram + Chess",
        theme_color: "#171513",
        background_color: "#171513",
        start_url: "/",
        workbox: {
          runtimeCaching: [
            {
              urlPattern: new RegExp("https://sveltebackendv2.onrender.com/.*"),
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                cacheableResponse: {
                  statuses: [0, 200],
                },
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 10, // 10 days
                  purgeOnQuotaError: true,
                },
              },
            },
            {
              urlPattern: new RegExp("https://lichess.org/api/puzzle/.*"),
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                cacheableResponse: {
                  statuses: [0, 200],
                },
                expiration: {
                  maxEntries: 5,
                  maxAgeSeconds: 60 * 60 * 24, // 1 days
                  purgeOnQuotaError: true,
                },
              },
            },
          ],
        },
      },
    }),
  ],
  optimizeDeps: {
    include: ["stockfish", "chess.js"],
  },
});
