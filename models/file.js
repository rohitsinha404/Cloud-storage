// schema for file
//     name
//     email
//     tags
//     url of img

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { mailTransporter } = require("../config/mailTransporter");

const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  url: {
    type: String,
  },
  tags: {
    type: String,
  },
  format: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
});

// post middleware

fileSchema.post("save", async function (doc) {
  try {
    console.log(doc);
    console.log("Entry Saved in db");

    // creating a transporter
    let transporter = mailTransporter();

    // send email
    let info = await transporter.sendMail({
      from: `Cloud Storage`,
      to: doc.email,
      subject: "New file Uploaded on cloudinary",
      html: `
      <h2>File Uploaded </h2>
      <span>View here: <a href="${doc.url}">Click To View</a></span>
      <br>
      <img src="${doc.url}" alt="Uploaded File"/>
      `,
    });

    console.log("Mail sent to ", doc.email);
  } catch (e) {
    console.error(e);
  }
});

module.exports = mongoose.model("fileModel", fileSchema);
