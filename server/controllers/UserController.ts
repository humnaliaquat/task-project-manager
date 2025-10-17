import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findById(userId).select("email firstName lastName role bio profilePic");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      newEmail,
      currentPassword,
      newPassword,
      firstName,
      lastName,
      role,
      bio,
      profilePic,
    } = req.body as {
      newEmail?: string;
      currentPassword?: string;
      newPassword?: string;
      firstName?: string;
      lastName?: string;
      role?: string;
      bio?: string;
      profilePic?: string;
    };

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Change email if provided
    if (newEmail && newEmail !== user.email) {
      user.email = newEmail.toLowerCase().trim();
    }

    // Update profile fields if provided
    if (typeof firstName === "string") user.firstName = firstName.trim();
    if (typeof lastName === "string") user.lastName = lastName.trim();
    if (typeof role === "string") user.role = role.trim();
    if (typeof bio === "string") user.bio = bio;
    if (typeof profilePic === "string") user.profilePic = profilePic;

    // Change password if requested
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required" });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    return res.status(200).json({
      message: "Account updated successfully",
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
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleted = await UserModel.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getUserInfo,
  updateUserInfo,
  deleteUser,
};