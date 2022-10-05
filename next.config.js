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

module.exports = nextConfig;
