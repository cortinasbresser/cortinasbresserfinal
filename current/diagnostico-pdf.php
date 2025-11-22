<?php
// diagnostico-pdf.php - Verificar status do sistema de PDF

header('Content-Type: text/html; charset=utf-8');

echo '<div class="section"><h3>📁 Verificação de Arquivos</h3>';

// Verificar logo-pdf.png
$logo_pdf = __DIR__ . '/assets/logo-pdf.png';
if (file_exists($logo_pdf)) {
    $size = filesize($logo_pdf);
    $img_info = @getimagesize($logo_pdf);
    echo '<p class="ok">✅ logo-pdf.png encontrado</p>';
    echo '<pre>';
    echo "Caminho: $logo_pdf\n";
    echo "Tamanho: " . number_format($size) . " bytes\n";
    if ($img_info) {
        echo "Dimensões: {$img_info[0]}x{$img_info[1]} px\n";
        echo "Tipo: {$img_info['mime']}\n";
    }
    echo '</pre>';
} else {
    echo '<p class="error">❌ logo-pdf.png NÃO encontrado em: ' . $logo_pdf . '</p>';
    echo '<p class="warning">⚠️ Execute o conversor em: <a href="converter-logo-pdf.php" target="_blank" style="color: #2196f3;">converter-logo-pdf.php</a></p>';
}

// Verificar SVG original
$svg = __DIR__ . '/assets/cortinasbresser.svg';
if (file_exists($svg)) {
    echo '<p class="ok">✅ cortinasbresser.svg encontrado (' . number_format(filesize($svg)) . ' bytes)</p>';
} else {
    echo '<p class="error">❌ cortinasbresser.svg NÃO encontrado</p>';
}

echo '</div>';

// Verificar extensões PHP
echo '<div class="section"><h3>🔧 Extensões PHP</h3>';
echo '<pre>';
echo 'PHP Version: ' . phpversion() . "\n";
echo 'GD Library: ' . (extension_loaded('gd') ? '✅ Instalada' : '❌ Não instalada') . "\n";
echo 'Imagick: ' . (extension_loaded('imagick') ? '✅ Instalada' : '⚠️ Não instalada (opcional)') . "\n";

if (extension_loaded('gd')) {
    $gd_info = gd_info();
    echo "\nRecursos GD:\n";
    echo '- PNG: ' . ($gd_info['PNG Support'] ? '✅' : '❌') . "\n";
    echo '- JPEG: ' . ($gd_info['JPEG Support'] ? '✅' : '❌') . "\n";
    echo '- FreeType: ' . ($gd_info['FreeType Support'] ? '✅' : '❌') . "\n";
}
echo '</pre>';
echo '</div>';

// Verificar permissões
echo '<div class="section"><h3>🔒 Permissões</h3>';
$assets_dir = __DIR__ . '/assets';
$temp_dir = __DIR__ . '/temp_pdfs';

echo '<pre>';
echo "Diretório assets/: " . (is_writable($assets_dir) ? '✅ Gravável' : '❌ Sem permissão de escrita') . "\n";
echo "Diretório temp_pdfs/: " . (is_writable($temp_dir) ? '✅ Gravável' : (file_exists($temp_dir) ? '❌ Existe mas sem permissão' : '⚠️ Não existe')) . "\n";
echo '</pre>';
echo '</div>';

// Teste de geração de PDF
echo '<div class="section"><h3>📄 Teste de Geração PDF</h3>';

$dados_teste = [
    'nome' => 'TESTE DIAGNÓSTICO',
    'telefone' => '(11) 99999-9999',
    'largura' => '3.00 m',
    'altura' => '2.50 m',
    'tecido' => 'Blackout',
    'instalacao' => 'Trilho',
    'endereco' => 'Endereço de teste para diagnóstico do sistema',
    'observacoes' => 'Este é um PDF de teste gerado automaticamente pelo sistema de diagnóstico.'
];

try {
    require_once(__DIR__ . '/gerar-pdf.php');
    
    echo '<p class="info">⏳ Gerando PDF de teste...</p>';
    
    $pdf_content = gerarPDFProfissional($dados_teste);
    $pdf_size = strlen($pdf_content);
    
    echo '<p class="ok">✅ PDF gerado com sucesso!</p>';
    echo '<pre>';
    echo "Tamanho do PDF: " . number_format($pdf_size) . " bytes\n";
    echo "Primeira linha: " . substr($pdf_content, 0, 20) . "\n";
    
    // Verificar se tem logo
    if (strpos($pdf_content, '/Im1') !== false) {
        echo "Logo: ✅ Presente no PDF\n";
    } else {
        echo "Logo: ⚠️ Não encontrado no PDF\n";
    }
    echo '</pre>';
    
    // Salvar PDF de teste
    $test_pdf = __DIR__ . '/temp_pdfs/DIAGNOSTICO_' . date('Ymd_His') . '.pdf';
    if (!is_dir(__DIR__ . '/temp_pdfs')) {
        @mkdir(__DIR__ . '/temp_pdfs', 0755, true);
    }
    
    if (file_put_contents($test_pdf, $pdf_content)) {
        $url = 'https://cortinasbresser.com.br/temp_pdfs/' . basename($test_pdf);
        echo '<p class="ok">✅ PDF salvo com sucesso!</p>';
        echo '<p><a href="' . $url . '" target="_blank" style="color: #2196f3; font-weight: bold; font-size: 18px;">📄 VISUALIZAR PDF DE TESTE</a></p>';
    }
    
} catch (Exception $e) {
    echo '<p class="error">❌ Erro ao gerar PDF: ' . htmlspecialchars($e->getMessage()) . '</p>';
    echo '<pre>' . htmlspecialchars($e->getTraceAsString()) . '</pre>';
}

echo '</div>';

// Resumo final
echo '<div class="section"><h3>📊 Resumo</h3>';
$score = 0;
$total = 4;

if (file_exists($logo_pdf)) $score++;
if (extension_loaded('gd')) $score++;
if (is_writable($assets_dir)) $score++;
if (isset($pdf_content) && $pdf_size > 0) $score++;

$percent = ($score / $total) * 100;

echo '<p style="font-size: 24px; text-align: center;">';
if ($percent == 100) {
    echo '<span class="ok">✅ Sistema 100% Funcional</span>';
} elseif ($percent >= 75) {
    echo '<span class="warning">⚠️ Sistema Parcialmente Funcional (' . $percent . '%)</span>';
} else {
    echo '<span class="error">❌ Sistema com Problemas (' . $percent . '%)</span>';
}
echo '</p>';
echo '</div>';
?>
