const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
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
      const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.accessToken || user.accessToken !== token) {
        throw HttpError(401);
      }

      req.user = user;
      next();
    } catch (error) {
      throw HttpError(401);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = Authenticate;
