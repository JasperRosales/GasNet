//week3-day1
function sendTransactionData(transaction) {
  return {
    success: true,
    message: "Transaction data sent successfully.",
    transaction,
  };
}

export default sendTransactionData;