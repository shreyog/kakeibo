const { userService, tokenService } = require("../services");


const register = async (payload) => {
  const user = await userService.createUser(payload);
  const tokens = await tokenService.generateAuthTokens(user);
  return { user, tokens };
};

module.exports = {
  register,
};
