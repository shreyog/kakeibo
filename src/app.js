const config = require("./config");

const express = require("express");

const logger = require("./loaders/logger");

let server;
const startServer = async () => {
  const app = express();

  await require("./loaders")({ expressApp: app });

  server = app.listen(config.port, () => {
    logger.info(
      `
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `
    );
  });
};

startServer();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
