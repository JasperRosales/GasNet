import express from "express";
import transactionSynchronizationRoutes from "./transactionSynchronizationRoutes.js";
import supabaseTablesRouter from "./supabaseTables.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GasNet Backend API is running.",
  });
});

app.use("/api", transactionSynchronizationRoutes);
app.use("/api", supabaseTablesRouter);

export default app;