/**
 * Script de Deploy FTP para Locaweb
 * 
 * Este script faz o upload automático da pasta 'out' para o servidor Locaweb via FTP.
 * 
 * Configuração:
 * Crie um arquivo .env com as seguintes variáveis:
 * 
 * FTP_HOST=ftp.seudominio.com.br
 * FTP_USER=seu_usuario_ftp
 * FTP_PASSWORD=sua_senha_ftp
 * FTP_REMOTE_PATH=/public_html
 * 
 * Uso:
 * npm run deploy:locaweb
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Cores para console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

async function deployToLocaweb() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        log('\n🚀 Iniciando deploy para Locaweb...', colors.bright);

        // Validar variáveis de ambiente
        const requiredEnvVars = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD', 'FTP_REMOTE_PATH'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

        if (missingVars.length > 0) {
            throw new Error(
                `Variáveis de ambiente faltando: ${missingVars.join(', ')}\n` +
                'Crie um arquivo .env com as credenciais FTP da Locaweb.'
            );
        }

        // Verificar se a pasta 'out' existe
        const outDir = path.join(process.cwd(), 'out');
        if (!fs.existsSync(outDir)) {
            throw new Error(
                'Pasta "out" não encontrada!\n' +
                'Execute primeiro: npm run build:static'
            );
        }

        log(`\n📡 Conectando ao servidor FTP: ${process.env.FTP_HOST}`, colors.cyan);

        // Conectar ao servidor FTP
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false, // Locaweb geralmente usa FTP normal
        });

        log('✅ Conectado com sucesso!', colors.green);

        // Navegar para o diretório remoto
        const remotePath = process.env.FTP_REMOTE_PATH || '/public_html';
        log(`\n📂 Navegando para: ${remotePath}`, colors.cyan);

        try {
            await client.ensureDir(remotePath);
        } catch (error) {
            log(`⚠️  Diretório ${remotePath} não existe, criando...`, colors.yellow);
            await client.ensureDir(remotePath);
        }

        // Fazer upload do arquivo .htaccess primeiro
        const htaccessLocal = path.join(process.cwd(), '.htaccess');
        if (fs.existsSync(htaccessLocal)) {
            log('\n📤 Enviando .htaccess...', colors.cyan);
            await client.uploadFrom(htaccessLocal, '.htaccess');
            log('✅ .htaccess enviado!', colors.green);
        }

        // Fazer upload de toda a pasta 'out'
        log('\n📤 Enviando arquivos do site...', colors.cyan);
        log('⏳ Isso pode levar alguns minutos dependendo do tamanho...', colors.yellow);

        await client.uploadFromDir(outDir);

        log('\n' + '='.repeat(60), colors.green);
        log('✅ DEPLOY CONCLUÍDO COM SUCESSO! 🎉', colors.green);
        log('='.repeat(60), colors.green);
        log('\n📱 Acesse seu site em:', colors.cyan);
        log('   https://seudominio.com.br\n', colors.bright);
        log('💡 Dica: Limpe o cache do navegador (Ctrl + F5) para ver as alterações', colors.yellow);
        log('');

    } catch (error) {
        log('\n' + '='.repeat(60), colors.red);
        log('❌ ERRO NO DEPLOY', colors.red);
        log('='.repeat(60), colors.red);
        log(`\n${error.message}\n`, colors.red);

        if (error.code === 530) {
            log('💡 Dica: Verifique suas credenciais FTP no arquivo .env', colors.yellow);
        } else if (error.code === 'ENOTFOUND') {
            log('💡 Dica: Verifique se o FTP_HOST está correto no .env', colors.yellow);
        }

        process.exit(1);
    } finally {
        client.close();
    }
}

// Executar deploy
deployToLocaweb();
