const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
        popup: path.join(srcDir, "presentation", "pages", "Popup.tsx"),
        options: path.join(srcDir, "presentation", "pages", "Options.tsx"),
        background: path.join(srcDir, "chrome", "background.ts"),
        content_script: path.join(srcDir, "chrome", "content_script.tsx"),
        devtools_page: path.join(srcDir, "chrome", "devtools_page.tsx"),
        devtools_panel: path.join(srcDir, "presentation", "pages", "DevToolsPanel.tsx"),
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: 5000,
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    performance: {
        hints: false,
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== "background";
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            querystring: "querystring-es3",
        },
        fallback: {
            process: require.resolve("process/browser.js"),
            buffer: require.resolve("buffer/"),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }],
        }),
    ],
};
