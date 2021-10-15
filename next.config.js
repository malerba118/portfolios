// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // config.optimization.minimize = true;
    // config.optimization.minimizer = [
    //   new TerserPlugin({
    //     exclude: /node_modules\/browser-image-compression/,
    //     terserOptions: {
    //       keep_fnames: true,
    //       keep_classnames: true,
    //     },
    //   }),
    // ];
    return config;
  },
};
