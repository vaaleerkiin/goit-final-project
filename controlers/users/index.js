const { ctrlWrapper } = require("../../helpers");

const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const editUser = require("./editUser");
const verifyToken = require("./verifyToken");
const verify = require("./verify");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  editUser: ctrlWrapper(editUser),
  verifyToken: ctrlWrapper(verifyToken),
  verify: ctrlWrapper(verify),
};
