import { defineConfig } from 'vite'
import { resolve } from 'path'

// Multi-page app: landing chooser + 3D world + terminal.
// base:'./' keeps asset paths relative so it works on Vercel, Netlify,
// GitHub Pages or any static host without extra config.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        world: resolve(__dirname, 'world.html'),
        terminal: resolve(__dirname, 'terminal.html'),
      },
    },
  },
})
