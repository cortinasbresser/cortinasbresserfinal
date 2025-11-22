<?php
// config.php - Configurações do Dashboard Admin
session_start();

// Credenciais de acesso (alterar para produção)
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', password_hash('bresser2025@admin', PASSWORD_DEFAULT));

// Diretório de logs
define('LOGS_DIR', __DIR__ . '/../logs');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Função para verificar autenticação
function verificarAuth() {
    if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
        header('Location: login.php');
        exit;
    }
}

// Função para fazer logout
function logout() {
    session_destroy();
    header('Location: login.php');
    exit;
}
