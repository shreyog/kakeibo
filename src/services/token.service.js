const jwt = require("jsonwebtoken");
const { DateTime } = require("luxon");
const config = require("../config");
const { Container } = require("typedi");
const { NOT_FOUND } = require("http-status");
const userService = require("./user.service");

const { tokenTypes } = require("../constants");
const { ACCESS, REFRESH, RESET_PASSWORD } = tokenTypes;

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  try {
    const payload = {
      sub: userId,
      iat: DateTime.utc().ts,
      exp: expires.ts,
      type,
    };
    return jwt.sign(payload, secret);
  } catch (error) {
    throw error;
  }
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  try {
    const Token = Container.get("tokenModel");
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toISO(),
      type,
      blacklisted,
    });
    return tokenDoc;
  } catch (error) {
    throw error;
  }
};

const verifyToken = async (token, type) => {
  try {
    const Token = Container.get("tokenModel");
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });
    if (!tokenDoc) {
      throw new Error("Token not found");
    }
    return tokenDoc;
  } catch (error) {
    throw error;
  }
};

const generateAuthTokens = async (user) => {
  try {
    const accessTokenExpires = DateTime.local().plus({
      minutes: config.jwt.accessExpirationMinutes,
    });
    const accessToken = generateToken(user.id, accessTokenExpires, ACCESS);

    const refreshTokenExpires = DateTime.local().plus({
      days: config.jwt.refreshExpirationDays,
    });
    const refreshToken = generateToken(user.id, refreshTokenExpires, REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toISO(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toISO(),
      },
    };
  } catch (error) {
    throw error;
  }
};

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(NOT_FOUND, "No users found with this email");
  }
  const expires = DateTime.local().plus({
    minutes: config.jwt.accessExpirationMinutes,
  });
  const resetPasswordToken = generateToken(user.id, expires, RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, RESET_PASSWORD);
  return resetPasswordToken;
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
};
