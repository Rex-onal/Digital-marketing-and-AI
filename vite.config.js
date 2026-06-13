import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to force correct MIME type for .jsx files on systems with registry misconfigurations
const jsxMimePlugin = () => ({
  name: 'jsx-mime',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url.split('?')[0];
      if (url.endsWith('.jsx')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsxMimePlugin()],
})
