import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/svelte-grupo-04/",
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  plugins: [
    svelte(),
    wasm()],
  optimizeDeps: {
    include: ["stockfish", "chess.js"],
  },
});
