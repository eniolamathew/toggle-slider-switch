import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main, 
      format: 'cjs', 
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  plugins: [
    peerDepsExternal(), 
    resolve(), 
    commonjs(), 
    typescript({ useTsconfigDeclarationDir: true }), 
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    terser(),
    ],
  external: Object.keys(packageJson.peerDependencies || {}),
  
};
