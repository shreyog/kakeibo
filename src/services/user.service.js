const { BAD_REQUEST, NOT_FOUND } = require("http-status");
const { Container } = require("typedi");
const ApiError = require("../utils/ApiError");

const createUser = async (payload) => {
  try {
    const User = Container.get("userModel");

    if (await User.isEmailTaken(payload.email)) {
      throw new ApiError(BAD_REQUEST, "Email already taken");
    }
    const user = await User.create(payload);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const User = Container.get("userModel");

    return User.findOne({ id });
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const User = Container.get("userModel");

    return User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
};
