import path from 'node:path';
import { fileURLToPath } from 'node:url';

const isProduction = process.env.NODE_ENV === 'production';
const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true
  },
  basePath: isProduction ? '/java-missing-tutorial' : '',
  assetPrefix: isProduction ? '/java-missing-tutorial/' : '',
  turbopack: {
    root: rootDir
  }
};

export default nextConfig;
