export default function SynchronizationStatusIndicator({ syncStatus }) {
  return (
    <>
      <h2>Synchronization Status</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{syncStatus}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}