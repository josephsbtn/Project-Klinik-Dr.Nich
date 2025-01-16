import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target:
          import.meta.env.VITE_BASE_URL_BACKEND || "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
