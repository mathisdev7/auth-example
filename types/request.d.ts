import express from "express";
type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  role: string;
};
interface CustomRequest extends express.Request {
  user?: User;
}
