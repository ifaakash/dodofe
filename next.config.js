/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['picsum.photos', 'placehold.co', 'dodo-profile-audio.s3.ap-south-1.amazonaws.com']
    },
    reactStrictMode: true,
    output: "standalone", // Supports dynamic pages
    trailingSlash: false, // ⬅ Avoids static export behavior
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
            {
                source: '/robots.txt',
                destination: '/api/robots',
            },
        ];
    },
};

module.exports = nextConfig;
