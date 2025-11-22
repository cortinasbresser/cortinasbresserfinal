#!/usr/bin/env node

/**
 * Script de Deploy FTP Incremental para Locaweb
 * 
 * Este script faz upload apenas dos arquivos modificados,
 * tornando o deploy mais rápido e eficiente.
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

// Configurações
const FTP_CONFIG = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: parseInt(process.env.FTP_PORT || '21'),
    secure: process.env.FTP_SECURE === 'true',
};

const LOCAL_BUILD_DIR = path.join(__dirname, '..', process.env.NEXT_PUBLIC_BUILD_OUTPUT || 'out');
const REMOTE_PATH = process.env.FTP_REMOTE_PATH || '/public_html';
const HASH_FILE = path.join(__dirname, '.deploy-cache.json');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function getFileHash(filePath) {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(content).digest('hex');
}

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
}

function loadCache() {
    if (fs.existsSync(HASH_FILE)) {
        return JSON.parse(fs.readFileSync(HASH_FILE, 'utf8'));
    }
    return {};
}

function saveCache(cache) {
    fs.writeFileSync(HASH_FILE, JSON.stringify(cache, null, 2));
}

function getChangedFiles() {
    const cache = loadCache();
    const allFiles = getAllFiles(LOCAL_BUILD_DIR);
    const changed = [];
    const newCache = {};

    allFiles.forEach(filePath => {
        const relativePath = path.relative(LOCAL_BUILD_DIR, filePath);
        const hash = getFileHash(filePath);
        newCache[relativePath] = hash;

        if (cache[relativePath] !== hash) {
            changed.push({ local: filePath, relative: relativePath });
        }
    });

    return { changed, newCache };
}

async function uploadFile(client, localPath, remotePath) {
    const remoteDir = path.dirname(remotePath).replace(/\\/g, '/');

    try {
        await client.ensureDir(remoteDir);
        await client.uploadFrom(localPath, remotePath.replace(/\\/g, '/'));
        return true;
    } catch (error) {
        log(`  ❌ Erro ao enviar ${remotePath}: ${error.message}`, colors.red);
        return false;
    }
}

async function deployIncremental() {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
        log('\n🚀 Deploy Incremental para Locaweb FTP', colors.cyan);
        log('━'.repeat(50), colors.cyan);

        // Verificar arquivos alterados
        log('\n📊 Analisando arquivos...', colors.yellow);
        const { changed, newCache } = getChangedFiles();

        if (changed.length === 0) {
            log('✅ Nenhum arquivo foi modificado. Deploy não necessário!', colors.green);
            return;
        }

        log(`📦 ${changed.length} arquivo(s) modificado(s) encontrado(s)`, colors.blue);

        // Conectar
        log('\n🔌 Conectando ao servidor FTP...', colors.yellow);
        await client.access(FTP_CONFIG);
        log('✅ Conectado!', colors.green);

        // Upload dos arquivos modificados
        log('\n📤 Enviando arquivos modificados:', colors.yellow);
        let uploaded = 0;

        for (const file of changed) {
            const remotePath = path.join(REMOTE_PATH, file.relative);
            process.stdout.write(`  ⏳ ${file.relative}...`);

            if (await uploadFile(client, file.local, remotePath)) {
                process.stdout.write(`\r  ✅ ${file.relative}\n`);
                uploaded++;
            } else {
                process.stdout.write(`\r  ❌ ${file.relative}\n`);
            }
        }

        // Salvar cache
        saveCache(newCache);

        log('\n━'.repeat(50), colors.cyan);
        log(`✅ Deploy concluído! ${uploaded}/${changed.length} arquivos enviados 🎉`, colors.green);

    } catch (error) {
        log(`\n❌ Erro: ${error.message}`, colors.red);
        console.error(error);
        process.exit(1);
    } finally {
        client.close();
    }
}

// Validar e executar
if (!process.env.FTP_HOST || !process.env.FTP_USER || !process.env.FTP_PASSWORD) {
    log('❌ Erro: Configure as variáveis de ambiente no arquivo .env', colors.red);
    process.exit(1);
}

if (!fs.existsSync(LOCAL_BUILD_DIR)) {
    log(`❌ Erro: Execute 'npm run build' antes do deploy`, colors.red);
    process.exit(1);
}

deployIncremental();
