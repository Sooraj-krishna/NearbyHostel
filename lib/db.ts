import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema"; // adjust path

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL not set in .env.local");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Needed for Neon
});

export const db = drizzle(pool, { schema });
