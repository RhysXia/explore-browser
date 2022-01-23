const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
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
};
