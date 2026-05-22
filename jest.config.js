/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom",
    roots: ["src"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
    },
    moduleNameMapper: {
        "\\.(css|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    },
};
