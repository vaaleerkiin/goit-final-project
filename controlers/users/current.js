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
  res.json(...result);
};

module.exports = current;
