import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import { createUser, loginSchema, loginUser } from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password, username, role } = req.body;
  const result = await createUser({
    name,
    email,
    password,
    username,
    role,
  } as IUser);
  if (result.error) {
    console.log(result.error);
    return res.status(400).json({ message: result.error });
  }
  res.status(201).json({ message: "User created" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginSchemaResult = loginSchema.safeParse({ email, password });
  if (!loginSchemaResult.success) {
    return res.status(400).json({ message: loginSchemaResult.error.format() });
  }
  const result = await loginUser({ email, password });
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
  });
  res.status(200).json({ message: "Login successful", token: result.token });
};
