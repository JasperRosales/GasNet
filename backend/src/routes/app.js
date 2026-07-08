import express from "express";
import transactionSynchronizationRoutes from "./transactionSynchronizationRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GasNet Backend API is running.",
  });
});

app.use("/api", transactionSynchronizationRoutes);

export default app;