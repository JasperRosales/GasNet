//3-2
function updateStock(inventory) {
  return inventory.map((item) => ({
    ...item,
    lastUpdated: new Date().toISOString(),
    status: "Updated",
  }));
}

export default updateStock;