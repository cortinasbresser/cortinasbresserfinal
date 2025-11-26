/** @type {import('next').NextConfig} */
const nextConfig = {
    // Modo dinâmico: detecta ambiente
    // Docker/VPS = standalone | Hospedagem estática = export | Dev = undefined (default)
    output: process.env.DOCKER_BUILD === '1' ? 'standalone' : (process.env.NODE_ENV === 'development' ? undefined : 'export'),
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: [],
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    // Configurações para exportação estática (quando não for Docker e não for Dev)
    ...(process.env.DOCKER_BUILD !== '1' && process.env.NODE_ENV !== 'development' && {
        trailingSlash: true,
        distDir: 'out',
    }),
    experimental: {
        serverComponentsExternalPackages: ['pdfkit'],
    },
};

export default nextConfig;
