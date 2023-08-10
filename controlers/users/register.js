const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");

const { SECRET_KEY } = process.env;
const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPass = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

  await User.create({
    name,
    email,
    password: hashPass,
    verificationToken: "",
  });

  res.status(201).json({ user: { name, email } });
};

module.exports = register;
