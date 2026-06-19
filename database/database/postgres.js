import process from "node:process";
import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

const databaseUrl = process.env.DATABASE_URL;
let parsedUrl = null;

if (databaseUrl) {
  try {
    parsedUrl = new URL(databaseUrl);
  } catch {
    parsedUrl = null;
  }
}

const poolConfig = {
  connectionString: databaseUrl || undefined,
  host: process.env.DB_HOST || parsedUrl?.hostname || undefined,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : parsedUrl?.port ? Number(parsedUrl.port) : undefined,
  database: process.env.DB_NAME || parsedUrl?.pathname.replace(/^\//, "") || undefined,
  user: process.env.DB_USER || parsedUrl?.username || undefined,
  password: process.env.DB_PASSWORD || parsedUrl?.password || undefined,
};

const pool = new Pool(poolConfig);

export async function query(text, params = []) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export function getConnectionInfo() {
  return {
    serverName: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5432",
    database: process.env.DB_NAME || "maintenance_scheduler",
    user: process.env.DB_USER || "postgres",
  };
}

export async function initDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      department VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS machines (
      id SERIAL PRIMARY KEY,
      department VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS technicians (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      contact VARCHAR(50) NOT NULL,
      skill VARCHAR(255) NOT NULL,
      assignedMachines TEXT NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS schedules (
      id SERIAL PRIMARY KEY,
      machine VARCHAR(255) NOT NULL,
      technician VARCHAR(255) NOT NULL,
      date VARCHAR(50) NOT NULL,
      priority VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS breakdowns (
      id SERIAL PRIMARY KEY,
      machine VARCHAR(255) NOT NULL,
      issue TEXT NOT NULL,
      priority VARCHAR(50) NOT NULL,
      date VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS history (
      id SERIAL PRIMARY KEY,
      machine VARCHAR(255) NOT NULL,
      technician VARCHAR(255) NOT NULL,
      date VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL,
      type VARCHAR(100) NOT NULL
    );
  `);
}
