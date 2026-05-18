/** @type {import('next').NextConfig} */
const nextConfig = {

  // ── Headers de sécurité HTTP ──────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [

          // Empêche le clickjacking (intégration dans une iframe)
          {
            key: "X-Frame-Options",
            value: "DENY",
          },

          // Empêche le MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // Force HTTPS pour 1 an
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },

          // Contrôle les infos envoyées dans le Referer
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // Désactive les fonctionnalités navigateur non utilisées
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },

          // Content Security Policy — bloque les injections XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts : soi-même + Next.js inline (nonce géré par Next)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Styles : soi-même + inline (Tailwind)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Polices
              "font-src 'self' https://fonts.gstatic.com",
              // Images : soi-même + Unsplash (articles) + ibb.co (logo newsletter)
              "img-src 'self' data: blob: https: http:",
              // Connexions API autorisées
              "connect-src 'self' https://api.brevo.com https://newsapi.org https://gnews.io",
              // Frames interdites
              "frame-src 'none'",
              // Objets interdits
              "object-src 'none'",
              // Base URI restreinte
              "base-uri 'self'",
              // Formulaires uniquement vers soi-même
              "form-action 'self'",
            ].join("; "),
          },

        ],
      },
    ];
  },

  // ── Image Optimizer — sources autorisées uniquement ───────
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },

};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "algfayed",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
