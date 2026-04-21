// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();
// const MONGODB_URI = process.env.MONGODB_URI!;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI)
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // ✅ Runtime check ONLY
  
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined at runtime");
  }

  // ✅ Reuse existing connection
  if (cached.conn) {
    return cached.conn;
  }

  try {
    cached.promise ??= mongoose.connect(process.env.MONGODB_URI);
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
