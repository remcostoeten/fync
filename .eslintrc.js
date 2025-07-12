module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    // No classes rule - prevent class usage
    '@typescript-eslint/no-extraneous-class': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ClassDeclaration',
        message: 'Classes are not allowed. Use functions instead.',
      },
      {
        selector: 'ArrowFunctionExpression',
        message: 'Arrow functions are not allowed. Use function declarations instead.',
      },
    ],
    
    // Enforce function declarations over arrow functions
    'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
    
    // No comments rule - allow only JSDoc for functions
    'spaced-comment': ['error', 'always', { 
      'block': { 'exceptions': ['*'] },
      'line': { 'exceptions': ['/'] }
    }],
    'no-inline-comments': 'error',
    'line-comment-position': ['error', { 'position': 'above' }],
    
    // Functional programming enforcement
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off', // Too strict for practical use
    'prefer-const': 'error',
    'no-var': 'error',
    'no-param-reassign': 'error',
    
    // Immutability rules
    'no-restricted-globals': [
      'error',
      {
        name: 'Array',
        message: 'Use readonly arrays instead of mutable arrays.',
      },
    ],
    
    // Additional functional programming rules
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    
    // Enforce pure functions
    'no-console': 'warn',
    'no-alert': 'error',
    'no-debugger': 'error',
    'no-return-assign': 'error',
    'no-sequences': 'error',
    'no-unmodified-loop-condition': 'error',
    
    // TypeScript specific
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js', '.eslintrc.js'],
};
