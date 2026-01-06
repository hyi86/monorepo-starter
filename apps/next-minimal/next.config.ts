import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: process.env.STANDALONE === '1' ? 'standalone' : undefined,
  transpilePackages: ['@monorepo-starter/ui', '@monorepo-starter/utils'],
};

export default nextConfig;
