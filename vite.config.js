import { resolve, dirname } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**')
    }),
    VitePWA({
      includeAssets: ['favicon.ico', '/img/apple-touch-icon.png', '/img/icon.svg'],
      manifest: {
        name: 'PokaPlayer',
        short_name: 'PokaPlayer',
        description: 'PokaPlayer is a player that can unify and play from multiple sources like DSM and Netease.',
        theme_color: '#f2f2f2',
        icons: [
          {
            src: '/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/pokaapi': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
