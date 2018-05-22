const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const backendConfiguration = {
    target: 'node',
    // target: "webworker", // WebWorker
    // target: "node", // Node.js via require
    // target: "async-node", // Node.js via fs and vm
    // target: "node-webkit", // nw.js
    // target: "electron-main", // electron, main process
    // target: "electron-renderer", // electron, renderer process
    mode: 'production',
    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.tsx', '.ts']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000, // refresh and watch every second
        ignored: /node_modules/
    },
    entry: {
        'backend/server': './src/backend/server.ts'
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            // .ts .tsx configuration
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, 'src/backend')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [
                    'cache-loader',
                    'tslint-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true // either happyPackMode or transpileOnly. One at a time
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // Webpack plugin that runs typescript type checker on a separate process
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/])
    ],
};

const frontendConfiguration = {
    target: 'web',
    mode: 'production',
    devtool: 'source-map',
    resolve: {
        // Add `.ts`, `.tsx`, '.js' and '.es6' as a resolvable extension.
        extensions: ['.jsx', '.js', '.es6']
    },
    watch: true, // Watch the filesystem for changes
    watchOptions: { // The polling interval for watching (also enable polling)
        aggregateTimeout: 300,
        poll: 1000, // refresh and watch every second
        ignored: /node_modules/
    },
    entry: {
        'frontend/index': './src/frontend/app/index.js',
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            // js and jsx rules
            {
                test: /\.(js|jsx)?$/,
                include: [
                    path.resolve(__dirname, 'src/frontend')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [
                    'cache-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-flow', '@babel/preset-react'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    },
                    'eslint-loader'
                ],
                enforce: 'pre',
            }
        ]
    },
    plugins: [
        // A webpack plugin to remove/clean your build folder(s) before building
        new CleanWebpackPlugin(['dist/'], {
            // options
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

// export
module.exports = [backendConfiguration, frontendConfiguration];