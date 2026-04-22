import fs from "fs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  rewrites: async () => [
    {
      source: "/sign-in",
      destination: "/sign-in/[[...index]]",
    },
    {
      source: "/sign-up",
      destination: "/sign-up/[[...index]]",
    },
  ],

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

// ✅ OPTIONAL user config merge (SAFE, sync)
if (fs.existsSync("./v0-user-next.config.mjs")) {
  const userConfig = (await import("./v0-user-next.config.mjs")).default;
  Object.assign(nextConfig, userConfig);
}

export default nextConfig;
