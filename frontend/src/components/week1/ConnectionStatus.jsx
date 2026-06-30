export default function ConnectionStatus({ connectionStatus }) {
  return (
    <>
      <h2>Connection Status</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{connectionStatus}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}