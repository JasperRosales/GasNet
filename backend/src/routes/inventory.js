//3-2
import express from "express";
import { inventoryController } from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/inventory/sync", inventoryController);

export default router;