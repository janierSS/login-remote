import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "loginRemote",
      filename: "remoteEntry.js",
      remotes: {
        myNotesHost: "http://localhost:3000/dist/assets/remoteEntry.js",
      },
      exposes: {
        "./module": "./src/exposes",
      },
      shared: ["react", "react-dom", 'react-router-dom', "react-redux", "@reduxjs/toolkit"],
    }),
  ],
  server: {
    open: true,
    port: 5001,
    //Proxy for DEV env
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api'
      },
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
