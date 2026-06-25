import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // SSR entry used by Nitro on Vercel (src/server.ts)
      server: { entry: "server" },
    }),
    viteReact(),
    // Nitro only for production builds — in dev it serves an empty index.html shell.
    ...(command === "build" ? [nitro()] : []),
  ],
  server: {
    port: 8080,
    host: "::",
    strictPort: true,
  },
}));
