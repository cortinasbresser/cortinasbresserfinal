<?php
// converter-logo-pdf.php - Converte SVG para PNG de alta qualidade para PDF

$svg_file = __DIR__ . '/assets/cortinasbresser.svg';
$output_png = __DIR__ . '/assets/logo-pdf.png';

// Ler SVG
if (!file_exists($svg_file)) {
    die("Arquivo SVG não encontrado: $svg_file\n");
}

$svg_content = file_get_contents($svg_file);

// Método 1: Usando Imagick (se disponível)
if (extension_loaded('imagick')) {
    try {
        $imagick = new Imagick();
        $imagick->setBackgroundColor(new ImagickPixel('transparent'));
        $imagick->readImageBlob($svg_content);
        $imagick->setImageFormat('png32');
        
        // Redimensionar para largura ideal de 150px mantendo proporção
        $imagick->resizeImage(150, 0, Imagick::FILTER_LANCZOS, 1);
        
        $imagick->writeImage($output_png);
        $imagick->clear();
        $imagick->destroy();
        
        echo "✅ Logo convertido com sucesso usando Imagick!\n";
        echo "📁 Arquivo: $output_png\n";
        echo "📏 Tamanho: " . filesize($output_png) . " bytes\n";
        exit(0);
    } catch (Exception $e) {
        echo "⚠️ Erro com Imagick: " . $e->getMessage() . "\n";
    }
}

// Método 2: Usando GD - Logo elegante mesmo sem Imagick
echo "⚠️ Imagick não disponível. Criando logo elegante com GD...\n";

// Criar imagem PNG elegante
$width = 400;
$height = 120;
$image = imagecreatetruecolor($width, $height);

// Fundo transparente
imagealphablending($image, false);
imagesavealpha($image, true);
$transparent = imagecolorallocatealpha($image, 255, 255, 255, 127);
imagefilledrectangle($image, 0, 0, $width, $height, $transparent);

// Cores do tema elegante
$ouro_escuro = imagecolorallocate($image, 139, 115, 85);    // #8b7355
$ouro_medio = imagecolorallocate($image, 201, 169, 97);     // #c9a961
$ouro_claro = imagecolorallocate($image, 224, 194, 133);    // #e0c285

// Habilitar blending para desenhar
imagealphablending($image, true);

// Borda decorativa superior
imagefilledrectangle($image, 50, 15, 350, 18, $ouro_medio);

// Texto principal "CORTINAS BRESSER"
$font_size = 5;
$text1 = 'CORTINAS';
$text2 = 'BRESSER';

// Primeira linha (ouro escuro)
$text1_width = imagefontwidth($font_size) * strlen($text1);
$x1 = ($width - $text1_width) / 2;
imagestring($image, $font_size, (int)$x1, 30, $text1, $ouro_escuro);

// Segunda linha (ouro médio)
$text2_width = imagefontwidth($font_size) * strlen($text2);
$x2 = ($width - $text2_width) / 2;
imagestring($image, $font_size, (int)$x2, 50, $text2, $ouro_medio);

// Subtítulo
$subtitle = 'Elegancia e Qualidade';
$subtitle_width = imagefontwidth(3) * strlen($subtitle);
$x3 = ($width - $subtitle_width) / 2;
imagestring($image, 3, (int)$x3, 75, $subtitle, $ouro_claro);

// Borda decorativa inferior
imagefilledrectangle($image, 80, 95, 320, 98, $ouro_medio);

// Detalhes decorativos (cantos)
imagefilledrectangle($image, 45, 15, 48, 25, $ouro_claro);
imagefilledrectangle($image, 352, 15, 355, 25, $ouro_claro);
imagefilledrectangle($image, 75, 95, 78, 105, $ouro_claro);
imagefilledrectangle($image, 322, 95, 325, 105, $ouro_claro);

// Salvar PNG com máxima qualidade
imagepng($image, $output_png, 0);
imagedestroy($image);

echo "✅ Logo elegante criado com sucesso!\n";
echo "📁 Arquivo: $output_png\n";
echo "📏 Tamanho: " . filesize($output_png) . " bytes\n";
echo "\n💡 Logo criado com as cores do tema: ouro escuro, médio e claro\n";
?>
