const { mailMurkup } = require("../../helpers");
const { sendMail } = require("../../services");

const needHelp = async (req, res, next) => {
  const { email, text } = req.body;
  await sendMail({
    to: "taskpro.project@gmail.com",
    // to: "v.kamelkov@gmail.com",
    subject: "Tech Support",
    text: "Tech Support",
    html: mailMurkup(text, email),
  });
  res.status(201).json("ok");
};

module.exports = needHelp;
