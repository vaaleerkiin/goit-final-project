const jwt = require("jsonwebtoken");
const { Session } = require("../../models/session");

const { CLIENT_URL, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const google = async (req, res, next) => {
  const newSession = await Session.create({
    uid: req.user._id,
  });
  const payload = { uid: req.user._id, sid: newSession._id };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.redirect(
    `${CLIENT_URL}/project-magic-task-manager/welcome?accessToken=${accessToken}&refreshToken=${refreshToken}&sessionId=${newSession._id}`
  );
};

module.exports = google;
