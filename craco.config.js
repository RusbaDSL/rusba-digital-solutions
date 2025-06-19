const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // Ensure we have a fallback object
            if (!webpackConfig.resolve.fallback) {
                webpackConfig.resolve.fallback = {};
            }

            // Add resolve extensions
            if (!webpackConfig.resolve.extensions) {
                webpackConfig.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
            }
            webpackConfig.resolve.extensions.push('.mjs');

            // Add fallbacks for Node.js core modules
            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                "fs": false,
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                "path": require.resolve("path-browserify"),
                "process": require.resolve("process/browser"),
                "buffer": require.resolve("buffer/"),
                "util": require.resolve("util/"),
            };

            // Remove better-sqlite3 from the bundle
            webpackConfig.externals = {
                ...webpackConfig.externals,
                'better-sqlite3': 'better-sqlite3',
            };

            // Add webpack plugins for polyfills
            webpackConfig.plugins = [
                ...webpackConfig.plugins,                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                    process: 'process',
                }),
                new webpack.DefinePlugin({
                    'process.env': JSON.stringify(process.env),
                    'process.browser': true,
                }),
            ];

            return webpackConfig;
        },
    },
};
