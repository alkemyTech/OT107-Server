module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  plugins: [
    'security'
  ],
  extends: ['airbnb-base', 'plugin:import/warnings', 'plugin:security/recommended'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'class-methods-use-this': 'off',
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'linebreak-style': 0,
  }
};
