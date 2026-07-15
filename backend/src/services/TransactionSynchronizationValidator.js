//week3-day1
function validateSynchronizedRecords(records) {
  return records.every(
    (record) =>
      record.transactionId &&
      record.product &&
      record.quantity > 0 &&
      record.status === "Synchronized"
  );
}

export default validateSynchronizedRecords;
