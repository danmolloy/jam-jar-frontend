import type { NextConfig } from 'next';
import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
      mdxRs: true,
    },

};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig);

