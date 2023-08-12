const { User } = require("../../models/user");

const jwt = require("jsonwebtoken");

const { CLIENT_URL, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const google = async (req, res, next) => {
  console.log(req.user);

  const payload = { id: req.user._id };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(req.user._id, { accessToken, refreshToken });

  res.redirect(
    `${CLIENT_URL}/project-magic-task-manager/welcome?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = google;
