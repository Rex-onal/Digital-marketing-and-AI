import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom plugin to force correct MIME type for .jsx/.tsx/.ts files on systems with registry misconfigurations
const jsxMimePlugin = () => ({
  name: 'jsx-mime',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url.split('?')[0];
      if (url.endsWith('.jsx') || url.endsWith('.tsx') || url.endsWith('.ts')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsxMimePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~components': path.resolve(__dirname, './src/components'),
      '~features': path.resolve(__dirname, './src/features'),
      '~types': path.resolve(__dirname, './src/types')
    }
  }
})

