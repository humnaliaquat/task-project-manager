import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Kept for backward compatibility with existing auth flows
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Fields used by Profile.tsx
    firstName: { type: String, default: "", trim: true },
    lastName: { type: String, default: "", trim: true },
    role: { type: String, default: "", trim: true },
    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" }, // URL or base64 data URL

    // Fields used by Account.tsx
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
