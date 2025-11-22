<?php
// gerar-pdf-orcamento-action.php - Processar geração do PDF
session_start();

// Verificar se está logado
if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    die('Acesso negado');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['resultado'])) {
    $resultado = json_decode($_POST['resultado'], true);
    
    if ($resultado) {
        require_once('gerar-pdf-orcamento.php');
        
        $pdf_content = gerarPDFOrcamento($resultado);
        $pdf_nome = "Orcamento_" . date('Ymd_His') . ".pdf";
        
        // Enviar headers para download
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="' . $pdf_nome . '"');
        header('Content-Length: ' . strlen($pdf_content));
        header('Cache-Control: private, max-age=0, must-revalidate');
        header('Pragma: public');
        
        echo $pdf_content;
        exit;
    }
}

header('Location: calculadora-orcamento.php');
exit;
?>
