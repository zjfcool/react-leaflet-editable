const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
function resolve(url){
    return path.resolve(__dirname,url)
}
module.exports={
    mode:"development",
    entry:resolve('./src/app.js'),
    devtool:"source-map",
    output:{
        path:resolve('./dist'),
        filename:"bundle.js"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:"babel-loader",
                        options:{
                            "presets": ["@babel/preset-env", "@babel/preset-react"],
                            "plugins": ["@babel/plugin-proposal-class-properties"]
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ],
                // exclude:/node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:['url-loader']
            },
            {
                test:/\.(eot|ttf|woff|woff2)$/,
                use:['url-loader']
            }
        ]
    },
    resolve:{
        extensions:['.js','.css','.json']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve('./public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    }
}