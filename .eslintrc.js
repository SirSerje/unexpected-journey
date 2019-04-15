module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'jest': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'space-infix-ops': [
      2,
      {
        'int32Hint': false
      }
    ],
    'no-console': 'warn',
    'no-alert': 'warn',
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'never',
        'objects': 'never',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never'
      }
    ],
    'no-unused-labels': 'warn',
    'no-unused-vars': 'warn',
    'space-before-function-paren': [
      'error',
      'always'
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error',
    'quotes': [
      'error',
      'single'
    ],
    'semi': ['error', 'always']
  }
}
