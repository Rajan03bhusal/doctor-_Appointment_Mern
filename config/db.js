const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Rajan:Rajan123@cluster0.vueuqhm.mongodb.net/doctorapp"
    );
    console.log(`Database connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`error ${error}`);
  }
};
module.exports = connectDB;
