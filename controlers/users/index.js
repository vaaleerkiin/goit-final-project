const { ctrlWrapper } = require("../../helpers");
const subscription = require("./subscription");
const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const avatars = require("./avatars");
const verifyToken = require("./verifyToken");
const verify = require("./verify");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription),
  avatars: ctrlWrapper(avatars),
  verifyToken: ctrlWrapper(verifyToken),
  verify: ctrlWrapper(verify),
};
