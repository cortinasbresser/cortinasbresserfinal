/** @type {import('next').NextConfig} */
const nextConfig = {
    // Para Docker/VPS: usar modo standalone (servidor Node.js)
    output: 'standalone',
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: [],
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
