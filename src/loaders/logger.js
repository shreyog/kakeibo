const winston = require("winston");
const config = require("../config/config");

const transports = [];

if (process.env.NODE_ENV !== "development") {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.simple()
      ),
    })
  );
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ssZ" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.colorize({ all: true }),
    winston.format.json()
  ),
  transports,
});

module.exports = LoggerInstance;
