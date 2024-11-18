import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { viteMockServe } from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig((command) => {
  return {
    //
    server: {
      open: true,
      proxy: {
        "/api": {
          target: "http://47.94.244.102:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    //
    plugins: [
      vue(),
      vueDevTools(),
      viteMockServe({
        mockPath: "mock",
        enable: command === "serve",
      }),
    ],
    //
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    //
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 如果需要支持 Less 中的 JavaScript 表达式，请设置为 true
          additionalData: "@import './src/styles/variable.less';",
        },
      },
    },
  };
});
