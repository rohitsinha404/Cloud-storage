const mongoose = require("mongoose");

require("dotenv").config();

module.exports.connectDb = async () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected Successfully"))
    .catch((e) => {
      console.log("Error while connecting DB");
      process.exit(1);
    });
};
