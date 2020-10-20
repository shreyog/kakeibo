const bodyParser = require("body-parser");
const express = require("express");
const { errors } = require("celebrate");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const router = require("../api");
const config = require("../config/config");

module.exports = async ({ app }) => {
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

  app.use(errors());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("User Not Found");
    err["status"] = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  console.log(
    app._router.stack.filter((r) => r.route).map((r) => r.route.path)
  );
};
