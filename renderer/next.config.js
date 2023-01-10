const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
};
