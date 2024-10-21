import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User, { IUser } from "../models/user.model";

const userSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  role: z.enum(["user", "admin"]).default("user"),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const createUser = async (data: IUser) => {
  const validationResult = userSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: validationResult.error.format() };
  }

  const isUserExisting = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  });
  if (isUserExisting) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    username: data.username,
    role: data.role,
  });

  try {
    await user.save();
    return { error: null };
  } catch (err) {
    return { error: "Database error" };
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  const validationResult = loginSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: validationResult.error.format() };
  }

  const user = await User.findOne({ email: data.email });
  if (!user) {
    return { error: "User not found" };
  }

  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
  if (!isPasswordCorrect) {
    return { error: "Incorrect password" };
  }

  const token = jwt.sign(
    { email: user.email, role: user.role, id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return { error: null, token };
};
