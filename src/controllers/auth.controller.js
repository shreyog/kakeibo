const { authService, tokenService, userService } = require("../services");

const register = async (payload) => {
  try {
    const user = await userService.createUser(payload);
    const tokens = await tokenService.generateAuthTokens(user);
    return { user, tokens };
  } catch (error) {
    throw error;
  }
};

const login = async (payload) => {
  try {
    const { email, password } = payload;
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    const tokens = await tokenService.generateAuthTokens(user);
    return { user, tokens };
  } catch (error) {
    throw error;
  }
};

const logout = async (payload) => {
  try {
    const { refreshToken } = payload;
    await authService.logout(refreshToken);
    return { message: "Logged out Successfully" };
  } catch (error) {
    throw error;
  }
};

const refreshTokens = async (payload) => {
  try {
    const { refreshToken } = payload;
    const tokens = await authService.refreshAuth(refreshToken);
    return { ...tokens };
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (payload) => {
  try {
    const { email } = payload;
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
      email
    );
    // await emailService.sendResetPasswordEmail(email, resetPasswordToken);
    return { message: "Reset Email Sent Successfully" };
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (param, payload) => {
  try {
    const { token } = param;
    const { password } = payload;
    await authService.resetPassword(token, password);
    return { message: "Password Reset Successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
