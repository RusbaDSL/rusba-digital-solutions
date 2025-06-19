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
                "buffer": require.resolve("buffer/"),
                "util": require.resolve("util/"),
                "process": false,
            };

            // Remove better-sqlite3 from the bundle
            webpackConfig.externals = {
                ...webpackConfig.externals,
                'better-sqlite3': 'better-sqlite3',
            };

            // Filter out any existing DefinePlugin instances
            const plugins = webpackConfig.plugins.filter(
                plugin => plugin.constructor.name !== 'DefinePlugin'
            );

            // Add webpack plugins for polyfills
            webpackConfig.plugins = [
                ...plugins,
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                    process: require.resolve('process/browser'),
                }),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                }),
            ];

            return webpackConfig;
        },
    },
};
