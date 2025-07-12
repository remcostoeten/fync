module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 80,
  // Preserve JSDoc comments
  plugins: [],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        // Keep JSDoc comments intact
        parser: 'typescript',
      },
    },
  ],
};
