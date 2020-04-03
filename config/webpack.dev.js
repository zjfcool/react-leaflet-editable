const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
function resolve(url){
    return path.resolve(__dirname,url)
}
module.exports={
    mode:"development",
    entry:resolve('../src/app.js'),
    output:{
        path:resolve('../dist'),
        filename:"bundle.js"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:"/node_modules/",
                use:"babel-loader"
            },
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    {
                        loader:"css-loader",
                        options:{
                            // import: true,
                            // modules:true,
                            // esModule:true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:['file-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve('../public/index.html')
        })
    ]
}