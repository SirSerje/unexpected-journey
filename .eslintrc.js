module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
  ],
  env: {
    'browser': false,
    'es6': true,
    'node': true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  ecmaFeatures: {
    modules: true,
    spread : true,
    restParams : true,
  },
  globals: {
    '__dirname': 'readonly',
    process: 'readonly',
    require: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  'rules': {
    indent: ['error', 2],
    semi: ['error', 'always'],
    'no-unused-vars': ['error', { 'args': 'none' }],
    'no-multi-spaces': 'error',
    'eol-last': ['error', 'always'],
    'newline-before-return': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxBOF': 1 }],

    "node/no-unsupported-features/es-syntax": 0,
  },
};