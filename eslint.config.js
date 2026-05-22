const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const storybook = require("eslint-plugin-storybook");
const security = require("eslint-plugin-security");

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
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
            "react-hooks": reactHooks,
            storybook,
            security,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...security.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
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
