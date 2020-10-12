const e = require("express");
const { Container } = require("typedi");
const LoggerInstance = require("./logger");

module.exports = ({ models }) => {
  try {
    models.map((m) => {
      Container.set(m.name, m.model);
    });

    Container.set("logger", LoggerInstance);

    return { message: "✌️  Dependency Injector loaded" };
  } catch (error) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
