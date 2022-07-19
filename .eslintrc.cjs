module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: 'airbnb-base',
    plugins: ['svelte3', '@typescript-eslint'],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3',
        },
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        // project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte'],
    },
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    settings: {
        'svelte3/typescript': require('typescript'),
    },
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-iterator': 'error',
        'max-len': ['error',{ code: 81, ignoreComments: true }],

        // these error when they shouldn't
        'import/first': 0,
        'import/no-unresolved': 0,
        'no-multiple-empty-lines': 0,
        'comma-dangle': 0,

        // I don't like these
        'import/no-mutable-exports': 0,
        'import/prefer-default-export': 0,
        'operator-linebreak': 0,
        'dot-notation': 0, // [] is not equivalent to .
        indent: ['off', 4], // don't want this enforced by eslint
        'implicit-arrow-linebreak': 0, // wack
    },
}
