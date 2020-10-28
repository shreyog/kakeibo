const expressLoader = require("./express");
const dependencyInjectorLoader = require("./dependencyInjector");
const mongooseLoader = require("./mongoose");
const { models } = require("../models");
const logger = require("./logger");

module.exports = async ({ expressApp }) => {
  await mongooseLoader();
  logger.info("✌️ DB loaded and connected!");

  const { message } = dependencyInjectorLoader({ models });
  logger.info(message);

  await expressLoader({ app: expressApp });
  logger.info("✌️ Express loaded");
};
