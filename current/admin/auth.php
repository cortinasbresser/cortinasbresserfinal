<?php
// auth.php - Processar autenticação
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Verificar credenciais
    if ($username === ADMIN_USER && password_verify($password, ADMIN_PASS)) {
        $_SESSION['admin_logged'] = true;
        $_SESSION['admin_user'] = $username;
        $_SESSION['login_time'] = time();
        header('Location: dashboard.php');
        exit;
    } else {
        header('Location: login.php?erro=credenciais');
        exit;
    }
} else {
    header('Location: login.php');
    exit;
}
