import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter', ['remark-mdx-frontmatter', { name: 'frontmatter' }]],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
const mdxConfig = withMDX(nextConfig);

// Only apply Sentry configuration in production
const sentryConfig =
  process.env.NODE_ENV === 'production'
    ? {
        // For all available options, see:
        // https://www.npmjs.com/package/@sentry/webpack-plugin#options

        org: 'daniel-molloy',

        project: 'jamjar-frontend',

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
        tunnelRoute: '/monitoring',

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,
      }
    : {};

export default process.env.NODE_ENV === 'production'
  ? withSentryConfig(mdxConfig, sentryConfig)
  : mdxConfig;
