// nitro.config.ts
import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  preset: 'netlify',
  prerender: {
    crawlLinks: false,
    routes: []
  }
})