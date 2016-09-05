var path = require( 'path' );
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    entry: {
        app: './app/entry.js',
        vendor: [
            'lodash',
            'backbone',
            'jquery',
            'moment',
            'clndr',
            'backbone-validation',
            'fastclick'
        ]
    },
    output: {
        path: './app/public/js',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /jquery\.js/,
                loader: 'null-loader',
                exclude: path.resolve('node_modules/foundation-sites/')
            }
        ]
    },
    resolve: {
        moduleDirectories: ['node_modules'],
        alias: {
            'client-app': path.resolve(__dirname, 'app', 'client-app')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            '_': 'lodash',
            'global._': 'lodash',
            'global.Backbone': 'backbone',
            Backbone: 'backbone'
        }),
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: 0
        })
    ]

}