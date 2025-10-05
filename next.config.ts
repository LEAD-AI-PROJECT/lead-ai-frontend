import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
     webpack: config => {
          if (!config.resolve) config.resolve = { alias: {} } as any;
          config.resolve.alias = {
               ...(config.resolve.alias || {}),
               "@public": path.resolve(__dirname, "public"),
               "@types": path.resolve(__dirname, "src/types"),
          };
          return config;
     },
     eslint: {
          ignoreDuringBuilds: true,
     },
};

export default nextConfig;
