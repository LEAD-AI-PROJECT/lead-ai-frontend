import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
     webpack: config => {
          if (!config.resolve) config.resolve = { alias: {} } as any;
          config.resolve.alias = {
               ...(config.resolve.alias || {}),
               "@public": path.resolve(__dirname, "public"),
          };
          return config;
     },
     eslint: {
          ignoreDuringBuilds: true,
     },
     images: {
          remotePatterns: [
               {
                    protocol: "https",
                    hostname: "ik.imagekit.io",
                    pathname: "/**",
               },
          ],
     },
};

export default nextConfig;
