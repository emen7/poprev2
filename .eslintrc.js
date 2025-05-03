module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'plugin:tailwindcss/recommended',
    'prettier', // Make sure this is last to override other configs
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'jsx-a11y',
    'testing-library',
    'jest-dom',
    'tailwindcss',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // Base ESLint rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off', // Handled by TypeScript
    'no-duplicate-imports': 'error',
    'no-param-reassign': 'warn',
    'prefer-const': 'error',
    'spaced-comment': ['warn', 'always'],

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // React rules
    'react/prop-types': 'off', // Not needed with TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed with Next.js
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-array-index-key': 'warn',
    'react/self-closing-comp': 'error',
    'react/jsx-pascal-case': 'error',

    // Import rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',
    'import/first': 'error',

    // Accessibility rules
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',

    // Prettier integration
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.next/',
    'out/',
    'build/',
    '*.d.ts',
    'coverage/',
    'backup/', // Ignore the backup directory to avoid plugin conflicts
    'docs/archive/', // Ignore archived documentation
    'docs/archive/oldcode/', // Ignore old code
    '**/sandbox/**', // Ignore all sandbox directories
  ],
};
