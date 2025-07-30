module.exports = {
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /node_modules\/sequelize/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];
    return config;
  },
  serverExternalPackages: ['sequelize'],
};