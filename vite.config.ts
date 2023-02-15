/// <reference types="vitest" />
import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ["text"],
    },
  },
  plugins: [react(), splitVendorChunkPlugin()],
  build: { manifest: true },
  base: "/static/",
  root: "./frontend",
});
