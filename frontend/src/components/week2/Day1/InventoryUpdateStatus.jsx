export default function InventoryUpdateStatus({ products }) {
  return (
    <>
      <h2>Inventory Update Status</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Update Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.product}>
              <td>{item.product}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}