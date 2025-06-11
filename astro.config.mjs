import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://caseymanos.com',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  vite: {
    optimizeDeps: {
      include: ['framer-motion'],
    },
  },
});
