import path from "path";
import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const ENV_PREFIX = "M3";

export default defineConfig(() => {
  const envFileDir = process.env.INIT_CWD ?? process.cwd();
  const mode = process.env.NODE_ENV ?? "development";
  const env = loadEnv(mode, envFileDir, ENV_PREFIX);
  return {
    root: "src",
    publicDir: "public",
    base: mode === "production" || mode === "debug" ? "./" : "/",
    build: {
      sourcemap: mode === "debug" ? true : false,
      outDir: path.resolve(process.cwd(), "dist"),
      minify: mode === "debug" ? false : true,
    },
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "./src") },
        {
          find: "@assets",
          replacement: path.resolve(__dirname, "./src/assets"),
        },
        // NOTE: when refering to a local sub module that has "react" as its dependency, vite includes a copy of react into the main source code, which breaks the runtime.
        // This is why, the direct alias to the main "react" module is set here.
        {
          find: "react",
          replacement: path.resolve(process.cwd(), "node_modules/react"),
        },
      ],
    },
    plugins: [react(), tailwindcss()],
    server: {
      // electron app does not have to use browser
      open: process.env.DEV_TYPE === "web" ? "index.html" : false,
      port: parseInt(env.TST_DESKTOP_RENDERER_DEV_SERVER_PORT ?? "5555"),
    },
    envPrefix: ENV_PREFIX,
  } as UserConfig;
});
