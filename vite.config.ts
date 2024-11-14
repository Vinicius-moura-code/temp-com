import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, filename: "bundle-visualization.html" }),
  ],
  build: {
    rollupOptions: {
      treeshake: true, // Ensure tree shaking is enabled
    },
  },
});
