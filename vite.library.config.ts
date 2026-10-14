import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins:[react()],
  publicDir:false,
  resolve:{alias:{'@oneworks/avatar':path.resolve('packages/avatar/src/index.ts')}},
  build:{
    outDir:'packages/pretty-avatar-2/dist',emptyOutDir:true,target:'es2022',
    lib:{entry:{index:path.resolve('packages/pretty-avatar-2/src/index.tsx'),core:path.resolve('packages/pretty-avatar-2/src/core.ts')},formats:['es'],fileName:(_format,name)=>`${name}.js`,cssFileName:'style'},
    rollupOptions:{output:{banner:chunk=>chunk.isEntry && chunk.name==='index' ? '"use client";' : ''},external:['react','react-dom','react-dom/client','react/jsx-runtime']}
  }
})
