import { defineConfig, type Format } from 'tsup';
import * as path from 'node:path';

export default defineConfig([
  {
    clean: true,
    sourcemap: true,
    tsconfig: path.resolve(__dirname, './tsconfig.build.json'),
    entry: ['index.ts', './!(node_modules|dist)/**/*.(ts|tsx)'],
    bundle: false,
    format: ['esm' as Format],
    outDir: 'dist',
    dts: true,
    esbuildOptions(options, context) {
      options.outbase = './';
      options.jsx = 'automatic';
    },
  },
]);
