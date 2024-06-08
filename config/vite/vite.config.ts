import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// const PORT = process?.env?.APP_PORT ? JSON.parse(process?.env?.APP_PORT as string) : 3000
const PORT = 3000

export default defineConfig(()=>{
  return {
    plugins: [react()],
    publicDir: 'build',
    envPrefix: "APP",
    resolve:{
      alias:{
        "api": "/src/api",
        "app": "/src/app",
        "entities": "/src/entities",
        "hooks": "/src/hooks",
        "pages": "/src/pages",
        "shared": "/src/shared",
        "stores": "/src/stores",
        "widgets": "/src/widgets",
      }
    },
    server:{
      port:PORT,
    },
    build: {
      minify:true,
      rollupOptions: {},
      assetsInlineLimit: 0, // Отключаем лимит для встраивания файлов в JavaScript
      chunkSizeWarningLimit: 2000, // Порог предупреждения о размере чанка,
      outDir: "build"
    },
  }
})
