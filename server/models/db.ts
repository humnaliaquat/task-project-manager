import mongoose from "mongoose";

const mongo_url = process.env.MONGO_CONN as string;

if (!mongo_url) {
  throw new Error("❌ MONGO_CONN environment variable is missing!");
}

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("✅ Mongoose connected...");
  })
  .catch((error: unknown) => {
    console.error("❌ MongoDB connection error:", error);
  });
