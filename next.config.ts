import type { NextConfig } from "next";

// Produces fully static HTML in /out. Ideal for a content-first blog on static hosting.
// This app has no server-side forms, databases, or request-time API requirements.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
