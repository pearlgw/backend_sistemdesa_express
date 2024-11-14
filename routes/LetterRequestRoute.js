import express from "express";
import {
  getLetterRequests,
  getLetterRequestsById,
  createLetterRequest,
  agreementLetterRequest,
  deleteLetterRequest,
} from "../controller/LetterRequestController.js";

const router = express.Router();

router.get("/letter-requests", getLetterRequests);
router.get("/letter-requests/:id", getLetterRequestsById);
router.post("/letter-requests", createLetterRequest);
router.patch("/letter-requests/:id", agreementLetterRequest);
router.delete("/letter-requests/:id", deleteLetterRequest);

export default router;
