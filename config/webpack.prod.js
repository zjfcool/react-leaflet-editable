const path = require('path');
const nodeExternals = require('webpack-node-externals');
const base = require('./webpack.base')
const {smart} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
function resolve(url){
    return path.resolve(__dirname,url)
}
module.exports= smart(base,{
    mode:"production",
    entry:resolve('../src/ReactLeafletEditable.js'),
    output:{
        path:resolve('../dist'),
        filename:"bundle.js",
        libraryTarget:"commonjs2"
    },
    externals:[
        nodeExternals()
    ],
    plugins:[
        new CleanWebpackPlugin()
    ]
})