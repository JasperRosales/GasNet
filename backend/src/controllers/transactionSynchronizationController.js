//week3-day1
import synchronizeTransaction from "../services/TransactionSynchronizationService.js";

function synchronizeTransactionController(req, res) {
  try {
    const transaction = req.body;

    const result = synchronizeTransaction(transaction);

    return res.status(200).json({
      success: true,
      message: "Transaction synchronized successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Transaction synchronization failed.",
      error: error.message,
    });
  }
}

export default synchronizeTransactionController;