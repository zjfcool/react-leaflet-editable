const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
function resolve(url){
    return path.resolve(__dirname,url)
}
module.exports= {
    mode:"production",
    entry:resolve('./src/ReactLeafletEditable.js'),
    output:{
        path:resolve('dist'),
        filename:"bundle.js",
        libraryTarget:"commonjs2"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/(node_modules|examples)/,
                include:/src/,
                use:[{loader:"babel-loader",options:{
                    "presets": ["@babel/preset-env", "@babel/preset-react"],
                    "plugins": ["@babel/plugin-proposal-class-properties"]
                }}]
            }
        ]
    },
    resolve:{
        extensions:['.js']
    },
    externals:[
        nodeExternals({
            whitelist:['prop-types']
        })
    ],
    plugins:[
        new CleanWebpackPlugin()
    ]
}