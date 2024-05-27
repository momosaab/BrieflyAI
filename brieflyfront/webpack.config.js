const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new CopyPlugin({
          patterns: [
            { from: "public/manifest.json", to: "" },
            { from: "public/sample1.png", to: "" },
            { from: "public/sample2.png", to: "" },
            { from: "public/sample3.png", to: "" }
          ]
        })
      ]
    }
  }
};
