const { Router } = require("express");
const { CREATED } = require("http-status");
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

module.exports = router;
