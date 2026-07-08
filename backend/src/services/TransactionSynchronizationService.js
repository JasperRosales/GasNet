import sendTransactionData from "./TransactionDataSender.js";
import receiveSynchronizedRecords from "./SynchronizedRecordsReceiver.js";
import validateSynchronizedRecords from "./TransactionSynchronizationValidator.js";

function synchronizeTransaction(transaction) {
  const sent = sendTransactionData(transaction);

  const records = receiveSynchronizedRecords();

  const validated = validateSynchronizedRecords(records);

  return {
    sent,
    records,
    validated,
  };
}

export default synchronizeTransaction;