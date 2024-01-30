require("dotenv").config();
const nodemailer = require("nodemailer");

exports.mailTransporter = () => {
  return (transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  }));
};
