/** proxy chat and registration work perfectly but the minilessons idk */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api-auth": {
        target: "https://englishlearningco.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "https://englishlearningco.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

/**new proxy  */
/*import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api-auth": {
        target: "https://englishlearningco.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});*/

/** old normal */
/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})*/
