const e = require("express");
const { Container } = require("typedi");
const LoggerInstance = require("./logger");

module.exports = ({ mongoConnection, models }) => {
  try {
    models.map((m) => {
      Container.set(m.name, m.model);
    });

    Container.set("logger", LoggerInstance);

    return { message: "Dependencies Injected Successfully" };
  } catch (error) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
