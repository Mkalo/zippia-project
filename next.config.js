/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // run eslint in all files
    dirs: ['pages', 'components', 'utils', 'types', 'lib'],
  }
};

module.exports = nextConfig;
