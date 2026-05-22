const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const storybook = require("eslint-plugin-storybook");
const security = require("eslint-plugin-security");
const unicorn = require("eslint-plugin-unicorn").default;

module.exports = [
    {
        files: ["src/**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
            globals: {
                chrome: "readonly",
                navigator: "readonly",
                document: "readonly",
                window: "readonly",
                console: "readonly",
                localStorage: "readonly",
                setTimeout: "readonly",
                HTMLCollection: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
            "react-hooks": reactHooks,
            storybook,
            security,
            unicorn,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...security.configs.recommended.rules,
            ...unicorn.configs["flat/recommended"].rules,
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            // Disable rules incompatible with this codebase
            "unicorn/no-null": "off",                     // OGP contentValue is nullable
            "unicorn/prevent-abbreviations": "off",        // t (i18n), e (event), etc. are idiomatic
            "unicorn/filename-case": "off",                // PascalCase components + camelCase utils coexist
            "unicorn/no-array-reduce": "off",              // used in validation logic
            "unicorn/prefer-module": "off",                // webpack/eslint config files use CommonJS
            "unicorn/expiring-todo-comments": "off",       // no dated TODO pattern in use
            "unicorn/no-negated-condition": "off",         // conflicts with common React ternary patterns
            "unicorn/prefer-ternary": "off",               // readability preference
            "unicorn/no-nested-ternary": "off",            // MUI sx props use nested ternaries for themes
            "unicorn/consistent-function-scoping": "off",  // inline handler functions inside components
            "unicorn/no-array-for-each": "off",            // .forEach is fine alongside for..of
        },
        settings: {
            react: { version: "detect" },
        },
    },
    {
        files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
        plugins: { storybook },
        rules: {
            ...storybook.configs.recommended.rules,
        },
    },
    {
        ignores: ["dist/**", "node_modules/**", "storybook-static/**"],
    },
];
