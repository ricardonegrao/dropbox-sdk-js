import path from 'path';

import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import license from 'rollup-plugin-license';

const env = process.env.NODE_ENV;

const config = {
  format: 'umd',
  sourceMap: (env !== 'production'),
  external: ['es6-promise/auto', 'isomorphic-fetch'],

  plugins: [
    license({
      thirdParty: {
        output: path.join(__dirname, 'dependencies.txt'),
      },
    }),
    resolve({
      main: true,
      jsnext: true,
      browser: true,
    }),
    commonjs({
      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: (env !== 'production'),  // Default: true
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      }
    })
  );
}

export default config
