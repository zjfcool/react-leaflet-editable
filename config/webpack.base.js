const path = require('path');
function resolve(url){
    return path.resolve(__dirname,url)
}
module.exports={
    output:{
        path:resolve('../dist'),
        filename:"bundle.js"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:"babel-loader"
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
    }
}