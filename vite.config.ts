import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // IMPORTANT: base MUST stay '/'.
  //
  // This repo is a GitHub *user* page (yashs3090.github.io), served from the
  // domain root. Most Vite + GitHub Pages tutorials say to set
  // base: '/<repo-name>/' — that advice is for *project* pages
  // (user.github.io/project). Applying it here prefixes every asset URL with a
  // path that does not exist, producing a blank page and 404s on every JS/CSS
  // file. Leave this alone.
  base: '/',

  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
