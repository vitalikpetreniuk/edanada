// basic vars
const path = require('path');
const webpack = require('webpack');

// additional plugins\
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



const args = require('minimist')(process.argv.slice(2));
var isProduction = (args.mode === 'production');


// module settings
module.exports = {
    // mode: "none",
    // basic path to project
    context:  path.resolve(__dirname, 'src'),

    // entry point js
    entry: {
        // main project file
        app: [
            './js/app.js',            
            './scss/style.scss'
        ],
    },

    // path to build files 
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
    },

    // dev-server configuration
    devServer: {
        contentBase: './app'
    },

    devtool: (isProduction) ? '' : 'inline-source-map', 

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: './css/[name].css',
            chunkFilename:'./css/[id].css',
        }),

        new CleanWebpackPlugin(['dist']),

        new CopyWebpackPlugin(
            [
                { from: './img', to: 'img' }
            ],
            {
                ignore: [
                    { glob: 'svg/*' },
                ]
            }
        ),
    ],

    module: {
        rules: [
            // SCSS
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            // Image
            {
                test: /\.(png|gif|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    },
                    'img-loader',
                ]
            },

            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    },
                ]
            },

            // SVG
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },
        ]
    },
    resolve: {
        alias: {
            "TweenLite": path.resolve('node_modules', 'gsap/src/minified/TweenLite.min.js'),
            "TweenMax": path.resolve('node_modules', 'gsap/src/minified/TweenMax.min.js'),
            "TimelineLite": path.resolve('node_modules', 'gsap/src/minified/TimelineLite.min.js'),
            "TimelineMax": path.resolve('node_modules', 'gsap/src/minified/TimelineMax.min.js'),
            "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
            "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
            "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
        },
    },
};

// PRODUCTION ONLY

if (isProduction) {
    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        }),
    );

    module.exports.plugins.push(
        new ImageminPlugin({
            test: /\.(png|jpe?g|gif|svg)$/i
        }),
    );

    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    );
}