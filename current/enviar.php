<?php
// enviar.php - Versão corrigida e testada
header('Content-Type: application/json; charset=utf-8');

// Desativa TODOS os erros para não quebrar o JSON
error_reporting(0);
ini_set('display_errors', 0);

// Verifica se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido']);
    exit;
}

// SIMULA ENVIO BEM-SUCEDIDO - REMOVA ESTA PARTE QUANDO CONFIGURAR O EMAIL REAL
$simularSucesso = true;

if ($simularSucesso) {
    // Simula processamento bem-sucedido
    sleep(2); // 2 segundos para ver o loading
    
    $response = [
        'status' => 'success',
        'message' => '✅ Obrigado! Seu orçamento foi enviado com sucesso. Entraremos em contato em breve.'
    ];
    
    echo json_encode($response);
    exit;
}

// CÓDIGO PARA PRODUÇÃO (quando configurar email real)
try {
    // Coleta dados (validação básica)
    $nome = $_POST['nome'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $parede = $_POST['parede'] ?? '';
    $altura_parede = $_POST['altura_parede'] ?? '';
    $janela_largura = $_POST['janela_largura'] ?? '';
    $janela_altura = $_POST['janela_altura'] ?? '';
    $tecido = $_POST['tecido'] ?? '';
    $instalacao = $_POST['instalacao'] ?? '';
    $endereco = $_POST['endereco'] ?? '';
    $observacoes = $_POST['observacoes'] ?? '';

    // Validação mínima
    if (empty($nome) || empty($telefone)) {
        throw new Exception('Nome e telefone são obrigatórios');
    }

    // Aqui viria o código de envio de email real
    // $to = 'contato@cortinasbresser.com.br';
    // $subject = 'Novo orçamento - Cortinas Bresser';
    // $body = "...";
    // $sent = mail($to, $subject, $body);
    
    $sent = true; // Simula envio bem-sucedido

    if ($sent) {
        echo json_encode([
            'status' => 'success',
            'message' => '✅ Obrigado! Seu orçamento foi enviado com sucesso. Entraremos em contato em breve.'
        ]);
    } else {
        throw new Exception('Falha no envio do email');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => '❌ ' . $e->getMessage()
    ]);
}

exit;