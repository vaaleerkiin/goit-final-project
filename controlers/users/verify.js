const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
// const { sendMail } = require("../../services");

const verify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.verify) {
    throw HttpError(404);
  }

  // const verificationToken = user.verificationToken;

  // await sendMail({
  //   to: email,
  //   subject: "Verify email",
  //   html: mailMurkup(verificationToken),
  // });

  res.status(200).json({ message: "Verification email sent" });
};
module.exports = verify;
