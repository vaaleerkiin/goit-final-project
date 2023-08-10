const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const { SECRET, SECRET_KEY } = process.env;

const google = async (req, res, next) => {
  const { email, name, sub, picture } = req.body;
  const user = await User.findOne({ email });
  const hashPass = CryptoJS.AES.encrypt(sub, SECRET_KEY).toString();

  if (!user) {
    const verificationToken = uuidv4();
    const createdUser = await User.create({
      name,
      email,
      password: hashPass,
      verificationToken,
      avatarURL: { url: picture },
    });
    const payload = { id: createdUser._id };

    const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });

    const data = await User.findByIdAndUpdate(
      createdUser._id,
      { token, avatarURL: { url: picture }, name, email, password: hashPass },
      { new: true }
    );

    res.status(201).json({
      token: data.token,
      user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
      boards: data.boards,
      theme: data.theme,
    });
  }
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });

  const data = await User.findByIdAndUpdate(
    user._id,
    { token, email },
    { new: true }
  );

  res.status(200).json({
    token: data.token,
    user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
    boards: data.boards,
    theme: data.theme,
  });
};

module.exports = google;
