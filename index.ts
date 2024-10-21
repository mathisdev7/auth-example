import express from "express";
import { connectDatabase } from "./database";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();

app.use("/api", authRoutes);

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Hello World" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
