const CryptoJS = require("crypto-js");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

const editUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { _id } = req.user;
  const userInfo = {
    name,
    email,
  };
  if (password) {
    userInfo.password = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  }

  const result = await User.findByIdAndUpdate(_id, userInfo, { new: true });

  res.status(201).json(result);
};

module.exports = editUser;
