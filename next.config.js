const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.optimization.minimize = true;
    config.optimization.minimizer = [
      new TerserPlugin({
        exclude: /(node_modules\/browser-image-compression)/,
      }),
    ];
    return config;
  },
};
