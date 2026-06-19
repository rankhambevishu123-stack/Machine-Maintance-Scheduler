import { initDatabase, query } from "./postgres.js";

const collectionNames = [
  "users",
  "machines",
  "technicians",
  "schedules",
  "breakdowns",
  "history",
];

async function ensureDatabaseReady() {
  await initDatabase();
}

async function loadCollection(collection) {
  const result = await query(`SELECT * FROM ${collection} ORDER BY id ASC`);
  return result.rows;
}

export async function readDatabase() {
  await ensureDatabaseReady();

  const database = {};
  for (const collection of collectionNames) {
    database[collection] = await loadCollection(collection);
  }

  database.updatedAt = new Date().toISOString();
  return database;
}

export async function writeDatabase(database) {
  await ensureDatabaseReady();

  for (const collection of collectionNames) {
    const rows = Array.isArray(database[collection]) ? database[collection] : [];
    await query(`DELETE FROM ${collection}`);

    if (rows.length === 0) {
      continue;
    }

    const columns = Object.keys(rows[0]);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
    const insertSql = `INSERT INTO ${collection} (${columns.join(", ")}) VALUES (${placeholders})`;

    for (const row of rows) {
      const values = columns.map((column) => row[column]);
      await query(insertSql, values);
    }
  }

  return {
    ...database,
    updatedAt: new Date().toISOString(),
  };
}

export function createId(collection) {
  return collection.reduce((highest, item) => {
    const value = Number(item.id) || 0;
    return Math.max(highest, value);
  }, 0) + 1;
}

export function normalizeText(value) {
  return String(value || "").trim();
}