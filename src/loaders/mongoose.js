const mongoose = require("mongoose");
const config = require("../config/config");

module.exports = async () => {
  const connection = await mongoose.connect(
    config.mongoose.uri,
    config.mongoose.options
  );
  return connection.connection.db;
};
