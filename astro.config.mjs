// @ts-check
import { defineConfig } from 'astro/config';

import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { newTabLinks } from './src/lib/new-tab-links.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://aidenlumley.dev',

  // Covers are our own files, so rasterizing SVGs into PNG link previews is safe.
  image: { dangerouslyProcessSVG: true },

  markdown: {
    processor: satteri({ hastPlugins: [newTabLinks] }),
  },

  integrations: [mdx(), vue()],

  vite: {
    plugins: [tailwindcss()],
  },
});
