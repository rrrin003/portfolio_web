import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

const ignoreConfig = {
  ignores: ['.angular/', 'dist/**', 'src/main.ts'],
};

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ignoreConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node, ...globals.es2022 },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },
];
