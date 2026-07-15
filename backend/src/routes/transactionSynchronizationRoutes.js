import express from "express";
import synchronizeTransactionController from "../controllers/transactionSynchronizationController.js";

const router = express.Router();

router.post("/transactions/synchronize",synchronizeTransactionController);

export default router;