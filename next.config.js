module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
};
