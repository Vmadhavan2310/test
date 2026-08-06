import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

const projectGlobals = {
  // Shopify/theme globals used across assets
  debounce: 'readonly',
  trapFocus: 'readonly',
  removeTrapFocus: 'readonly',
  subscribe: 'readonly',
  publish: 'readonly',
  PUB_SUB_EVENTS: 'readonly',
  ON_CHANGE_DEBOUNCE_TIMER: 'readonly',
  routes: 'readonly',
  fetchConfig: 'readonly',
  Shopify: 'readonly',
  DeferredMedia: 'readonly',
  ModalDialog: 'readonly',
  DetailsModal: 'readonly',
  DetailsDisclosure: 'readonly',
  SearchForm: 'readonly',
  pauseAllMedia: 'readonly',
  onKeyUpEscape: 'readonly',
  accessibilityStrings: 'readonly'
};

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...projectGlobals, CartItems: 'readonly' }
    }
  },
  {
    files: ["assets/**/*.js"],
    rules: {
      'no-unused-vars': 'off'
    }
  }
]);
