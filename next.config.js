// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // config.optimization.minimize = false;
    return config;
  },
};
