import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const compat = new FlatCompat();

export default [
  { files: ['**/*.{ts,tsx}'] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
      },
    },
  },
  eslintConfigPrettier,
  ...fixupConfigRules(compat.extends('airbnb')),
  ...fixupConfigRules(compat.extends('airbnb/hooks')),
  ...fixupConfigRules(compat.extends('airbnb-typescript')),
  ...fixupConfigRules(compat.extends('plugin:react/recommended')),
  ...fixupConfigRules(compat.extends('plugin:@typescript-eslint/recommended')),
  eslintPluginPrettierRecommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // Disables the rule that requires React to be in scope when JSX is used (React 17+ does not need import React in every file).
      'react-hooks/exhaustive-deps': 'warn', // Warn if any dependencies in your useEffect or other hooks are incorrectly managed.
      'react/function-component-definition': 'off',
      'import/no-extraneous-dependencies': 'off', // Disables the rule that prevents importing dev dependencies in the main source code.
      'linebreak-style': 'off', // Disables the rule that enforces a consistent linebreak style across environments (useful in cross-platform teams).
      'import/no-anonymous-default-export': 'off', // Allows using anonymous default exports.
      'import/named': 'off', // Disables enforcement for named imports.
      'import/extensions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // Throws an error for unused variables, but allows ignoring variables that start with an underscore (_).
      'prettier/prettier': [
        'error', // Set this to 'error' to enforce Prettier formatting via ESLint
        {
          endOfLine: 'auto', // Adjust to handle line endings depending on the environment
          semi: true, // Example: Enforce semicolons (based on your team's Prettier config)
          singleQuote: true, // Example: Enforce single quotes
        },
      ],
    },
  },
];
