import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(
      "mongo_uri: ",
      "mongodb+srv://bidkarojas:bidkarojas@cluster0.7gmwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const conn = await mongoose.connect(
      "mongodb+srv://bidkarojas:bidkarojas@cluster0.7gmwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB: ", error.message);
    process.exit(1); // 1 is failure, 0 status code is success
  }
};
