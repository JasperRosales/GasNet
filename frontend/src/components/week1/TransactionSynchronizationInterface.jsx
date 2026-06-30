import SynchronizationStatusIndicator from "./SynchronizationStatusIndicator";
import LastSynchronizationTimestamp from "./LastSynchronizationTimestamp";
import ConnectionStatus from "./ConnectionStatus";

export default function TransactionSynchronizationInterface() {
  const syncStatus = "Synchronized";

  const lastSynced = "June 23, 2026 11:30 AM";

  const connectionStatus = "Connected";

  return (
    <>
      <h1>Transaction Synchronization Status Interface</h1>

      <SynchronizationStatusIndicator
        syncStatus={syncStatus}
      />

      <LastSynchronizationTimestamp
        lastSynced={lastSynced}
      />

      <ConnectionStatus
        connectionStatus={connectionStatus}
      />
    </>
  );
}