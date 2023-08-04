const { User } = require("../../models/user");

const current = async (req, res, next) => {
  const { _id } = req.user;
  const result = await User.aggregate([
    {
      $match: {
        _id,
      },
    },
    {
      $lookup: {
        from: "boards",
        localField: "_id",
        foreignField: "owner",
        as: "boards",
      },
    },
  ]);

  delete result[0].password;
  const [data] = result;
  res.json({
    token: data.token,
    user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
  });
};

module.exports = current;
