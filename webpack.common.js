const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');

const baseConfig = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        assetModuleFilename: path.join('assets', '[name].[contenthash][ext]'),
        filename: 'index.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.((t|j)s|(t|j)sx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('images', '[name][contenthash][ext]'),
                },
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name].[contenthash][ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('fonts', '[name][contenthash][ext]'),
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            scriptLoading: 'blocking',
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? prodConfig : devConfig;

    return merge(baseConfig, envConfig);
};
