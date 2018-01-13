// See typescriptlang.org/docs/handbook/integrating-with-build-tools.html.
module.exports = {
  entry: "./ts/main.ts",
  output: {
    filename: "dist/main.js"
  },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by
      // 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}

