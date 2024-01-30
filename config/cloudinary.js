require("dotenv").config();
const cloudinary = require("cloudinary").v2;

module.exports.connectCloud = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    console.log("Cloudinary connected successfully");
  } catch (e) {
    console.error(e);
    console.log("Error while connecting cloudinary");
  }
};
