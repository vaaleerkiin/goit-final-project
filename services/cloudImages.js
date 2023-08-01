const cloudinary = require("cloudinary").v2;

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };

  return await cloudinary.uploader.upload(imagePath, options);
};

const deleteImage = async (imageID) => {
  return await cloudinary.uploader.destroy(imageID);
};

module.exports = { uploadImage, deleteImage };
