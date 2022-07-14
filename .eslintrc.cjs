module.exports = {
    root: true,
    extends: 'eslint:recommended',
    plugins: ['svelte3'],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3'
        }
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
    },
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never']
    }
}
