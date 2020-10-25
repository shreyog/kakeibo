const { DateTime } = require("luxon");
const config = require("../config");

const { tokenTypes } = require("../constants");
const { ACCESS, REFRESH } = tokenTypes;

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
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
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateAuthTokens,
};
