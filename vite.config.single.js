import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'

// Builds fully self-contained single-file HTML pages (all JS/CSS inlined)
// into dist-single/ — used to publish permanent Claude Artifact links.
export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    outDir: 'dist-single',
    rollupOptions: {
      input: { world: resolve(__dirname, 'world.html') },
    },
  },
})
