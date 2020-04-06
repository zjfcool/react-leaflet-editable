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
                exclude:/node_modules/,
                use:[{loader:"babel-loader",options:{
                    "presets": ["@babel/preset-env", "@babel/preset-react"],
                    "plugins": ["@babel/plugin-proposal-class-properties"]
                }}]
            },
            {
                test:/\.css$/,
                use:["style-loader","css-loader"],
                // exclude:/node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:['url-loader']
            }
        ]
    },
    resolve:{
        extensions:['.js','.css','.json']
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