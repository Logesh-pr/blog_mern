import mongoose from "mongoose";
import "dotenv/config.js";

export default async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Server successfully connected to database");
  } catch (error) {
    console.log(`error message : ${error.message}`);
  }
}
