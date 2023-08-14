const { User } = require("../../models/user");

const jwt = require("jsonwebtoken");
const { HttpError } = require("../../helpers");
const { Session } = require("../../models/session");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: reqRefreshToken } = req.body;

  const activeSession = await Session.findById(req.body.sid);
  if (!activeSession) {
    return res.status(404).send({ message: "Invalid session" });
  }
  try {
    let payload = jwt.verify(reqRefreshToken, REFRESH_SECRET_KEY);
    const user = await User.findById(payload.uid);
    const session = await Session.findById(payload.sid);
    if (!user || !session) {
      throw HttpError(404, "Invalid user or session");
    }

    await Session.findByIdAndDelete(payload.sid);
    const newSession = await Session.create({
      uid: user._id,
    });
    payload = { uid: user._id, sid: newSession._id };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      accessToken,
      refreshToken,
      sid: newSession._id,
    });
  } catch (error) {
    await Session.findById(req.body.sid);
    throw HttpError(403, error.message);
  }
};

module.exports = refresh;
