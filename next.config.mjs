/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export', // Exportação estática para FTP
    images: {
        unoptimized: true, // Necessário para exportação estática
        domains: [],
    },
    // Ignorar diretórios legados
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    // Configuração para hospedagem em subdiretório (se necessário)
    // basePath: '/seu-subdiretorio',
    // assetPrefix: '/seu-subdiretorio',
};

export default nextConfig;
