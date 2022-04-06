const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    async rewrites() {
      return [
        isDev && {
          source: '/graphql',
          destination: 'http://localhost:8080/graphql',
        },
      ].filter(Boolean);
    },
  };

  return withBundleAnalyzer(nextConfig);
};
