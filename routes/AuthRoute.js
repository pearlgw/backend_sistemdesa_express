import express from "express";
import { Register, Login, Me, Logout } from "../controller/AuthController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", Me);
router.delete("/logout", Logout);

export default router;
