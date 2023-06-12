import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), crossOriginIsolation(), wasm()],
  optimizeDeps: {
    include: ["stockfish", "chess.js"],
  },
})
