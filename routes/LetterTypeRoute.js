import express from "express";
import {
  getLetterTypes,
  getLetterTypeById,
  createLetterType,
  updateLetterType,
  deleteLetterType,
} from "../controller/LetterTypeController.js";
import { adminOnly, verifyUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/letter-types", verifyUser, adminOnly, getLetterTypes);
router.get("/letter-types/:id", verifyUser, adminOnly, getLetterTypeById);
router.post("/letter-types", verifyUser, adminOnly, createLetterType);
router.patch("/letter-types/:id", verifyUser, adminOnly, updateLetterType);
router.delete("/letter-types/:id", verifyUser, adminOnly, deleteLetterType);

export default router;
