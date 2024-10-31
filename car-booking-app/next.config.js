/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vehicle-registration-s3-bucket.s3.eu-north-1.amazonaws.com', 'vehicle-registration-s3-bucket.s3.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
