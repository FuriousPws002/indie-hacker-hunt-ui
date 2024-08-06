import { resolve } from 'path'
import inject from "@rollup/plugin-inject";
import { defineConfig } from 'vite'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        profile: resolve(__dirname, 'src/profile/profile.html'),
      },
    },
    outDir: '../dist'
  },
  server: {
    port: 8080
  }
})