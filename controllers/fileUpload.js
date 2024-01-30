const cloudinary = require("cloudinary").v2;
const fileModel = require("../models/file");
require("dotenv").config();

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    // console.log("Qaultiy gira di");
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    console.log(file);

    // validation

    const fileType = file.name.split(".")[1].toLowerCase();
    const supportedTypes = ["jpg", "jpeg", "png"];
    // not supported case
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(401).json({
        message: "File type not supported",
        success: false,
      });
    }

    // upload at cloudinary here !!
    const response = await uploadFileToCloudinary(
      file,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    // console.log(response.secure_url);

    // Save entry in DB
    const fileData = await fileModel.create({
      name,
      email,
      tags,
      url: response.secure_url,
      format: "image",
      uploadedAt: Date.now(),
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(402).json({
      success: false,
      message: "Failed to upload file at cloudinary",
    });
  }
};

exports.reducedImageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    // console.log(file);

    // validation

    const fileType = file.name.split(".")[1].toLowerCase();
    const supportedTypes = ["jpg", "jpeg", "png"];
    // not supported case
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(401).json({
        message: "File type not supported",
        success: false,
      });
    }

    // upload at cloudinary here !!
    const response = await uploadFileToCloudinary(
      file,
      process.env.CLOUDINARY_FOLDER_NAME,
      30
    );

    // Save entry in DB
    // console.log(response.secure_url);

    const fileData = await fileModel.create({
      name,
      email,
      tags,
      url: response.secure_url,
      format: "image",
      uploadedAt: Date.now(),
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(402).json({
      success: false,
      message: "Failed to upload file at cloudinary",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.videoFile;

    // console.log(file);

    // validation

    const fileType = file.name.split(".")[1].toLowerCase();

    const supportedTypes = ["mp4", "mov", "mkv"];
    // not supported case
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(401).json({
        message: "File type not supported",
        success: false,
      });
    }

    // upload at cloudinary here !!
    const response = await uploadFileToCloudinary(
      file,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    // Save entry in DB
    // console.log(response.secure_url);

    const fileData = await fileModel.create({
      name,
      email,
      tags,
      url: response.secure_url,
      format: "video",
      uploadedAt: Date.now(),
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(402).json({
      success: false,
      message: "Failed to upload file at cloudinary",
    });
  }
};

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file from req
    const file = req.files.file;
    // console.log(file);

    const fileExtension = file.name.split(".")[1];

    //   __dirname --> curent directory
    // date now creates uniqure file name everytime
    let path = __dirname + "/files/" + Date.now() + "." + fileExtension;

    // file ko apne path me store kr lia by moving
    file.mv(path, (err) => {
      console.error(err);
    });

    res.status(200).json({
      success: true,
      message: "file uplaoded on local server successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: " FAILED to upload file on local server ",
      error: e,
    });
  }
};
