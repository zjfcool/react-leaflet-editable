const path = require('path');
const nodeExternals = require('webpack-node-externals');
function resolve(url){
    return path.resolve(__dirname,url)
}
module.exports={
    mode:"production",
    entry:resolve('../src/app.js'),
    output:{
        path:resolve('../dist'),
        filename:"bundle.js",
        libraryTarget:"commonjs2"
    },
    modules: {
        rules: [
            {
                test:/\.js$/,
                exclude:"/node_modules/",
                use:"babel-loader"
            },
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    externals:[
        nodeExternals()
    ]
}