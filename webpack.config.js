const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        publicPath: './public/assets/js/'
    },
    watch: true,
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                { useBuiltIns: 'usage', corejs: { version: 3 } }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new cleanPlugin.CleanWebpackPlugin()
    ]
}