import express from "express";
import { getUsers, getUserById } from "../controller/UserController.js";
import { adminOnly, verifyUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUserById);

export default router;
