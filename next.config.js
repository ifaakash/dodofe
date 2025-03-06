/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['picsum.photos', 'placehold.co', 'dodo-profile-audio.s3.ap-south-1.amazonaws.com']
    },
    reactStrictMode: true,
    output: "standalone", // Supports dynamic pages
    experimental: { appDir: true },
};

module.exports = nextConfig;
