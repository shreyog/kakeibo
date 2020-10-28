const { Router } = require("express");
const { CREATED, NO_CONTENT } = require("http-status");
const validate = require("../middlewares/validate");
const { authValidation } = require("../validations");
const { authController } = require("../controllers");
const { successResponse } = require("../utils/response");

const router = Router();

router.post(
  "/email/register",
  validate(authValidation.register),
  async (req, res, next) => {
    try {
      const result = await authController.register(req.body);
      res.json(
        successResponse(result, "Successfully Registered User", CREATED)
      );
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/email/login",
  validate(authValidation.login),
  async (req, res, next) => {
    try {
      const result = await authController.login(req.body);
      res.json(successResponse(result, "Logged in Successfully"));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/email/logout",
  validate(authValidation.logout),
  async (req, res, next) => {
    try {
      await authController.logout(req.body);
      res.status(NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/email/refresh-tokens",
  validate(authValidation.refreshTokens),
  async (req, res, next) => {
    try {
      const result = await authController.refreshTokens(req.body);
      res.json(
        successResponse(result, "Successfully Fetched New Refresh Token")
      );
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/email/forgot-password",
  validate(authValidation.forgotPassword, async (req, res, next) => {
    try {
      await authController.forgotPassword(req.body);
      res.status(NO_CONTENT).send();
    } catch (error) {}
  })
);

router.post(
  "/email/reset-password",
  validate(authValidation.resetPassword),
  async (req, res, next) => {
    try {
      await authController.resetPassword(req.query, req.body);
      res.status(NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
