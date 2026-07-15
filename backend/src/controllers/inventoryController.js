//3-2
import { syncInventory } from "../services/inventoryService.js";

export function inventoryController(req, res) {
  try {
    const result = syncInventory();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Inventory synchronization failed.",
      error: error.message,
    });
  }
}