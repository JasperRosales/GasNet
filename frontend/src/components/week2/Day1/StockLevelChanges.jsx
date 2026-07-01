export default function StockLevelChanges({ stockItems }) {
  return (
    <>
      <h2>Stock Level Changes</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Previous Stock</th>
            <th>Current Stock</th>
            <th>Stock Change</th>
          </tr>
        </thead>

        <tbody>
          {stockItems.map((item) => (
            <tr key={item.product}>
              <td>{item.product}</td>
              <td>{item.previousStock}</td>
              <td>{item.currentStock}</td>
              <td>{item.stockChange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}