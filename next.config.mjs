/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Gera exportação estática para host compartilhado
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: [],
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    // Configurações para exportação estática
    trailingSlash: true, // Adiciona / no final das URLs
    distDir: 'out', // Diretório de saída (padrão do Next.js export)
};

export default nextConfig;
