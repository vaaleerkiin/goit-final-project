const CryptoJS = require("crypto-js");
const { SECRET_KEY } = process.env;
const current = async (req, res, next) => {
  const { email, name, password } = req.user;

  res.json({
    email,
    name,
    password: CryptoJS.AES.decrypt(password, SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    ),
  });
};

module.exports = current;
