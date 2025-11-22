<?php
// gerar-pdf.php - Gerador de PDF profissional para Cortinas Bresser

require_once(__DIR__ . '/tcpdf-simple.php');

function gerarPDFSimples($html_content) {
    // Extrair dados do HTML
    $dados = extrairDadosHTML($html_content);
    
    // Usar biblioteca profissional
    $pdf = new CORTINAS_PDF();
    
    // Converter SVG para PNG temporário para usar no PDF
    $svg_path = __DIR__ . '/assets/cortinasbresser.svg';
    $logo_path = __DIR__ . '/assets/logo-placeholder1.png';
    
    // Se SVG existe e temos GD com suporte a Imagick, tentar converter
    if (file_exists($svg_path) && extension_loaded('imagick')) {
        try {
            $imagick = new Imagick();
            $imagick->readImage($svg_path);
            $imagick->setImageFormat('png');
            $imagick->setImageBackgroundColor('white');
            $imagick->setImageAlphaChannel(Imagick::ALPHACHANNEL_REMOVE);
            $imagick->resizeImage(400, 0, Imagick::FILTER_LANCZOS, 1);
            
            $temp_png = __DIR__ . '/assets/temp_logo_pdf.png';
            $imagick->writeImage($temp_png);
            $imagick->clear();
            $imagick->destroy();
            
            if (file_exists($temp_png)) {
                $logo_path = $temp_png;
            }
        } catch (Exception $e) {
            error_log('Erro ao converter SVG: ' . $e->getMessage());
        }
    }
    
    // Fallback para PNG de alta qualidade
    if (!file_exists($logo_path)) {
        $logo_path = __DIR__ . '/assets/logo-placeholder1.png';
    }
    if (!file_exists($logo_path)) {
        $logo_path = __DIR__ . '/assets/logo-placeholder.png';
    }
    
    $result = $pdf->generatePDF($dados, $logo_path);
    
    // Limpar arquivo temporário se foi criado
    $temp_file = __DIR__ . '/assets/temp_logo_pdf.png';
    if (file_exists($temp_file) && strpos($logo_path, 'temp_logo_pdf.png') !== false) {
        @unlink($temp_file);
    }
    
    return $result;
}

