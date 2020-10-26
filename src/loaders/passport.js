const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: GoogleStrategy } = require("passport-google-oauth2");
const config = require("../config");
const { tokenTypes } = require("../constants");
const User = require("../models/user.model");

const logger = require("./logger");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      logger.error("Invalid token type");
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const googleOAuthOptions = {
  clientID: config.googleOAuth.googleClientId,
  clientSecret: config.googleOAuth.googleClientSecret,
  callbackURL: config.googleOAuth.googleCallbackURL,
  passReqToCallback: true,
};

const handleProviderLogin = async (
  request,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    // console.log(profile);
    return done(null, profile);
  } catch (error) {
    throw error;
  }
};

const googleStrategy = new GoogleStrategy(
  googleOAuthOptions,
  handleProviderLogin
);

module.exports = { jwtStrategy, googleStrategy };
