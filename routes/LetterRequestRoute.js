import express from "express";
import {
  getLetterRequests,
  getLetterRequestsById,
  createLetterRequest,
  agreementLetterRequest,
  getLetterRequestsByUser,
} from "../controller/LetterRequestController.js";
import { adminOnly, verifyUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/letter-requests", verifyUser, adminOnly, getLetterRequests);
router.get("/letter-requests/:id", verifyUser, adminOnly, getLetterRequestsById);
router.post("/letter-requests", verifyUser, createLetterRequest);
router.patch("/letter-requests/:id", verifyUser, adminOnly, agreementLetterRequest);

router.get("/letter-request-user", verifyUser, getLetterRequestsByUser);

export default router;
