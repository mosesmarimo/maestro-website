import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The interface previews are hand-authored SVGs served from /public —
  // no raster optimization applies, so plain <img> is used deliberately.
  reactStrictMode: true,
};

export default nextConfig;
