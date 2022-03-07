import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import autoImport from 'unplugin-auto-import/vite';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import windiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    svgLoader(),
    autoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', '@vueuse/head'],
      eslintrc: {
        enabled: true,
      },
    }),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: '@arco-design/web-vue',
          esModule: true,
          resolveStyle: (name) => {
            if (name.indexOf('typography') !== -1) {
              return '@arco-design/web-vue/es/typography/style/index.js';
            }

            if (name.indexOf('carousel') !== -1) {
              return '@arco-design/web-vue/es/carousel/style/index.js';
            }

            if (name.indexOf('form') !== -1) {
              return '@arco-design/web-vue/es/form/style/index.js';
            }

            if (name.indexOf('doption') !== -1) {
              return '';
            }

            return `@arco-design/web-vue/es/${name}/style/index.js`;
          },
        },
      ],
    }),
    windiCSS(),
  ],
});
