import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

export default defineConfig(({ mode }) => {
  const config = {
    root: "src",
    build: {
      outDir: "../static/",
      rollupOptions: {
        maxParallelFileOps: 100,
        input: {
          door_one: resolve(__dirname, "src", "DoorOne", "index.html"),
          door_two: resolve(__dirname, "src", "DoorTwo", "index.html"),
          door_three: resolve(__dirname, "src", "DoorThree", "index.html"),
        },
        output: {
          entryFileNames: "index.js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "index.css") {
              return "index.css"
            }
            return assetInfo.name
          },
        },
      },
      commonjsOptions: { include: [] },
    },
    plugins: [
      react({
        include: [/\.jsx?$/, /\.js$/],
      }),
    ],
    resolve: {
      alias: {
        "~": resolve(__dirname, "src/"),
      },
    },
    optimizeDeps: {
      disabled: false,
    },
  }

  return config
})
