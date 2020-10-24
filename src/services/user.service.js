const { BAD_REQUEST } = require("http-status");
const { Container } = require("typedi");
const ApiError = require("../utils/ApiError");

const createUser = async (payload) => {
  const User = Container.get("userModel");
  try {
    if (await User.isEmailTaken(payload.email)) {
      throw new ApiError(BAD_REQUEST, "Email already taken");
    }
    const user = await User.create(payload);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};
