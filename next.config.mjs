/** @type {import('next').NextConfig} */
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be set in production")
}

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/blog/design-ideas-:n", destination: "/blog", permanent: true },
      { source: "/portfolio/urban-luxe-project-:n", destination: "/projects", permanent: true },
      { source: "/portfolio", destination: "/projects", permanent: true },
    ]
  },
}

export default nextConfig
