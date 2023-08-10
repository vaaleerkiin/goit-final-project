const { User } = require("../../models/user");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const { SECRET, SECRET_KEY } = process.env;

const google = async (req, res, next) => {
  const { email, name, sub, picture } = req.body;
  const user = await User.findOne({ email });
  const findUserByGoogleIde = await User.findOne({ googleId: sub });

  const hashPass = CryptoJS.AES.encrypt(sub, SECRET_KEY).toString();

  if (!findUserByGoogleIde && !user) {
    const verificationToken = uuidv4();
    const createdUser = await User.create({
      name,
      email,
      password: hashPass,
      verificationToken,
      avatarURL: { url: picture },
      googleId: sub,
    });
    const payload = { id: createdUser._id };

    const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });

    const data = await User.findByIdAndUpdate(
      createdUser._id,
      {
        token,
      },
      { new: true }
    );

    res.status(201).json({
      token: data.token,
      user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
      boards: data.boards,
      theme: data.theme,
    });
  }

  if (!findUserByGoogleIde && user) {
    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });

    const data = await User.findByIdAndUpdate(
      user._id,
      { token, email, googleId: sub },
      { new: true }
    );

    res.status(200).json({
      token: data.token,
      user: { name: data.name, email: data.email, avatar: data.avatarURL.url },
      boards: data.boards,
      theme: data.theme,
    });
  }

  const payload = { id: findUserByGoogleIde._id };

  const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });

  const data = await User.findByIdAndUpdate(
    findUserByGoogleIde._id,
    { token },
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
