const { userService } = require("../services");

const register = async (payload) => {
  const user = await userService.createUser(payload);

  return { user };
};

module.exports = {
  register,
};
