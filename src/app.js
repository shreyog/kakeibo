const config = require("./config");

const express = require("express");

const Logger = require("./loaders/logger");

const startServer = async () => {
  const app = express();

  await require("./loaders")({ expressApp: app });

  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
    }
    Logger.info(
      `
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `
    );
  });
};

startServer();
