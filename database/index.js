const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  console.log("Database Connected Successfully");
};

module.exports = connect;
