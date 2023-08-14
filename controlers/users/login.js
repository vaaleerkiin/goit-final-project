const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { Session } = require("../../models/session");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare =
    CryptoJS.AES.decrypt(user.password, SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    ) === password;

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const newSession = await Session.create({
    uid: user._id,
  });

  const payload = { uid: user._id, sid: newSession._id };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  const data = await User.findById(user._id);

  res.status(200).json({
    accessToken,
    refreshToken,
    sid: newSession._id,
    user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
    boards: data.boards,
    theme: data.theme,
  });
};

module.exports = login;
