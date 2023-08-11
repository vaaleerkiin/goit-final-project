const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const CryptoJS = require("crypto-js");
const { nanoid } = require("nanoid");
const { User } = require("../models/user");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, SECRET_KEY } =
  process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/users/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, sub, picture, given_name: name } = profile;
    const user = await User.findOne({ email });
    const findUserByGoogleId = await User.findOne({ googleId: sub });

    const hashPass = CryptoJS.AES.encrypt(nanoid(), SECRET_KEY).toString();
    if (!findUserByGoogleId && !user) {
      const createdUser = await User.create({
        name,
        email,
        password: hashPass,
        verificationToken: "",
        avatarURL: { url: picture },
        googleId: sub,
      });

      done(null, createdUser);
    }

    if (!findUserByGoogleId && user) {
      done(null, user);
    }

    done(null, findUserByGoogleId);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
