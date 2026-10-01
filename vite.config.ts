import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import express from 'express';
import { apiRouter } from './server/apiRouter';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-plugin-api-backend',
      configureServer(server) {
        const app = express();
        app.use(express.json({ limit: '15mb' }));
        app.use(express.urlencoded({ extended: true, limit: '15mb' }));
        app.use('/api', apiRouter);
        server.middlewares.use(app);
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
