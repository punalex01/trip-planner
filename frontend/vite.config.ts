import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      shadcn: path.resolve(__dirname, './src/components/shadcn'),
      src: path.resolve(__dirname, './src'),
    },
  },
});
