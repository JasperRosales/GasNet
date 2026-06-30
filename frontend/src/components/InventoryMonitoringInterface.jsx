import InventoryUpdateStatus from "./InventoryUpdateStatus";
import StockLevelChanges from "./StockLevelChanges";
import SynchronizationIndicators from "./SynchronizationIndicators";

export default function InventoryMonitoringInterface() {
  const products = [
    { product: "LPG 11kg", status: "Updated" },
    { product: "LPG 22kg", status: "Pending" },
    { product: "Regulator", status: "Failed" },
  ];

  const stockItems = [
    {
      product: "LPG 11kg",
      previousStock: 50,
      currentStock: 45,
      stockChange: -5,
    },
    {
      product: "LPG 22kg",
      previousStock: 20,
      currentStock: 25,
      stockChange: 5,
    },
    {
      product: "Regulator",
      previousStock: 15,
      currentStock: 15,
      stockChange: 0,
    },
  ];

  const syncData = [
    { indicator: "Sync Status", status: "Synced" },
    { indicator: "Device Connection", status: "Online" },
    { indicator: "Last Synced", status: "June 23, 2026 11:30 AM" },
  ];

  return (
    <div>
      <h1>Inventory Synchronization Monitoring Interface</h1>

      <InventoryUpdateStatus products={products} />
      <StockLevelChanges stockItems={stockItems} />
      <SynchronizationIndicators syncData={syncData} />
    </div>
  );
}