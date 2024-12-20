import { NodeEnvEnum } from "@/enums/env.enum";

const mapbox = {
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
};

const supabase = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

const db = {
  url: process.env.DATABASE_URL,
};

const foursquare = {
  apiKey: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
};

const env = {
  nodeEnvironment: process.env.NEXT_PUBLIC_NODE_ENVIRONMENT,
  mapbox,
  supabase,
  db,
  foursquare,
  appUrl: process.env.NEXT_PUBLIC_BASE_URL,
};

export const isProd = env.nodeEnvironment === NodeEnvEnum.PROD;
export const isStaging = env.nodeEnvironment === NodeEnvEnum.STAGING;
export const isDev = env.nodeEnvironment === NodeEnvEnum.DEV;

export default env;
