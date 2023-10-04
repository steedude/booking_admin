/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:security/recommended',
    'airbnb-base/legacy',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'only-multiline'],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    'max-len': ['error', { code: 120 }],
  },
  overrides: [
    {
      files: ['**/__tests__/unit/**/*.test.[jt]s?(x)'],
      extends: ['plugin:testing-library/vue'],
      rules: {
        'testing-library/await-async-queries': 'error',
        'testing-library/no-await-sync-queries': 'error',
        'testing-library/no-debugging-utils': 'warn',
        'testing-library/no-dom-import': 'off',
      },
    },
    {
      files: ['**/__tests__/e2e/**/*.spec.[jt]s?(x)'],
      extends: ['plugin:playwright/recommended'],
    },
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
};
