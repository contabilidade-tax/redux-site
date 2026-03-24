import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (db) return db;

  const connectionString = process.env.PGVERCEL_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL or PGVERCEL_URL environment variable is not set');
  }

  const pool = new Pool({
    connectionString,
  });

  db = drizzle(pool, { schema });
  return db;
}

export const database = getDb();
export { schema };
