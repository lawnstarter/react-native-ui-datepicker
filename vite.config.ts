import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dts from 'vite-plugin-dts';

import { extensions } from './vite.build.helpers';

export default defineConfig({
  plugins: [
    react(),
    dts({ exclude: ['**/*.test.ts', '**/*.test.tsx'] }),
    viteStaticCopy({
      targets: [
        { src: './src/assets', dest: '.' },
        { src: './package.json', dest: '.' },
        { src: './README.md', dest: '.' },
        { src: './CHANGELOG.md', dest: '.' },
      ],
    }),
  ],
  build: {
    outDir: 'dist/lib',
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
  resolve: { extensions },
  esbuild: { loader: 'tsx' },
});
