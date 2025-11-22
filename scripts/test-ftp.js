#!/usr/bin/env node

/**
 * Script de Teste de Conexão FTP
 * 
 * Use este script para verificar se suas credenciais FTP estão corretas
 * antes de fazer o deploy.
 */

const ftp = require('basic-ftp');
require('dotenv').config();

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

async function testConnection() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    const config = {
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        port: parseInt(process.env.FTP_PORT || '21'),
        secure: process.env.FTP_SECURE === 'true',
    };

    log('\n🔍 Teste de Conexão FTP - Locaweb', colors.cyan);
    log('━'.repeat(50), colors.cyan);

    // Validar configuração
    if (!config.host || !config.user || !config.password) {
        log('\n❌ Erro: Credenciais FTP não configuradas!', colors.red);
        log('\nCrie um arquivo .env com as seguintes variáveis:', colors.yellow);
        log('  FTP_HOST=ftp.seudominio.com.br', colors.blue);
        log('  FTP_USER=seu_usuario', colors.blue);
        log('  FTP_PASSWORD=sua_senha', colors.blue);
        log('  FTP_PORT=21', colors.blue);
        log('  FTP_REMOTE_PATH=/public_html\n', colors.blue);
        process.exit(1);
    }

    log('\n📋 Configuração:', colors.yellow);
    log(`  Host: ${config.host}`, colors.blue);
    log(`  Usuário: ${config.user}`, colors.blue);
    log(`  Senha: ${'*'.repeat(config.password.length)}`, colors.blue);
    log(`  Porta: ${config.port}`, colors.blue);
    log(`  Seguro: ${config.secure ? 'Sim' : 'Não'}`, colors.blue);
    log(`  Diretório remoto: ${process.env.FTP_REMOTE_PATH || '/public_html'}`, colors.blue);

    try {
        log('\n🔌 Tentando conectar...', colors.yellow);
        await client.access(config);
        log('✅ Conexão estabelecida com sucesso!', colors.green);

        log('\n📂 Listando diretório remoto...', colors.yellow);
        const remotePath = process.env.FTP_REMOTE_PATH || '/public_html';

        try {
            await client.cd(remotePath);
            log(`✅ Diretório ${remotePath} acessado com sucesso!`, colors.green);

            const list = await client.list();

            if (list.length === 0) {
                log('\n📁 Diretório está vazio', colors.yellow);
            } else {
                log(`\n📁 Conteúdo do diretório (${list.length} item(ns)):`, colors.yellow);
                list.slice(0, 10).forEach(item => {
                    const icon = item.isDirectory ? '📂' : '📄';
                    const size = item.isDirectory ? '' : ` (${formatBytes(item.size)})`;
                    log(`  ${icon} ${item.name}${size}`, colors.blue);
                });

                if (list.length > 10) {
                    log(`  ... e mais ${list.length - 10} item(ns)`, colors.blue);
                }
            }
        } catch (error) {
            log(`⚠️  Aviso: Não foi possível acessar ${remotePath}`, colors.yellow);
            log(`   Erro: ${error.message}`, colors.red);
        }

        log('\n━'.repeat(50), colors.cyan);
        log('✅ Teste concluído com sucesso! 🎉', colors.green);
        log('\nVocê pode fazer deploy usando:', colors.cyan);
        log('  npm run deploy:sync', colors.blue);

    } catch (error) {
        log('\n━'.repeat(50), colors.cyan);
        log('❌ Erro ao conectar ao servidor FTP', colors.red);
        log(`\nDetalhes: ${error.message}`, colors.yellow);

        log('\n💡 Possíveis soluções:', colors.cyan);
        log('  1. Verifique se as credenciais estão corretas', colors.blue);
        log('  2. Confirme o endereço do servidor FTP', colors.blue);
        log('  3. Verifique se a porta está correta (geralmente 21)', colors.blue);
        log('  4. Certifique-se de que seu IP não está bloqueado', colors.blue);
        log('  5. Acesse o painel da Locaweb para verificar o FTP\n', colors.blue);

        process.exit(1);
    } finally {
        client.close();
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

testConnection();
