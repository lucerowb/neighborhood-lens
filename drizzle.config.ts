import { type Config } from "drizzle-kit";

import env from "@/config/env.config";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.db.url as string,
  },
  tablesFilter: ["neighborhood_lens_*"],
} satisfies Config;
