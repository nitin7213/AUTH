import mongoose from "mongoose";

const handleCon = async (URL) => {
  await mongoose.connect(URL);
};

export default handleCon;
