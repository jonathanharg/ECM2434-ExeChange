import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: { manifest: true },
  // base: process.env.NODE_ENV === "production" ? "/static/" : "/",
  base: "/static/",
  root: "./frontend",
});
