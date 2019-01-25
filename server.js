const express = require("express");
const webpack = require("webpack");
const webpackMiddleWare = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config");
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackMiddleWare(compiler, {
    publicPath: config.output.publicPath
}));

app.listen(7000, function() {
    console.log("Application listening on port 7000!\n");
})