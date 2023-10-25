import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

const inputNames = ["door_one", "door_two", "door_three"]

export const mapCSSFileNamesGenerateBundle = {
  name: 'mapCSSFileNamesGenerateBundle',
  generateBundle(opts, bundle) {

    let cssNamesMap = {}

    Object.entries(bundle).forEach(([fileName, fileInfo]) => {
      if (inputNames.includes(fileInfo.name)) {        
        const ambiguous_css_name = [...fileInfo.viteMetadata.importedCss][0]
        const mapped_css_name = `${fileInfo.name}.css`
        bundle[ambiguous_css_name].fileName = mapped_css_name
        bundle[ambiguous_css_name].name = mapped_css_name
        cssNamesMap[ambiguous_css_name] = mapped_css_name
      }
    })
  },
}


export const mapCSSFileNamesWriteBundle = {
  name: 'mapCSSFileNamesWriteBundle',
  writeBundle(opts, bundle) {
    const cssNamesMap = {}

    Object.keys(bundle).forEach((key) => {
      const file = bundle[key]
      if(file.fileName.endsWith(".css")) {
        cssNamesMap[key] = file.fileName
      }
    })

    Object.entries(bundle).forEach(([fileName, fileInfo]) => {
      const cssFileNames = Object.keys(cssNamesMap)
      if(fileName.endsWith(".html")) {
        cssFileNames.forEach((cssFileName) => {
          if(fileInfo.source.includes(cssFileName)) {
            console.log(`Pattern: ${cssFileName} found in ${fileName} replacing it with: ${cssNamesMap[cssFileName]}`);
            fileInfo.source = fileInfo.source.replace(cssFileName, cssNamesMap[cssFileName])
          }
        })
      }
    })
  },
}

export default defineConfig(({ mode }) => {
  const config = {
    root: "src",
    build: {
      outDir: "../static/",
      emptyOutDir: true,
      rollupOptions: {
        maxParallelFileOps: 100,
        input: {
          door_one: resolve(__dirname, "src", "DoorOne", "index.html"),
          door_two: resolve(__dirname, "src", "DoorTwo", "index.html"),
          door_three: resolve(__dirname, "src", "DoorThree", "index.html"),
        },
        output: {
          entryFileNames: "[name].js",
        },
      },
      commonjsOptions: { include: [] },
    },
    plugins: [
      react({
        include: [/\.jsx?$/, /\.js$/],
      }),
      mapCSSFileNamesGenerateBundle,
      mapCSSFileNamesWriteBundle,
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
