/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sports",
        destination: "/sports.html",
      },
    ]
  },
}

export default nextConfig
