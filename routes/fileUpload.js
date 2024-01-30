const express = require("express");
const fileRouter = express.Router();
const {
  localFileUpload,
  imageUpload,
  videoUpload,
  reducedImageUpload,
} = require("../controllers/fileUpload");

fileRouter.post("/localFileUpload", localFileUpload);
fileRouter.post("/imageUpload", imageUpload);
fileRouter.post("/videoUpload", videoUpload);
fileRouter.post("/reducedImageUpload", reducedImageUpload);

module.exports = fileRouter;
