import { Response } from "express";
import User from "../models/user.model";
import { CustomRequest } from "../types/request";

export const deleteUser = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (user && user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};
