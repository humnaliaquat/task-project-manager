import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

// GET /account/info (email only)
export const getAccount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await UserModel.findById(userId).select("email");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ email: user.email });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /account/update (email/password)
export const updateAccount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { newEmail, currentPassword, newPassword } = req.body as {
      newEmail?: string;
      currentPassword?: string;
      newPassword?: string;
    };

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (newEmail && newEmail !== user.email) {
      user.email = newEmail.toLowerCase().trim();
    }

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
    return res.status(200).json({ message: "Account updated successfully" });
  } catch (err: any) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Email already in use" });
    }
    return res.status(500).json({ message: err.message });
  }
};

// DELETE /account/delete
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const deleted = await UserModel.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default { getAccount, updateAccount, deleteAccount };


