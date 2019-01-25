const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = (env, args) => {
    var isProduction = args.mode === "production";
    return {
        entry: ["@babel/polyfill", "./src/index.js"],
        devtool: isProduction ? "" : 'inline-source-map',
        devServer: !isProduction ? {
            contentBase: "./dist"
        } : {},
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // "style-loader",
                        "css-loader"
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "less-loader"
                    ]
                },
                {
                    test: /\.(png|jpg|svg|gif)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "file-loader"
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "file-loader"
                    }
                }
            ]
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            publicPath: "/"
        },
        plugins: [
            new CleanWebpackPlugin(["dist"]),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html",
                hash: true
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? "[name].[contenthash:8].css" : "[name].css",
                chunkFilename: isProduction ? "[id].[contenthash:8].css" : "[id].css",
            })
        ],
        resolve: {
            extensions: [".js", ".jsx", ".css", ".scss", ".less"],
            alias: {
                "@": path.join(__dirname, "./src"),
                "components": path.join(__dirname, "./src/components")
            }
        }
    };
}