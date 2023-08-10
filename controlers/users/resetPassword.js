const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const CryptoJS = require("crypto-js");

const { SECRET_KEY } = process.env;
const resetPassword = async (req, res, next) => {
  const { verificationToken } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  const hashPass = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  await User.findByIdAndUpdate(user._id, {
    verify: false,
    password: hashPass,
    verificationToken: "",
  });

  res.status(200).json({ message: "password has been changed" });
};

module.exports = resetPassword;
