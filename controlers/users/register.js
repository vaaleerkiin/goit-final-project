const { HttpError } = require("../../helpers");
// const { sendMail } = require("../../services");
const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const { SECRET_KEY } = process.env;
const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPass = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  const verificationToken = uuidv4();
  await User.create({
    name,
    email,
    password: hashPass,
    verificationToken,
  });

  // await sendMail({
  //   to: email,
  //   subject: "Verify email",
  //   html: mailMurkup(verificationToken),
  //   text: "Verify email",
  // });

  res.status(201).json({ user: { name, email } });
};

module.exports = register;