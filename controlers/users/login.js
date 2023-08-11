const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY, SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare =
    CryptoJS.AES.decrypt(user.password, SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    ) === password;

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };

  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  const result = await User.aggregate([
    {
      $match: {
        _id: user._id,
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

  res.status(200).json({
    token: data.token,
    user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
    boards: data.boards,
    theme: data.theme,
  });
};

module.exports = login;
