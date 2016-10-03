var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    autoprefixer = require('autoprefixer'),
    ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin,
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
var isDev = ENV === 'development';
var isProd = ENV === 'prodaction';


var config = {
    devtool:  isProd ? 'source-map': 'cheap-module-source-map',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts' 
    },
    output:{
        path: path.resolve(__dirname, "dist"),
        publicPath: isProd? '/': 'http://localhost:3000/',
        filename: isProd? 'assets/js/[name].[hash].js': 'assets/js/[name].js',
        chunkFilename:  isProd? '[id].[hash].chunk.js':'[id].chunk.js'
    }, 
    resolve:{
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },
    
    module:{
    
     loaders:[
        { 
           enforce: 'pre',
           test:/\.ts$/, 
           loader:'tslint', 
           exclude: /node_modules/
        },
        // Support for .ts files.
        { 
          test: /\.ts$/, 
          loader: ['awesome-typescript-loader?inlineSourceMap=true&sourceMap=false','angular2-template-loader'], 
          /*query: {
            useBabel:true,
            useForkChecker: true,
            tsconfig: './tsconfig.json',
          },*/
          exclude: /node_modules/
        },
           // all css in src/style will be bundled in an external css file
        { 
            test:/\.css$/, exclude:path.resolve(__dirname, 'src/app'),
          loader : ExtractTextPlugin.extract({ fallbackLoder:'style', loader:'css?sourceMap!postcss'})
        },
         // all css required in src/app files will be merged in js files
        { 
            test:/\.css$/, include:path.resolve(__dirname, 'src/app'),
          loader :'raw!postcss'
        },
        // support for .scss files
        // all scss in src/style
        { 
            test: /\.scss$/,
          exclude: path.resolve(__dirname,'src/app'),
          loader:  ExtractTextPlugin.extract({fallbackLoder:'style',  loader:'css?sourceMap!postcss!sass'})
        },
       // all scss required in src/app files will be merged in js files
        { 
            test: /\.scss$/, 
          exclude: path.resolve(__dirname,'src/style'), loader: 'raw!postcss!sass'
        },
        { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=fonts/[name].[hash].[ext]?'},
        // support for .html as raw text
        { 
            test: /\.html$/, loader: 'raw' 
        }
     ]
    },
    cache: true,
    //debug: !isProd,
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'app','vendor','polyfills'], minChunks: Infinity
        }),
        new ForkCheckerPlugin(),
        new HtmlWebpackPlugin({
            template:'dist/index.html',
            inject: 'body',
            chunksSortMode: 'dependency'
        }),
         new ExtractTextPlugin({filename:'css/[name].[hash].css', disable: !isProd}),
         new webpack.LoaderOptionsPlugin({
            options: {
                test: /\.css$/,
                context: __dirname,
                postcss: [
                    autoprefixer
                ]
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                 tslint: {
                    emitErrors: false,
                    failOnHint: false
                }
            }
        })
    ],
   
    devServer: {
        port: PORT,
        host: HOST,
        historyApiFallback: true,
        watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
        //outputPath: path.resolve(___dirname, 'dist')
        }
    }
};

/*config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
];*/

if(isProd){
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({mangle: { keep_fnames: true }})
    )
}

module.exports = config;