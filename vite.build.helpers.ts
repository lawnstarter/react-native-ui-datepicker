import { readFileSync } from 'fs';
import * as esbuild from 'esbuild';

export const extensions = [
  '.mjs',
  '.tsx',
  '.ts',
  '.jsx',
  '.js',
  '.css',
  '.json',
];

export const rollupPlugin = (matchers: RegExp[]) => ({
  name: 'js-in-jsx',
  load(id: string) {
    if (matchers.some((matcher) => matcher.test(id)) && id.endsWith('.js')) {
      const file = readFileSync(id, { encoding: 'utf-8' });
      return esbuild.transformSync(file, { loader: 'jsx', jsx: 'automatic' });
    }

    return null;
  },
});
