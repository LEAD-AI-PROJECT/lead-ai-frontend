import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
     // alias @public -> /public
     webpack(config) {
          if (!config.resolve) {
               config.resolve = { alias: {} } as any;
          }

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

     // 🔥 Tambah header cache untuk asset static Next.js
     async headers() {
          return [
               {
                    // semua JS/CSS/chunk di .next/static
                    source: "/_next/static/:path*",
                    headers: [
                         {
                              key: "Cache-Control",
                              value: "public, max-age=31536000, immutable",
                         },
                    ],
               },
               // OPTIONAL: kalau kamu punya asset hashed di /public (misal /assets/xxxxx.hash.png)
               // tinggal buka komen block berikut dan sesuaikan path-nya:
               /*
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      */
          ];
     },
};

export default nextConfig;
