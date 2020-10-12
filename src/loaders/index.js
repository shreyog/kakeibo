const expressLoader = require("./express");
const dependencyInjectorLoader = require("./dependencyInjector");
const mongooseLoader = require("./mongoose");
const { models } = require("../models");
const Logger = require("./logger");

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

 const {message}= dependencyInjectorLoader({ models });
  Logger.info(message);

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
