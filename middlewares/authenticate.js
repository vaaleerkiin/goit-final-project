const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { Session } = require("../models/session");
const { User } = require("../models/user");
const { ACCESS_SECRET_KEY } = process.env;

const Authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw HttpError(401);
    }
    try {
      const payload = jwt.verify(token, ACCESS_SECRET_KEY);
      const user = await User.findById(payload.uid);
      const session = await Session.findById(payload.sid);
      if (!user || !session) {
        throw HttpError(404, "Invalid user or session");
      }

      req.user = user;
      req.session = session;
      next();
    } catch (error) {
      throw HttpError(401);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = Authenticate;
