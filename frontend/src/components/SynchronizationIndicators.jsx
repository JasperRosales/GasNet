export default function SynchronizationIndicators({ syncData }) {
  return (
    <>
      <h2>Synchronization Indicators</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Sync Status</td>
            <td>{syncData.syncStatus}</td>
          </tr>
          <tr>
            <td>Device Connection</td>
            <td>{syncData.deviceConnection}</td>
          </tr>
          <tr>
            <td>Last Synced</td>
            <td>{syncData.lastSynced}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}