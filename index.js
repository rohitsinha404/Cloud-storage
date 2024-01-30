const express = require("express");
const fileUpload = require("express-fileupload");
const { connectDb } = require("./config/database");
const { connectCloud } = require("./config/cloudinary");
const fileRouter = require("./routes/fileUpload");
const app = express();

//midllewares
require("dotenv").config();
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
); // midllware for uploading file to server
connectDb();
connectCloud(); //for uploading file from server to media server

// mouting the router
app.use("/api/v1/upload", fileRouter);

const PORT = process.env.PORT_NO || 4000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to File Upload</h1>");
});
