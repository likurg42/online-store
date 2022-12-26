const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 9000,
        hot: true,
        watchFiles: path.join(__dirname, 'src', '**.html'),
    },
};
