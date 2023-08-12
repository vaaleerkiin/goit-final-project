const { User } = require("../../models/user");

const current = async (req, res, next) => {
  const { _id } = req.user;

  const data = await User.findById(_id);

  res.json({
    token: data.token,
    user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
    boards: data.boards,
    theme: data.theme,
  });
};

module.exports = current;
