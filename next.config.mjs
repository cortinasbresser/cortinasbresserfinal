/** @type {import('next').NextConfig} */
const nextConfig = {
    // Modo dinâmico: detecta ambiente
    // Docker/VPS = standalone | Hospedagem estática = export
    output: process.env.DOCKER_BUILD === '1' ? 'standalone' : 'export',
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: [],
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    // Configurações para exportação estática (quando não for Docker)
    ...(process.env.DOCKER_BUILD !== '1' && {
        trailingSlash: true,
        distDir: 'out',
    }),
};

export default nextConfig;
