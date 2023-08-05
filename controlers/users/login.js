const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { SECRET, SECRET_KEY } = process.env;

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

  const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatarURL.url,
    },
  });
};

module.exports = login;
