import { NodeEnvEnum } from "@/enums/env.enum";

const env = {
  nodeEnvironment: process.env.NEXT_PUBLIC_NODE_ENVIRONMENT,
};

export const isProd = env.nodeEnvironment === NodeEnvEnum.PROD;
export const isStaging = env.nodeEnvironment === NodeEnvEnum.STAGING;
export const isDev = env.nodeEnvironment === NodeEnvEnum.DEV;

export default env;
