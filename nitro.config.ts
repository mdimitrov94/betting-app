// nitro.config.ts
import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  preset: 'netlify',
  output: {
    dir: 'dist',
    // For Nitro v3 the serverDir is used to control where the server files live
    serverDir: 'server'
  }
})