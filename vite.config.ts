import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
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
        "./Login": "./src/components/Login",
      },
      shared: ["react", "react-dom", 'react-router-dom', "react-redux", "@reduxjs/toolkit"],
    }),
  ],
  server: {
    open: true,
    port: 5001
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
