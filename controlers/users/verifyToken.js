const { User } = require("../../models/user");

const { CLIENT_URL } = process.env;
const verifyToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(404).redirect(`${CLIENT_URL}/project-magic-task-manager/`);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
  });
  res
    .status(200)
    .redirect(
      `${CLIENT_URL}/project-magic-task-manager/auth/resetePassword?verificationToken=${verificationToken}`
    );
};

module.exports = verifyToken;
