import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';
import AstroPWA from '@vite-pwa/astro'

export default defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    server: {
      fs: {
        // Allow serving files from hoisted root node_modules
        allow: ['../..']
      }
    },
  },
  integrations: [
    tailwind(), svelte(),
    AstroPWA({
      mode: 'development',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',

      manifest: {
        name: 'xBrowserSync Bookmark Manager',
        short_name: 'xBookmark',
        theme_color: '#1d232a',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.href.includes('google.com/s2/favicons'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxAgeSeconds: 24 * 60 * 60
              },

              cacheableResponse: {
                statuses: [0, 200, 301] // Only cache successful responses
              }
            }
          },
          {
            urlPattern: ({ url }) => url.href.includes('api.microlink.io'),
            handler: 'CacheFirst',
            options: {

              cacheName: 'api-cache-microlink',
              expiration: {
                maxAgeSeconds: 24 * 60 * 60
              },

              cacheableResponse: {
                statuses: [0, 200, 301] // Only cache successful responses
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      }
    }),
  ],
});