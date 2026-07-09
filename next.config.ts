import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const rootDir = dirname(fileURLToPath(new URL(".", import.meta.url)));

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Tutor-Portfolio",
  assetPrefix: "/Tutor-Portfolio/",
  images: {
    unoptimized: true,
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;
