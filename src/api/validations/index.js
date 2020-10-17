const { Joi } = require("celebrate");

const passwordPattern = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
);

const strongPasswordErrorMessage =
  "Password should be a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";

module.exports = {
  userEmailRegisterPayload: Joi.object({
    full_name: Joi.string(),
    user_name: Joi.string().required(),
    dob: Joi.string().allow(null),
    gender: Joi.string().valid("male", "female", "other"),
    email: Joi.string().email(),
    password: Joi.string()
      .regex(passwordPattern)
      .required()
      .trim()
      .error(new Error(strongPasswordErrorMessage)),
  }),
};
