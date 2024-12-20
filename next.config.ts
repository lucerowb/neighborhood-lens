import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.rets.ly",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "claire-backend-artifact-bucket-staging.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "claire-backend-artifact-bucket-prod.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static-staging.realpha.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.realpha.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      { protocol: "https", hostname: "dvvjkgh94f2v6.cloudfront.net", pathname: "/**" },
      { protocol: "https", hostname: "api-trestle.corelogic.com", pathname: "/**" },
      { protocol: "https", hostname: "claire-images-staging.realpha.com", pathname: "/**" },
      { protocol: "https", hostname: "claire-images.realpha.com", pathname: "/**" },
      { protocol: "https", hostname: "static-staging.realpha.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
