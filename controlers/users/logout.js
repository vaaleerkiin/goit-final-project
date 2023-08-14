const { Session } = require("../../models/session");
const logout = async (req, res, next) => {
  const { _id } = req.session;
  await Session.findByIdAndDelete(_id);

  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
