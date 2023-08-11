const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");

const { SECRET, SECRET_KEY, CLIENT_URL, ACCESS_SECRET_KEY } = process.env;

const google = async (req, res, next) => {
  console.log(req.user);

  const payload = { id: req.user._id };

  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(req.user._id, { token });

  res.redirect(
    `${CLIENT_URL}/project-magic-task-manager/welcome?accessToken=${token}`
  );
};

module.exports = google;
