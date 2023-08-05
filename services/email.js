const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async ({ to, subject, html, text }) => {
  const msg = {
    to,
    from: "auth_service@meta.ua",
    subject,
    text,
    html,
  };

  await sgMail.send(msg);
};

module.exports = sendMail;
