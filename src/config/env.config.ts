import { NodeEnvEnum } from "@/enums/env.enum";

const mapbox = {
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
};

const env = {
  nodeEnvironment: process.env.NEXT_PUBLIC_NODE_ENVIRONMENT,
  mapbox,
};

export const isProd = env.nodeEnvironment === NodeEnvEnum.PROD;
export const isStaging = env.nodeEnvironment === NodeEnvEnum.STAGING;
export const isDev = env.nodeEnvironment === NodeEnvEnum.DEV;

export default env;
