import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import nodeExternals from 'webpack-node-externals';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: "production",
    target: "node",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: "ts-loader",
                },
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".mjs"],
    },
    externals: [nodeExternals()],
    output: {
        filename: "bundle.js",
        path: resolve(__dirname, "dist"),
        clean: true,
    },
};