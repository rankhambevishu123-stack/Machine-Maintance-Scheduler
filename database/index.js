import app from "./app.js";
import process from "node:process";
import { initDatabase } from "./database/postgres.js";

const port = process.env.PORT || 3001;

async function startServer() {
  await initDatabase();
  app.listen(port, () => {
    console.log(`Maintenance scheduler API listening on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});