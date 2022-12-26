import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueCountryDropdown2',
      fileName: 'vue-country-dropdown-2',
      formats: ["umd", "es"]
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        }
      }
    },
    outDir: path.resolve(__dirname, 'dist'),
    minify: "esbuild",
  },
  plugins: [
    createVuePlugin(),
  ],
})
