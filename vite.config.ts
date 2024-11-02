import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://my-api.plantnet.org", // Cambia a la URL de la API real
        changeOrigin: true,
        secure: false, // Ponlo en true si la API requiere una conexión HTTPS segura
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});