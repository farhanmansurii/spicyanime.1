/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.fanart.tv"],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    nodeEnv: "development",
  },
};
const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV === 'development',
    skipWaiting: true,
  },
});
module.exports = nextConfig;
