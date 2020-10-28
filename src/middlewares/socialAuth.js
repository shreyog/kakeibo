const passport = require("passport");

const socialAuth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("google", { scope: ["email", "profile"] });
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = {
  socialAuth,
};
