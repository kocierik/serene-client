/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ['i.ytimg.com'],
  },
};

module.exports = nextConfig;
