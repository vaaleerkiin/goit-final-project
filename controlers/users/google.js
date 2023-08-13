const { User } = require("../../models/user");

const jwt = require("jsonwebtoken");

const { CLIENT_URL, ACCESS_SECRET_KEY } = process.env;

const google = async (req, res, next) => {
  const payload = { id: req.user._id };

  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(req.user._id, { token });

  res.redirect(
    `${CLIENT_URL}/project-magic-task-manager/welcome?accessToken=${token}`
  );
};

module.exports = google;
