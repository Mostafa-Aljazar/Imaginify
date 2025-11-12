import type { NextConfig } from "next";

const ContentSecurityPolicy = [
  "default-src 'self'",
  // allow Clerk (accounts.dev) for scripts/connect; keep inline styles temporarily to avoid breaking 3rd-party widgets
  "script-src 'self' https://*.clerk.accounts.dev https://accounts.dev 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://*.clerk.accounts.dev https://accounts.dev",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  // Add any existing config options above
  images: {
    // Allow common external hosts used by Cloudinary and Vercel-hosted assets
    domains: ["res.cloudinary.com", "imaginify-1pla.vercel.app", "images.unsplash.com"],
  },
  async headers() {
    return [
      {
        // Apply these security headers to all routes in the app
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy,
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            // allow popups (auth flows) while providing reasonable isolation
            value: 'same-origin-allow-popups',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
