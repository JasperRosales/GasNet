//3-2
import inventory from "../data/mockInventory.js";
import {isOnline} from "./internet.js";
import {saveLocal,getLocal,clearLocal} from "./localStorage.js";
import updateStock from "./stockService.js";

function syncInventory() {
  // if Offline save to local queue
  if (!isOnline()) {
    saveLocal(inventory);

    return {
      success: false,
      message: "No internet. Inventory saved locally.",
      data: getLocal(),
    };
  }

  // then if  Online,synchronize queued inventory
  const queue = getLocal();

  const data = queue.length > 0 ? queue : inventory;

  const updated = updateStock(data);

  clearLocal();

  return {
    success: true,
    message: "Inventory synchronized successfully.",
    data: updated,
  };
}

export { syncInventory };