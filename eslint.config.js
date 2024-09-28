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
      'react/jsx-uses-react': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': 'off',
      'linebreak-style': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/named': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'prettier/prettier': [
        'off',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
];
