import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seedDatabase } from "./seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "../data");
const dbFilePath = path.join(dataDir, "db.json");

async function ensureDatabaseFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dbFilePath, "utf8");
  } catch {
    await writeFile(dbFilePath, JSON.stringify(seedDatabase, null, 2));
  }
}

export async function readDatabase() {
  await ensureDatabaseFile();
  const raw = await readFile(dbFilePath, "utf8");
  return JSON.parse(raw);
}

export async function writeDatabase(database) {
  const nextDatabase = {
    ...database,
    updatedAt: new Date().toISOString(),
  };

  await mkdir(dataDir, { recursive: true });
  await writeFile(dbFilePath, JSON.stringify(nextDatabase, null, 2));

  return nextDatabase;
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