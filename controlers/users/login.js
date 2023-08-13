const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
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
  const payload = { id: user._id };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
   const data = await User.findByIdAndUpdate(user._id, { accessToken, refreshToken }, { new: true });
 
  res.status(200).json({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
    boards: data.boards,
    theme: data.theme,
  });
};

module.exports = login;
