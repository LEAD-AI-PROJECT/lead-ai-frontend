import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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

     // 🔥 Tambahkan cache header untuk static files
     async headers() {
          return [
               {
                    // Semua file hashed Next.js: JS, CSS, chunks
                    source: "/_next/static/:path*",
                    headers: [
                         {
                              key: "Cache-Control",
                              value: "public, max-age=31536000, immutable",
                         },
                    ],
               },

               // OPTIONAL: kalau kamu punya folder asset di /public/images dengan HASHED filename
               // contoh: /images/logo.3876a9.png
               // tinggal enable ini:
               /*
      {
        source: "/images/:path*",
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
