import { Router } from "express";
import { login, signUp } from "../controllers/auth.controllers";
import { deleteUser } from "../controllers/user.controllers";
import { authenticateJWT } from "../middleware/auth.middleware";
import { CustomRequest } from "../types/request";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = Router();

router.post("/auth/signup", signUp);
router.post("/auth/login", login);
router.get("/users/delete/:id", authenticateJWT, (req: CustomRequest, res) => {
  deleteUser(req, res);
});
router.get("/users/me", authenticateJWT, (req: CustomRequest, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
});

export default router;
