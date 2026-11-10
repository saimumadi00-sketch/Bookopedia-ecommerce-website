import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Express API runs on :5000 (see server/.env.example). Proxy /api so the
// client can call relative URLs in development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5000' },
  },
});
