const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const WebpackMonitor = require('webpack-monitor');

const paths = {
  src: path.join(__dirname, "src"),
  data: path.join(__dirname, "src/data"),
  icons: path.join(__dirname, "src/common/fonts/syficon"),
  vendor: path.join(__dirname, "src/common/vendor"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  context: paths.src,
  entry: {
    syfadis: "./index.js"
  },
  devServer: {
    // proxy: {
    //     '/api': 'http://localhost:58481'
    // },
    contentBase: paths.dist,
    hot: true
  },
  externals: [
    {
      jquery: "$",
      knockout: "ko",
      "knockout-mapping": "ko.mapping",
      "chart.js": "Chart"
    }
  ],
  // resolve: {
  //     alias: {
  //         ko: "./node-modules/knockout/build/output/knockout-latest.js"
  //     }
  // },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      verbose: true
    }),
    new HtmlWebpackPlugin({
      // inject: false,
      template: "./index.html",
      title: "Output Management",
      header: "Knockout demo",
      hash: true
    }),
    new CopyWebpackPlugin([
      {
        from: paths.src + "/style.css",
        to: paths.dist
      },
      {
        from: paths.icons + "/syficon.woff",
        to: paths.dist + "/Common/fonts/syficon"
      },
      {
        from: paths.data,
        to: paths.dist + "/data"
      },
      {
        from: paths.vendor,
        to: paths.dist
      }
    ]),
    new ExtractTextPlugin("style.css"),
    //new DashboardPlugin(),
    // new WebpackMonitor({
    //     capture: true, // -> default 'true'
    //     target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
    //     launch: true, // -> default 'false'
    //     port: 3030, // default -> 8081
    //     excludeSourceMaps: true // default 'true'
    // }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      /*
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },*/
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          // 'file-loader'
          "file-loader?name=[path][name].[ext]"
        ]
      }
    ]
  }
};
