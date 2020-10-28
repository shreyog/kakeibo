const { UNAUTHORIZED, NOT_FOUND } = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../constants");

const { REFRESH } = tokenTypes;

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(UNAUTHORIZED, "Incorrect email or password");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const logout = async (refreshToken) => {
  try {
    const Token = Container.get("tokenModel");
    const refreshTokenDoc = await Token.findOne({
      token: refreshToken,
      type: REFRESH,
      blacklisted: false,
    });
    if (!refreshTokenDoc) {
      throw new ApiError(NOT_FOUND, "Not found");
    }
    await refreshTokenDoc.remove();
  } catch (error) {
    throw error;
  }
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const Token = Container.get("tokenModel");
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: RESET_PASSWORD });
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(UNAUTHORIZED, "Password reset failed");
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
};
