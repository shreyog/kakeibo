const winston = require("winston");
const config = require("../config");

const transports = [];

transports.push(
  new winston.transports.Console({
    stderrLevels: ["error"],
  })
);

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ssZ" })
  ),
  transports,
});

module.exports = LoggerInstance;
