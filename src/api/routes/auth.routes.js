const { Router } = require("express");
const validate = require("../helpers/validate");
const { userEmailRegisterPayload } = require("../validations");
const { celebrate } = require("celebrate");
const route = Router();

route.post(
  "/email/register",
  celebrate({ body: userEmailRegisterPayload }),
  async (req, res, next) => {
    return res.send({message: "hello"})
  }
);

module.exports = route;
