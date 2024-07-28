import mongoose from "mongoose";

const dotenv = require("dotenv").config();
mongoose.set("strictQuery", false);
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? '');
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;