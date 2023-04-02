import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const { VITE_KAKAO_MAP_API_KEY } = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            VITE_KAKAO_MAP_API_KEY,
          },
        },
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
  };
});
