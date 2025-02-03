import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { extensions } from './vite.build.helpers';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: './src/assets', dest: './' }],
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      name: '@lawnstarter/react-native-ui-datepicker',
      entry: {
        index: 'src/index.ts',
        enums: 'src/enums.ts',
        types: 'src/types.ts',
        utils: 'src/utils.ts',
      },
      fileName: (moduleFormat, entryName) => {
        const extension = moduleFormat === 'es' ? 'js' : moduleFormat;
        return `${entryName}.${extension}`;
      },
    },
    rollupOptions: {
      external: ['react', 'dayjs', 'react-native'],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      loader: { '.js': 'jsx' },
      jsx: 'automatic',
    },
  },
  resolve: {
    extensions: extensions,
  },
  esbuild: {
    loader: 'tsx',
  },
});
