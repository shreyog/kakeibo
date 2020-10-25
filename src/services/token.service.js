const jwt = require("jsonwebtoken");
const { DateTime } = require("luxon");
const config = require("../config");
const { Container } = require("typedi");

const { tokenTypes } = require("../constants");
const { ACCESS, REFRESH } = tokenTypes;

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: DateTime.utc().ts,
    exp: expires.ts,
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const Token = Container.get("tokenModel");

  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toISO(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
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
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
