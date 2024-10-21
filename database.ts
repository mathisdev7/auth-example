import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDatabase = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env"
    );
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};
