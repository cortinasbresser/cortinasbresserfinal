<?php
// phpinfo-check.php - Verificar configuração do PHP
// ATENÇÃO: Remover este arquivo após verificação por questões de segurança!

echo "<h1>Verificação PHP - Cortinas Bresser</h1>";
echo "<hr>";

echo "<h2>Versão do PHP</h2>";
echo "<p><strong>" . phpversion() . "</strong></p>";

echo "<h2>Extensões Carregadas</h2>";
$extensions = get_loaded_extensions();
sort($extensions);
echo "<ul>";
foreach ($extensions as $ext) {
    echo "<li>$ext</li>";
}
echo "</ul>";

echo "<h2>Extensão GD</h2>";
if (extension_loaded('gd')) {
    echo "<p style='color: green;'><strong>✓ GD está HABILITADA</strong></p>";
    if (function_exists('gd_info')) {
        echo "<pre>";
        print_r(gd_info());
        echo "</pre>";
    }
} else {
    echo "<p style='color: red;'><strong>✗ GD NÃO está habilitada</strong></p>";
}

echo "<h2>Funções de Imagem</h2>";
$image_functions = [
    'imagecreatefrompng' => 'Criar imagem de PNG',
    'imagecreatefromjpeg' => 'Criar imagem de JPEG',
    'imagecreatetruecolor' => 'Criar imagem true color',
    'imagecopyresampled' => 'Redimensionar imagem',
    'imagejpeg' => 'Salvar como JPEG',
    'imagepng' => 'Salvar como PNG',
    'imagesx' => 'Obter largura',
    'imagesy' => 'Obter altura'
];

echo "<ul>";
foreach ($image_functions as $func => $desc) {
    $status = function_exists($func) ? '✓' : '✗';
    $color = function_exists($func) ? 'green' : 'red';
    echo "<li style='color: $color;'><strong>$status</strong> $func - $desc</li>";
}
echo "</ul>";

echo "<h2>Extensão Imagick</h2>";
if (extension_loaded('imagick')) {
    echo "<p style='color: green;'><strong>✓ Imagick está HABILITADA</strong></p>";
    if (class_exists('Imagick')) {
        $imagick = new Imagick();
        echo "<p>Versão: " . $imagick->getVersion()['versionString'] . "</p>";
    }
} else {
    echo "<p style='color: orange;'><strong>⚠ Imagick NÃO está habilitada (opcional para SVG)</strong></p>";
}

echo "<h2>Configurações de Memória</h2>";
echo "<ul>";
echo "<li><strong>memory_limit:</strong> " . ini_get('memory_limit') . "</li>";
echo "<li><strong>max_execution_time:</strong> " . ini_get('max_execution_time') . "</li>";
echo "<li><strong>upload_max_filesize:</strong> " . ini_get('upload_max_filesize') . "</li>";
echo "<li><strong>post_max_size:</strong> " . ini_get('post_max_size') . "</li>";
echo "</ul>";

echo "<hr>";
echo "<p><em>IMPORTANTE: Remova este arquivo após verificação!</em></p>";

// phpinfo completo (comentado por segurança)
// echo "<hr><h2>PHPInfo Completo</h2>";
// phpinfo();
?>
