const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  port: process.env.PORT || 9000,
  databaseURL: process.env.MONGODB_URI,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: "/api",
  },
};
