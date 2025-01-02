import { Redis } from "@upstash/redis";

import env from "@/config/env.config";

export const redis = new Redis({
  url: env.upstash.url,
  token: env.upstash.token,
});
