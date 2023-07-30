const nodemailer = require("nodemailer");

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "tahaburrent@meta.ua",
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = async ({ to, subject, html, text }) => {
  const emailOptions = {
    from: "tahaburrent@meta.ua",
    to,
    subject,
    html,
    text,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendMail;
