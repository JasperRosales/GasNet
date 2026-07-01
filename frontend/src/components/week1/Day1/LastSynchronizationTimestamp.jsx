export default function LastSynchronizationTimestamp({ lastSynced }) {
  return (
    <>
      <h2>Last Synchronization Timestamp</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Last Synced</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{lastSynced}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}