const fs = require("fs/promises");
const CryptoJS = require("crypto-js");
const { User, defaultAvatar } = require("../../models/user");
const { uploadImage, deleteImage } = require("../../services");
const { SECRET_KEY } = process.env;
const Jimp = require("jimp");

const editUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { _id, avatarURL } = req.user;
  const userInfo = {
    name,
    email,
  };
  if (password) {
    userInfo.password = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  }
  if (req.file) {
    const { path: tempUpload } = req.file;

    const image = await Jimp.read(tempUpload);
    const minSize = Math.min(image.getWidth(), image.getHeight());
    const x = (image.getWidth() - minSize) / 2;
    const y = (image.getHeight() - minSize) / 2;
    image.crop(x, y, minSize, minSize);
    image.scaleToFit(68, 68).write(tempUpload);

    const url = await uploadImage(tempUpload);
    await fs.unlink(tempUpload);
    if (
      avatarURL.url !== defaultAvatar &&
      avatarURL.asset_id !== url.asset_id
    ) {
      await deleteImage(avatarURL.public_id);
    }

    const cover = {
      url: url.url,
      width: url.width,
      height: url.height,
      format: url.format,
      asset_id: url.asset_id,
      public_id: url.public_id,
      created_at: url.created_at,
      original_filename: url.original_filename,
    };
    userInfo.avatarURL = cover;
  }

  const result = await User.findByIdAndUpdate(_id, userInfo, { new: true });

  res.status(201).json({
    name: result.name,
    email: result.email,
    avatar: result.avatarURL.url,
  });
};

module.exports = editUser;
