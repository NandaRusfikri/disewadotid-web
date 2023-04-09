/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tailwindui.com','splidejs.com',"lh3.googleusercontent.com","localhost","disewa.id","api.disewa.id"]
  },
  env: {
    pathimage: "https://api.disewa.id/",
    apidomain: "https://api.disewa.id/",
  },
  // env: {
  //   pathimage: "http://localhost:2226/",
  //   apidomain: "http://localhost:2226",
  // },
}

module.exports = nextConfig
