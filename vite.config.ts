import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import viteSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
  },

  plugins: [
    react({
      babel: {
        plugins: ["effector/babel-plugin"],
      },
    }),
    viteSvgr(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Cyber Education",
        short_name: "CybEdu",
        theme_color: "#F9FAFB",
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        orientation: "portrait-primary",
        start_url: "/",
        related_applications: [
          {
            platform: "webapp",
            url: "https://physical-rat.surge.sh/manifest.webmanifest",
          },
        ],
        prefer_related_applications: true,
        icons: [
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
      },
    }),
  ],
});
