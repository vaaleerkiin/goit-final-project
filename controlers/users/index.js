const { ctrlWrapper } = require("../../helpers");

const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const editUser = require("./editUser");
const verifyToken = require("./verifyToken");
const verify = require("./verify");
const avatars = require("./avatars");
const theme = require("./theme");
const needHelp = require("./needHelp");
const google = require("./google");
const forgetPass = require("./forgetPass");
const resetPassword = require("./resetPassword");
const refresh = require("./refresh");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  editUser: ctrlWrapper(editUser),
  verifyToken: ctrlWrapper(verifyToken),
  verify: ctrlWrapper(verify),
  avatars: ctrlWrapper(avatars),
  theme: ctrlWrapper(theme),
  needHelp: ctrlWrapper(needHelp),
  google: ctrlWrapper(google),
  forgetPass: ctrlWrapper(forgetPass),
  resetPassword: ctrlWrapper(resetPassword),
  refresh: ctrlWrapper(refresh),
};
