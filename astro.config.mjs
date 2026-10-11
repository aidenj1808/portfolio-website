// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://aidenlumley.dev',

  // Covers are our own files, so rasterizing SVGs into PNG link previews is safe.
  image: { dangerouslyProcessSVG: true },

  integrations: [mdx(), vue()],

  vite: {
    plugins: [tailwindcss()],
  },
});
