import { Request, Response } from "express";
import UserModel from "../models/User";


// GET /profile/info
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await UserModel.findById(userId).select(
      "email firstName lastName role bio profilePic"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /profile/update (multipart/form-data supported)
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, role, bio } = req.body as {
      firstName?: string;
      lastName?: string;
      role?: string;
      bio?: string;
      profilePic?: string; // base64 fallback
    };

    if (typeof firstName === "string") user.firstName = firstName.trim();
    if (typeof lastName === "string") user.lastName = lastName.trim();
    if (typeof role === "string") user.role = role.trim();
    if (typeof bio === "string") user.bio = bio;

    // Handle profilePic via multipart (req.file) or base64 in body
    const file = (req as any).file as Express.Multer.File | undefined;
    if (file && file.buffer) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      user.profilePic = base64;
    } else if (typeof (req.body as any).profilePic === "string") {
      user.profilePic = (req.body as any).profilePic;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        bio: user.bio,
        profilePic: user.profilePic,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default { getProfile, updateProfile };


