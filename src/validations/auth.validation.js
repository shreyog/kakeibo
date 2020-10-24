const Joi = require("@hapi/joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    user_name: Joi.string().required(),
  }),
};

module.exports = {
  register,
};
