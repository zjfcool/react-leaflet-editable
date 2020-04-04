const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {smart} = require('webpack-merge')
const base = require('./webpack.base')
function resolve(url){
    return path.resolve(__dirname,url)
}
module.exports=smart(base,{
    mode:"development",
    entry:resolve('../src/app.js'),
    devtool:"source-map",
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve('../public/index.html')
        })
    ]
})