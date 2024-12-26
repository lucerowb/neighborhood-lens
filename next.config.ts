import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
      {
        protocol: "https",
        hostname: "fastly.4sqi.net",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
