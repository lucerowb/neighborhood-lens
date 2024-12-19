import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import env from "@/config/env.config";

import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.db.url as string);
if (env.nodeEnvironment !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
