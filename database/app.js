import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

export default app;