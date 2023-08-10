const { sendMail } = require("../../services");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
const ForgetMail = require("../../helpers/ForgetMail");

const forgetPass = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404);
  }
  const verificationToken = uuidv4();

  await User.findByIdAndUpdate(user._id, {
    verify: false,
    verificationToken,
  });
  await sendMail({
    to: email,
    subject: "Forget password",
    text: "Forget password",
    html: ForgetMail(verificationToken),
  });
  res.status(201).send({ message: "letter sent" });
};

module.exports = forgetPass;
