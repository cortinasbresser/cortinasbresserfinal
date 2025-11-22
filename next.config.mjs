/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: [],
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
