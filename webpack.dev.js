const path = require('path');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 9000,
        hot: true,
        watchFiles: path.join(__dirname, 'src', '**.html'),
        historyApiFallback: true,
    },
};
