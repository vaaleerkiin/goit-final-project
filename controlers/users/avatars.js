const fs = require("fs/promises");
const { User, defaultAvatar } = require("../../models/user");
const { uploadImage, deleteImage } = require("../../services");

const avatars = async (req, res, next) => {
  const { path: tempUpload } = req.file;
  const { _id } = req.user;

  const user = await User.findById(_id);

  const url = await uploadImage(tempUpload);

  if (
    user.avatarURL.url !== defaultAvatar &&
    user.avatarURL.asset_id !== url.asset_id
  ) {
    await deleteImage(user.avatarURL.public_id);
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
  await User.findByIdAndUpdate(_id, { avatarURL: cover });

  await fs.unlink(tempUpload);

  res.status(201).json({ message: cover });
};

module.exports = avatars;
