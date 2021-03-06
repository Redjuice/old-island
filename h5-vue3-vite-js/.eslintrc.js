module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  parserOptions: {
    ecmaVersion: 12
  },
  // plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0
  }
}
