const { uploadImage, deleteImage } = require("./cloudImages");
const sendMail = require("./email");

module.exports = { sendMail, uploadImage, deleteImage };
