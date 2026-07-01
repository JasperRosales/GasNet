export default function AlertNotifications({
  alertNotifications,
}) {
  return (
    <>
      <h2>Alert Notifications</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Alert Message</th>
            <th>Alert Level</th>
          </tr>
        </thead>

        <tbody>
          {alertNotifications.map((alert) => (
            <tr key={alert.message}>
              <td>{alert.message}</td>
              <td>{alert.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}