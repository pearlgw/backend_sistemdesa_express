import express from "express";
import {
  getLetterTypes,
  getLetterTypeById,
  createLetterType,
  updateLetterType,
  deleteLetterType,
} from "../controller/LetterTypeController.js";

const router = express.Router();

router.get("/letter-types", getLetterTypes);
router.get("/letter-types/:id", getLetterTypeById);
router.post("/letter-types", createLetterType);
router.patch("/letter-types/:id", updateLetterType);
router.delete("/letter-types/:id", deleteLetterType);

export default router;