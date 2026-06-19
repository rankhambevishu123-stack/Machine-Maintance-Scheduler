import "dotenv/config";
import { Client } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set in .env");
  process.exit(1);
}

async function main() {
  const client = new Client({ connectionString });

  try {
    await client.connect();
    const dbResult = await client.query("SELECT current_database() AS db");
    console.log(`Connected database: ${dbResult.rows[0].db}`);

    const tablesResult = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    );

    const tables = tablesResult.rows.map((row) => row.table_name);

    for (const table of tables) {
      const rowsResult = await client.query(`SELECT * FROM "${table}"`);
      console.log(`\n=== ${table} (${rowsResult.rows.length} rows) ===`);
      console.table(rowsResult.rows);
    }
  } catch (error) {
    console.error("Database inspection failed:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
