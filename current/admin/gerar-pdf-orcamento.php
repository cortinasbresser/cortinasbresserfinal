<?php
// gerar-pdf-orcamento.php - Gerar PDF do orçamento da calculadora

function gerarPDFOrcamento($resultado) {
    // Função auxiliar para escapar texto
    function pdfEscape($text) {
        $text = mb_convert_encoding($text, 'ISO-8859-1', 'UTF-8');
        $text = str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);
        return $text;
    }
    
    // Preparar logo
    $logo_path = __DIR__ . '/../assets/logo-pdf.png';
    $has_logo = file_exists($logo_path);
    $logo_obj = null;
    
    // Preparar objetos do PDF
    $objects = [];
    $obj_num = 0;
    
    // Objeto 1: Catalog
    $obj_num++;
    $objects[$obj_num] = "<< /Type /Catalog /Pages 2 0 R >>";
    
    // Objeto 2: Pages
    $obj_num++;
    $objects[$obj_num] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
    
    // Objeto 3: Page
    $obj_num++;
    $resources = "<< /Font << /F1 4 0 R /F2 5 0 R >>";
    if ($has_logo) {
        $resources .= " /XObject << /Im1 6 0 R >>";
    }
    $resources .= " >>";
    $content_ref = $has_logo ? "7 0 R" : "6 0 R";
    $objects[$obj_num] = "<< /Type /Page /Parent 2 0 R /Resources {$resources} /MediaBox [0 0 612 792] /Contents {$content_ref} >>";
    
    // Objeto 4: Font Helvetica
    $obj_num++;
    $objects[$obj_num] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
    
    // Objeto 5: Font Helvetica-Bold
    $obj_num++;
    $objects[$obj_num] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
    
    // Objeto 6: Logo PNG
    if ($has_logo) {
        $obj_num++;
        $img = @imagecreatefrompng($logo_path);
        if ($img) {
            $width = imagesx($img);
            $height = imagesy($img);
            
            // Redimensionar para até 250px
            $max_w = 250;
            if ($width > $max_w) {
                $ratio = $max_w / $width;
                $new_w = $max_w;
                $new_h = (int)($height * $ratio);
                
                $resized = imagecreatetruecolor($new_w, $new_h);
                $white = imagecolorallocate($resized, 255, 255, 255);
                imagefilledrectangle($resized, 0, 0, $new_w, $new_h, $white);
                imagealphablending($resized, true);
                imagesavealpha($resized, true);
                imagecopyresampled($resized, $img, 0, 0, 0, 0, $new_w, $new_h, $width, $height);
                imagedestroy($img);
                
                $img = $resized;
                $width = $new_w;
                $height = $new_h;
            }
            
            // Converter para RGB raw
            $img_data = '';
            for ($y = $height - 1; $y >= 0; $y--) {
                for ($x = 0; $x < $width; $x++) {
                    $rgb = imagecolorat($img, $x, $y);
                    $r = ($rgb >> 16) & 0xFF;
                    $g = ($rgb >> 8) & 0xFF;
                    $b = $rgb & 0xFF;
                    $img_data .= chr($r) . chr($g) . chr($b);
                }
            }
            imagedestroy($img);
            
            $compressed = gzcompress($img_data, 9);
            $objects[$obj_num] = "<< /Type /XObject /Subtype /Image /Width {$width} /Height {$height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length " . strlen($compressed) . " >>\nstream\n" . $compressed . "\nendstream";
            $logo_obj = ['width' => $width, 'height' => $height, 'num' => $obj_num];
        } else {
            $has_logo = false;
        }
    }
    
    // Objeto 7 (ou 6): Content Stream
    $obj_num++;
    $content = '';
    
    $page_width = 612;
    $y = 750;
    
    // Desenhar logo centralizado no topo
    if ($has_logo && $logo_obj) {
        $w = $logo_obj['width'];
        $h = $logo_obj['height'];
        $logo_x = ($page_width - $w) / 2;
        $logo_y = 720;
        $content .= "q\n";
        $content .= "{$w} 0 0 {$h} {$logo_x} {$logo_y} cm\n";
        $content .= "/Im1 Do\n";
        $content .= "Q\n";
        $y = 700;
    }
    
    $content .= "BT\n";
    
    // Título
    $titulo = pdfEscape("ORCAMENTO");
    $content .= "/F2 24 Tf\n";
    $content .= "0.54 0.45 0.26 rg\n";
    $titulo_width = strlen($titulo) * 14;
    $titulo_x = ($page_width - $titulo_width) / 2;
    $content .= "1 0 0 1 {$titulo_x} {$y} Tm\n";
    $content .= "({$titulo}) Tj\n";
    
    // Linha decorativa
    $content .= "ET\n";
    $y -= 10;
    $content .= "q\n0.79 0.66 0.38 RG\n1 w\n";
    $line_start = ($page_width - 120) / 2;
    $line_end = ($page_width + 120) / 2;
    $content .= "{$line_start} {$y} m\n{$line_end} {$y} l\nS\nQ\n";
    
    $y -= 40;
    
    // Box principal
    $box_y = $y - 10;
    $box_height = 450;
    $content .= "q\n0.96 0.94 0.91 rg\n";
    $content .= "60 {$box_y} 492 {$box_height} re\nf\nQ\n";
    $content .= "q\n0.54 0.45 0.26 rg\n";
    $content .= "60 {$box_y} 4 {$box_height} re\nf\nQ\n";
    $content .= "q\n0.79 0.66 0.38 RG\n1.5 w\n";
    $content .= "60 {$box_y} 492 {$box_height} re\nS\nQ\n";
    
    $content .= "BT\n";
    $content .= "0.2 0.2 0.2 rg\n";
    
    $tx = 80;
    
    // MEDIDAS
    $content .= "/F2 12 Tf\n0.54 0.45 0.26 rg\n";
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("MEDIDAS") . ") Tj\n";
    
    $y -= 25;
    $content .= "/F1 11 Tf\n0.2 0.2 0.2 rg\n";
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Largura: " . number_format($resultado['largura'], 2, ',', '.') . "m") . ") Tj\n";
    
    $y -= 18;
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Altura: " . number_format($resultado['altura'], 2, ',', '.') . "m") . ") Tj\n";
    
    $y -= 18;
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Area: " . number_format($resultado['area_m2'], 2, ',', '.') . "m2") . ") Tj\n";
    
    $y -= 18;
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Area c/ Margem: " . number_format($resultado['area_com_margem'], 2, ',', '.') . "m2") . ") Tj\n";
    
    // Linha separadora
    $y -= 15;
    $content .= "ET\nq\n0.79 0.66 0.38 RG\n0.5 w\n";
    $content .= "80 {$y} m\n530 {$y} l\nS\nQ\nBT\n";
    
    $y -= 25;
    
    // ESPECIFICAÇÕES
    $content .= "/F2 12 Tf\n0.54 0.45 0.26 rg\n";
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("ESPECIFICACOES") . ") Tj\n";
    
    $y -= 25;
    $content .= "/F1 11 Tf\n0.2 0.2 0.2 rg\n";
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Tecido: " . $resultado['tecido']) . ") Tj\n";
    
    $y -= 18;
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Instalacao: " . $resultado['instalacao']) . ") Tj\n";
    
    if ($resultado['preco_mao_obra'] > 0) {
        $y -= 18;
        $content .= "1 0 0 1 {$tx} {$y} Tm\n";
        $content .= "(" . pdfEscape("Complexidade: " . ucfirst($resultado['complexidade'])) . ") Tj\n";
    }
    
    // Linha separadora
    $y -= 15;
    $content .= "ET\nq\n0.79 0.66 0.38 RG\n0.5 w\n";
    $content .= "80 {$y} m\n530 {$y} l\nS\nQ\nBT\n";
    
    $y -= 25;
    
    // VALORES
    $content .= "/F2 12 Tf\n0.54 0.45 0.26 rg\n";
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("VALORES") . ") Tj\n";
    
    $y -= 25;
    $content .= "/F1 11 Tf\n0.2 0.2 0.2 rg\n";
    
    // Tecido
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Tecido:") . ") Tj\n";
    $valor_x = 480;
    $content .= "1 0 0 1 {$valor_x} {$y} Tm\n";
    $content .= "(" . pdfEscape("R$ " . number_format($resultado['preco_tecido'], 2, ',', '.')) . ") Tj\n";
    
    $y -= 18;
    
    // Instalação
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Instalacao:") . ") Tj\n";
    $content .= "1 0 0 1 {$valor_x} {$y} Tm\n";
    $content .= "(" . pdfEscape("R$ " . number_format($resultado['preco_instalacao_total'], 2, ',', '.')) . ") Tj\n";
    
    $y -= 18;
    
    // Mão de Obra
    if ($resultado['preco_mao_obra'] > 0) {
        $content .= "1 0 0 1 {$tx} {$y} Tm\n";
        $content .= "(" . pdfEscape("Mao de Obra:") . ") Tj\n";
        $content .= "1 0 0 1 {$valor_x} {$y} Tm\n";
        $content .= "(" . pdfEscape("R$ " . number_format($resultado['preco_mao_obra'], 2, ',', '.')) . ") Tj\n";
        $y -= 18;
    }
    
    // Linha antes do subtotal
    $y -= 5;
    $content .= "ET\nq\n0.79 0.66 0.38 RG\n0.8 w\n";
    $content .= "80 {$y} m\n530 {$y} l\nS\nQ\nBT\n";
    
    $y -= 25;
    
    // Subtotal
    $content .= "/F2 11 Tf\n";
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("Subtotal:") . ") Tj\n";
    $content .= "1 0 0 1 {$valor_x} {$y} Tm\n";
    $content .= "(" . pdfEscape("R$ " . number_format($resultado['subtotal'], 2, ',', '.')) . ") Tj\n";
    
    $y -= 20;
    
    // Desconto
    if ($resultado['desconto_percent'] > 0) {
        $content .= "/F1 11 Tf\n0.8 0.2 0.2 rg\n";
        $content .= "1 0 0 1 {$tx} {$y} Tm\n";
        $content .= "(" . pdfEscape("Desconto (" . number_format($resultado['desconto_percent'], 1, ',', '.') . "%):") . ") Tj\n";
        $content .= "1 0 0 1 {$valor_x} {$y} Tm\n";
        $content .= "(" . pdfEscape("-R$ " . number_format($resultado['valor_desconto'], 2, ',', '.')) . ") Tj\n";
        $y -= 20;
    }
    
    // Box do Total
    $y -= 15;
    $box_total_y = $y - 5;
    $content .= "ET\n";
    $content .= "q\n0.54 0.45 0.26 rg\n";
    $content .= "60 {$box_total_y} 492 45 re\nf\nQ\n";
    
    $y -= 30;
    $content .= "BT\n";
    $content .= "/F2 16 Tf\n1 1 1 rg\n";
    $content .= "1 0 0 1 {$tx} {$y} Tm\n";
    $content .= "(" . pdfEscape("VALOR TOTAL:") . ") Tj\n";
    
    $content .= "/F2 18 Tf\n0.79 0.66 0.38 rg\n";
    $valor_total_x = 420;
    $content .= "1 0 0 1 {$valor_total_x} {$y} Tm\n";
    $content .= "(" . pdfEscape("R$ " . number_format($resultado['total'], 2, ',', '.')) . ") Tj\n";
    
    // Footer
    $y = 80;
    $content .= "/F1 9 Tf\n0.4 0.4 0.4 rg\n";
    $footer_text = pdfEscape("Orcamento gerado em " . date('d/m/Y') . " as " . date('H:i'));
    $footer_x = ($page_width - (strlen($footer_text) * 5.5)) / 2;
    $content .= "1 0 0 1 {$footer_x} {$y} Tm\n";
    $content .= "({$footer_text}) Tj\n";
    
    $y -= 15;
    $footer_text2 = pdfEscape("Cortinas Bresser - www.cortinasbresser.com.br");
    $footer_x2 = ($page_width - (strlen($footer_text2) * 5.5)) / 2;
    $content .= "1 0 0 1 {$footer_x2} {$y} Tm\n";
    $content .= "({$footer_text2}) Tj\n";
    
    $content .= "ET\n";
    
    $objects[$obj_num] = "<< /Length " . strlen($content) . " >>\nstream\n{$content}\nendstream";
    
    // Construir PDF
    $pdf_buffer = "%PDF-1.4\n";
    $offsets = [0 => 0];
    
    foreach ($objects as $num => $obj) {
        $offsets[$num] = strlen($pdf_buffer);
        $pdf_buffer .= "{$num} 0 obj\n{$obj}\nendobj\n";
    }
    
    // Cross-reference table
    $xref_offset = strlen($pdf_buffer);
    $pdf_buffer .= "xref\n";
    $pdf_buffer .= "0 " . ($obj_num + 1) . "\n";
    $pdf_buffer .= "0000000000 65535 f \n";
    
    for ($i = 1; $i <= $obj_num; $i++) {
        $pdf_buffer .= sprintf("%010d 00000 n \n", $offsets[$i]);
    }
    
    // Trailer
    $pdf_buffer .= "trailer\n";
    $pdf_buffer .= "<< /Size " . ($obj_num + 1) . " /Root 1 0 R >>\n";
    $pdf_buffer .= "startxref\n";
    $pdf_buffer .= $xref_offset . "\n";
    $pdf_buffer .= "%%EOF";
    
    return $pdf_buffer;
}
?>
