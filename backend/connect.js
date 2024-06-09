import mongoose from "mongoose";

const handleCon = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default handleCon;
