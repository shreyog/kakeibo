const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const passport = require("passport");
const { jwtStrategy, googleStrategy } = require("./passport");
const { NOT_FOUND } = require("http-status");
const morgan = require("./morgan");
const router = require("../routes");
const config = require("../config");
const { authLimiter } = require("../middlewares/rateLimiter");
const { errorConverter, errorHandler } = require("../middlewares/error");
const ApiError = require("../utils/ApiError");

module.exports = async ({ app }) => {
  if (config.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

  /**
   * Health Check endpoints
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // Helmet helps you secure your Express apps by setting various HTTP headers.
  app.use(helmet());

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  app.options("*", cors());

  // passport and it's strategies implementations
  app.use(passport.initialize());
  passport.use("jwt", jwtStrategy);
  passport.use("google", googleStrategy);

  // limit repeated failed requests to auth endpoints
  if (config.env === "production") {
    app.use("/api/auth", authLimiter);
  }

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // sanitize request data
  app.use(xss());
  app.use(mongoSanitize());

  // gzip compression
  app.use(compression());

  // Load API routes
  app.use(config.api.prefix, router);

  // send back a 404 error for any unknown api request
  app.use((req, res, next) => {
    next(new ApiError(NOT_FOUND, "Not found"));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);
};
