import app from "./app.js";
import process from "node:process";

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Maintenance scheduler API listening on http://localhost:${port}`);
});