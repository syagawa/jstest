const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var ENV = process.env.NODE_ENV;
if(ENV !== "production"){
  ENV = "development";
}

module.exports = {
  "js": {
    mode: ENV,
    entry: {
      "bundle": "./src/js/main.js"
    },
    output: {
      filename: "js/[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["es2015"]
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".vue"],
      modules: [
        "node_modules"
      ],
      alias: {
        vue: "vue/dist/vue.common.js"
      }
    }
  },
  "css": {
    mode: ENV,
    entry: {
      "bundle": [
        "./src/scss/main.scss"
      ]
    },
    output: {
      filename: "tmp.[hash]"
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader?-url&minimie!",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css"
      })
    ]
  }
};