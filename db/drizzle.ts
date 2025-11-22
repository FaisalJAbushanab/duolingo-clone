import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from 'pg';

import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL);
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {rejectUnauthorized: false},
// });
const db = drizzle(sql, { schema });
// const db = drizzle(pool, { schema });

export default db;
