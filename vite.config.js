import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 用户站点 (username.github.io) 使用根路径
  base: './',
  server: {
    port: 3000,
    open: true
  }
})