function extrairDadosHTML($html) {
    $dados = [];
    
    // Extrair nome
    if (preg_match('/Nome:<\/span>\s*<span[^>]*>(.*?)<\/span>/s', $html, $match)) {
        $dados['nome'] = html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    
    // Extrair telefone
    if (preg_match('/Telefone:<\/span>\s*<span[^>]*>(.*?)<\/span>/s', $html, $match)) {
        $dados['telefone'] = html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    
    // Extrair largura da parede
    if (preg_match('/Largura:<\/span>\s*<span[^>]*>(.*?)<\/span>/s', $html, $match)) {
        $dados['largura'] = html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    
    // Extrair altura da parede
    if (preg_match('/Altura:<\/span>\s*<span[^>]*>(.*?)<\/span>/s', $html, $match)) {
        $dados['altura'] = html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    
    // Extrair tipo de tecido
    if (preg_match('/Tipo de Tecido:<\/span>\s*<span[^>]*>(.*?)<\/span>/s', $html, $match)) {
        $dados['tecido'] = html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    
    // Extrair tipo de instalação
    if (preg_match('/Tipo de Instala.*?:<\/span>\s*<span[^>]*>(.*?)<\/span>/s', $html, $match)) {
        $dados['instalacao'] = html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    
    // Extrair endereço
    if (preg_match('/ENDERECO PARA INSTALACAO<\/h3>\s*<p>(.*?)<\/p>/s', $html, $match)) {
        $dados['endereco'] = html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    
    // Extrair observações
    if (preg_match('/OBSERVACOES<\/h3>\s*<p>(.*?)<\/p>/s', $html, $match)) {
        $dados['observacoes'] = html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    
    return $dados;
}

function gerarPDFProfissional($dados) {
    // Classe FPDF minimalista inline
    class PDF_Simple {
        private $buffer = '';
        private $page = 0;
        private $n = 2;
        private $offsets = [];
        
        function __construct() {
            $this->buffer = "%PDF-1.4\n";
        }
        
        function AddPage() {
            $this->page++;
        }
        
        function SetFont($family, $style = '', $size = 10) {
            // Implementação simplificada
        }
        
        function Cell($w, $h, $txt, $border = 0, $ln = 0, $align = '') {
            // Implementação simplificada
        }
        
        function Output() {
            return $this->buffer;
        }
    }
    
    // Gerar PDF usando estrutura manual mais robusta
    $pdf_buffer = "%PDF-1.4\n";
    
    // Função auxiliar para texto
    function pdfEscape($text) {
        $text = mb_convert_encoding($text, 'ISO-8859-1', 'UTF-8');
        $text = str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);
        return $text;
    }
    
    // Verificar e preparar logo PNG para PDF
    $logo_path = __DIR__ . '/assets/logo-pdf.png';
    
    // Verificar se logo existe
    if (!file_exists($logo_path)) {
        error_log('Logo PDF não encontrado: ' . $logo_path);
    }
    
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
    
    // Objeto 6: Logo PNG de alta qualidade
    $logo_stream = '';
    if ($has_logo) {
        $obj_num++;
        $img = @imagecreatefrompng($logo_path);
        if ($img) {
            $width = imagesx($img);
            $height = imagesy($img);
            
            // Redimensionar para até 300px de largura (logo bem visível)
            $max_w = 300;
            if ($width > $max_w) {
                $ratio = $max_w / $width;
                $new_w = $max_w;
                $new_h = (int)($height * $ratio);
                
                // Criar imagem redimensionada com alta qualidade
                $resized = imagecreatetruecolor($new_w, $new_h);
                
                // Fundo branco limpo
                $white = imagecolorallocate($resized, 255, 255, 255);
                imagefilledrectangle($resized, 0, 0, $new_w, $new_h, $white);
                
                // Preservar transparência se houver
                imagealphablending($resized, true);
                imagesavealpha($resized, true);
                
                // Redimensionar com alta qualidade (bicubic/lanczos)
                imagecopyresampled($resized, $img, 0, 0, 0, 0, $new_w, $new_h, $width, $height);
                imagedestroy($img);
                
                $img = $resized;
                $width = $new_w;
                $height = $new_h;
            }
            
            // Converter para dados RGB raw (sem compressão para máxima qualidade)
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
            
            // Comprimir com FlateDecode
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
    $margin = 60;
    $center_x = $page_width / 2;
    
    // Desenhar logo centralizado no topo (maior e mais visível)
    if ($has_logo && $logo_obj) {
        $w = $logo_obj['width'];
        $h = $logo_obj['height'];
        
        // Ajustar tamanho para ficar mais visível (máximo 250px)
        $max_width = 250;
        if ($w > $max_width) {
            $ratio = $max_width / $w;
            $w = $max_width;
            $h = (int)($h * $ratio);
        }
        
        $logo_x = ($page_width - $w) / 2; // Centralizar
        $logo_y = 730; // Mais no topo
        $content .= "q\n";
        $content .= "{$w} 0 0 {$h} {$logo_x} {$logo_y} cm\n";
        $content .= "/Im1 Do\n";
        $content .= "Q\n";
    }
    
    // Linha decorativa dourada abaixo do logo
    $y = $has_logo ? 710 : 760;
    $content .= "q\n";
    $content .= "0.85 0.69 0.22 RG\n"; // Cor dourada
    $content .= "2 w\n"; // Largura da linha
    $content .= "100 {$y} m\n";
    $content .= "512 {$y} l\n";
    $content .= "S\n";
    $content .= "Q\n";
    
    // Iniciar texto
    $content .= "BT\n";
    
    // Título principal centralizado - Ouro Escuro Elegante
    $y -= 35;
    $titulo = pdfEscape("SOLICITACAO DE ORCAMENTO");
    $content .= "/F2 22 Tf\n";
    $content .= "0.54 0.45 0.26 rg\n"; // Ouro escuro (#8b7355)
    // Calcular posição X para centralizar (aproximado)
    $titulo_width = strlen($titulo) * 12; // Estimativa para fonte 22pt
    $titulo_x = ($page_width - $titulo_width) / 2;
    $content .= "1 0 0 1 {$titulo_x} {$y} Tm\n";
    $content .= "({$titulo}) Tj\n";
    
    // Linha decorativa abaixo do título
    $content .= "ET\n";
    $y -= 8;
    $content .= "q\n0.79 0.66 0.38 RG\n0.8 w\n"; // Ouro claro
    $line_start = ($page_width - 100) / 2;
    $line_end = ($page_width + 100) / 2;
    $content .= "{$line_start} {$y} m\n{$line_end} {$y} l\nS\nQ\n";
    $content .= "BT\n";
    $content .= "0.2 0.2 0.2 rg\n"; // Texto escuro
    
    // Box elegante com fundo pastel e borda ouro
    $y -= 50;
    $content .= "ET\n"; // Terminar texto para desenhar box
    $box_y = $y - 5;
    
    // Fundo bege muito claro
    $content .= "q\n0.96 0.94 0.91 rg\n"; // #f5f0e8
    $content .= "70 {$box_y} 472 80 re\nf\nQ\n"; // Box
    
    // Barra lateral ouro escuro (esquerda)
    $content .= "q\n0.54 0.45 0.26 rg\n"; // Ouro escuro
    $content .= "70 {$box_y} 3 80 re\nf\nQ\n"; // Barra
    
    // Borda ouro claro
    $content .= "q\n0.79 0.66 0.38 RG\n1 w\n"; // Ouro claro
    $content .= "70 {$box_y} 472 80 re\nS\nQ\n";
    
    $content .= "BT\n"; // Retomar texto
    
    // Seção: Dados do Cliente
    $content .= "/F2 11 Tf\n";
    $content .= "0.54 0.45 0.26 rg\n"; // Ouro escuro
    $ty = $y - 18;
    $content .= "1 0 0 1 78 {$ty} Tm\n"; // Posição absoluta
    $content .= "(" . pdfEscape("DADOS DO CLIENTE") . ") Tj\n";
    $content .= "0.2 0.2 0.2 rg\n"; // Texto escuro
    
    $content .= "/F1 10 Tf\n";
    $ty -= 22;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("Nome: " . ($dados['nome'] ?? 'Não informado')) . ") Tj\n";
    
    $ty -= 16;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("Telefone: " . ($dados['telefone'] ?? 'Não informado')) . ") Tj\n";
    
    // Box para medidas
    $y -= 110;
    $content .= "ET\n";
    $box_y = $y - 5;
    $content .= "q\n0.96 0.94 0.91 rg\n";
    $content .= "70 {$box_y} 472 70 re\nf\nQ\n";
    $content .= "q\n0.54 0.45 0.26 rg\n";
    $content .= "70 {$box_y} 3 70 re\nf\nQ\n";
    $content .= "q\n0.79 0.66 0.38 RG\n1 w\n";
    $content .= "70 {$box_y} 472 70 re\nS\nQ\n";
    $content .= "BT\n";
    
    // Seção: Medidas da Parede
    $content .= "/F2 11 Tf\n";
    $content .= "0.54 0.45 0.26 rg\n";
    $ty = $y - 18;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("MEDIDAS DA PAREDE") . ") Tj\n";
    $content .= "0.2 0.2 0.2 rg\n";
    
    $content .= "/F1 10 Tf\n";
    $ty -= 22;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("Largura: " . ($dados['largura'] ?? 'Não informado')) . ") Tj\n";
    
    $ty -= 16;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("Altura: " . ($dados['altura'] ?? 'Não informado')) . ") Tj\n";
    
    // Box para especificações
    $y -= 100;
    $content .= "ET\n";
    $box_y = $y - 5;
    $content .= "q\n0.96 0.94 0.91 rg\n";
    $content .= "70 {$box_y} 472 70 re\nf\nQ\n";
    $content .= "q\n0.54 0.45 0.26 rg\n";
    $content .= "70 {$box_y} 3 70 re\nf\nQ\n";
    $content .= "q\n0.79 0.66 0.38 RG\n1 w\n";
    $content .= "70 {$box_y} 472 70 re\nS\nQ\n";
    $content .= "BT\n";
    
    // Seção: Especificações
    $content .= "/F2 11 Tf\n";
    $content .= "0.54 0.45 0.26 rg\n";
    $ty = $y - 18;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("ESPECIFICAÇÕES") . ") Tj\n";
    $content .= "0.2 0.2 0.2 rg\n";
    
    $content .= "/F1 10 Tf\n";
    $ty -= 22;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("Tipo de Tecido: " . ($dados['tecido'] ?? 'Não informado')) . ") Tj\n";
    
    $ty -= 16;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("Tipo de Instalação: " . ($dados['instalacao'] ?? 'Não informado')) . ") Tj\n";
    
    // Seção: Endereço
    $y -= 100;
    $content .= "ET\n";
    $endereco = $dados['endereco'] ?? 'Não informado';
    $linhas = explode("\n", wordwrap($endereco, 55));
    $box_height = 50 + (count($linhas) * 16);
    $box_y = $y - 5;
    $content .= "q\n0.96 0.94 0.91 rg\n";
    $content .= "70 {$box_y} 472 {$box_height} re\nf\nQ\n";
    $content .= "q\n0.54 0.45 0.26 rg\n";
    $content .= "70 {$box_y} 3 {$box_height} re\nf\nQ\n";
    $content .= "q\n0.79 0.66 0.38 RG\n1 w\n";
    $content .= "70 {$box_y} 472 {$box_height} re\nS\nQ\n";
    $content .= "BT\n";
    
    $content .= "/F2 11 Tf\n";
    $content .= "0.54 0.45 0.26 rg\n";
    $ty = $y - 18;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("ENDEREÇO PARA INSTALAÇÃO") . ") Tj\n";
    $content .= "0.2 0.2 0.2 rg\n";
    
    $content .= "/F1 10 Tf\n";
    $ty -= 22;
    foreach ($linhas as $i => $linha) {
        $content .= "1 0 0 1 78 {$ty} Tm\n";
        $content .= "(" . pdfEscape(trim($linha)) . ") Tj\n";
        $ty -= 16;
    }
    
    // Seção: Observações
    $y -= ($box_height + 30);
    $content .= "ET\n";
    $observacoes = $dados['observacoes'] ?? 'Nenhuma observação';
    $linhas_obs = explode("\n", wordwrap($observacoes, 55));
    $box_height = 50 + (count($linhas_obs) * 16);
    $box_y = $y - 5;
    $content .= "q\n0.96 0.94 0.91 rg\n";
    $content .= "70 {$box_y} 472 {$box_height} re\nf\nQ\n";
    $content .= "q\n0.54 0.45 0.26 rg\n";
    $content .= "70 {$box_y} 3 {$box_height} re\nf\nQ\n";
    $content .= "q\n0.79 0.66 0.38 RG\n1 w\n";
    $content .= "70 {$box_y} 472 {$box_height} re\nS\nQ\n";
    $content .= "BT\n";
    
    $content .= "/F2 11 Tf\n";
    $content .= "0.54 0.45 0.26 rg\n";
    $ty = $y - 18;
    $content .= "1 0 0 1 78 {$ty} Tm\n";
    $content .= "(" . pdfEscape("OBSERVAÇÕES") . ") Tj\n";
    $content .= "0.2 0.2 0.2 rg\n";
    
    $content .= "/F1 10 Tf\n";
    $ty -= 22;
    foreach ($linhas_obs as $i => $linha) {
        $content .= "1 0 0 1 78 {$ty} Tm\n";
        $content .= "(" . pdfEscape(trim($linha)) . ") Tj\n";
        $ty -= 16;
    }
    
    // Footer com linha dourada
    $content .= "ET\n";
    $content .= "q\n0.85 0.69 0.22 RG\n1 w\n";
    $content .= "70 60 m\n512 60 l\nS\nQ\n";
    $content .= "BT\n";
    
    $content .= "/F1 8 Tf\n";
    $content .= "0.3 0.3 0.3 rg\n";
    $footer_x = ($page_width - 250) / 2; // Centralizar
    $content .= "1 0 0 1 {$footer_x} 45 Tm\n";
    $content .= "(" . pdfEscape("Data/Hora: " . date('d/m/Y H:i:s')) . ") Tj\n";
    $content .= "1 0 0 1 " . (($page_width - 350) / 2) . " 33 Tm\n";
    $content .= "(" . pdfEscape("Enviado via Site Cortinas Bresser - www.cortinasbresser.com.br") . ") Tj\n";
    
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
