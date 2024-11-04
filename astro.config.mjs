import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';
import AstroPWA from '@vite-pwa/astro'

export default defineConfig({
  integrations: [tailwind(), svelte(), AstroPWA({
    /* your pwa options */
  })],
});