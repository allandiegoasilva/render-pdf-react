/** @type {import('next').NextConfig} */

const cspHeader = `
`;

const nextConfig = {
  
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig
