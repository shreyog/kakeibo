const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");
const Logger = require("./logger");

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
