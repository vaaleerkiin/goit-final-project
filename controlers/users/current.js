const CryptoJS = require("crypto-js");

const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;
const current = async (req, res, next) => {
  const { password, _id } = req.user;
  req.user.password = CryptoJS.AES.decrypt(password, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
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

  res.json(...result);
};

module.exports = current;
