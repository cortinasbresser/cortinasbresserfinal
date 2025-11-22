#!/usr/bin/env node

/**
 * Script de Deploy FTP para Locaweb
 * 
 * Este script faz upload automático dos arquivos buildados para o servidor FTP da Locaweb.
 * Usa as credenciais definidas no arquivo .env
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configurações do FTP
const FTP_CONFIG = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: parseInt(process.env.FTP_PORT || '21'),
    secure: process.env.FTP_SECURE === 'true',
};

// Diretório local de build e remoto
const LOCAL_BUILD_DIR = path.join(__dirname, '..', process.env.NEXT_PUBLIC_BUILD_OUTPUT || 'out');
const REMOTE_PATH = process.env.FTP_REMOTE_PATH || '/public_html';

// Cores para console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function validateConfig() {
    const required = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        log(`❌ Erro: Variáveis de ambiente faltando: ${missing.join(', ')}`, colors.red);
        log(`\nCrie um arquivo .env baseado no .env.example e preencha as credenciais.`, colors.yellow);
        process.exit(1);
    }

    if (!fs.existsSync(LOCAL_BUILD_DIR)) {
        log(`❌ Erro: Diretório de build não encontrado: ${LOCAL_BUILD_DIR}`, colors.red);
        log(`\nExecute 'npm run build' antes de fazer o deploy.`, colors.yellow);
        process.exit(1);
    }
}

async function deployToFTP() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        log('\n🚀 Iniciando deploy para Locaweb FTP...', colors.cyan);
        log(`📁 Diretório local: ${LOCAL_BUILD_DIR}`, colors.blue);
        log(`🌐 Servidor: ${FTP_CONFIG.host}`, colors.blue);
        log(`📂 Diretório remoto: ${REMOTE_PATH}\n`, colors.blue);

        // Conectar ao servidor FTP
        log('🔌 Conectando ao servidor FTP...', colors.yellow);
        await client.access(FTP_CONFIG);
        log('✅ Conectado com sucesso!', colors.green);

        // Criar/navegar para o diretório remoto
        log(`📂 Navegando para ${REMOTE_PATH}...`, colors.yellow);
        try {
            await client.ensureDir(REMOTE_PATH);
        } catch (error) {
            log(`⚠️  Aviso: Não foi possível criar/acessar ${REMOTE_PATH}`, colors.yellow);
        }

        // Upload dos arquivos
        log('📤 Fazendo upload dos arquivos...', colors.yellow);
        await client.uploadFromDir(LOCAL_BUILD_DIR, REMOTE_PATH);

        log('\n✅ Deploy concluído com sucesso! 🎉', colors.green);
        log(`\n🌐 Seu site deve estar disponível em breve.`, colors.cyan);

    } catch (error) {
        log(`\n❌ Erro durante o deploy: ${error.message}`, colors.red);
        console.error(error);
        process.exit(1);
    } finally {
        client.close();
    }
}

// Validar configuração e executar deploy
validateConfig();
deployToFTP();
