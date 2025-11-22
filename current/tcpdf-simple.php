<?php
// tcpdf-simple.php - Biblioteca TCPDF minimalista integrada

// Log de extensões disponíveis (não bloqueia execução)
if (extension_loaded('gd')) {
    error_log('GD está disponível');
    if (function_exists('gd_info')) {
        error_log('PHP GD Version: ' . json_encode(gd_info()));
    }
} else {
    error_log('AVISO: Extensão GD não está disponível - PDF será gerado sem logo');
}

class CORTINAS_PDF {
    private $pdf_content = '';
    private $objects = [];
    private $current_obj = 2;
    private $page_height = 842; // A4
    private $page_width = 595;  // A4
    
    public function __construct() {
        $this->pdf_content = "%PDF-1.4\n";
    }
    
    private function addObject($content) {
        $num = $this->current_obj++;
        $this->objects[$num] = $content;
        return $num;
    }
    
    public function generatePDF($dados, $logo_path) {
        error_log("TCPDF: Iniciando geração de PDF");
        error_log("TCPDF: Logo path = " . $logo_path);
        error_log("TCPDF: Dados = " . print_r($dados, true));
        
        // Processar logo (somente se GD estiver disponível)
        $logo_data = null;
        $logo_width = 0;
        $logo_height = 0;
        
        if (extension_loaded('gd') && function_exists('imagecreatefrompng') && file_exists($logo_path)) {
            error_log("TCPDF: Logo encontrado, processando...");
            try {
                $img = @imagecreatefrompng($logo_path);
                if ($img) {
                    $orig_width = imagesx($img);
                    $orig_height = imagesy($img);
                    error_log("TCPDF: Logo original: {$orig_width}x{$orig_height}");
                    
                    // Redimensionar logo para 120px
                    $max_width = 120;
                    $ratio = $max_width / $orig_width;
                    $logo_width = $max_width;
                    $logo_height = intval($orig_height * $ratio);
                    
                    $resized = imagecreatetruecolor($logo_width, $logo_height);
                    imagealphablending($resized, false);
                    imagesavealpha($resized, true);
                    $transparent = imagecolorallocatealpha($resized, 255, 255, 255, 127);
                    imagefilledrectangle($resized, 0, 0, $logo_width, $logo_height, $transparent);
                    imagecopyresampled($resized, $img, 0, 0, 0, 0, $logo_width, $logo_height, $orig_width, $orig_height);
                    
                    ob_start();
                    imagejpeg($resized, null, 95);
                    $logo_data = ob_get_clean();
                    
                    imagedestroy($img);
                    imagedestroy($resized);
                    error_log("TCPDF: Logo processado com sucesso");
                } else {
                    error_log("TCPDF: Erro ao criar imagem do logo");
                }
            } catch (Exception $e) {
                error_log("TCPDF: Exceção ao processar logo: " . $e->getMessage());
            }
        } else {
            error_log("TCPDF: GD não disponível ou logo não encontrado - PDF sem logo");
        }
        
        // Criar estrutura do PDF
        // Objeto 1: Catalog (será definido depois)
        // Objeto 2: Pages
        $pages_num = $this->addObject("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
        error_log("TCPDF: Pages object = $pages_num");
        
        // Objeto 3: Page
        $resources = "<< /Font << /F1 4 0 R /F2 5 0 R >> ";
        if ($logo_data) {
            $resources .= "/XObject << /Logo 6 0 R >> ";
        }
        $resources .= ">>";
        
        $content_num = $logo_data ? 7 : 6;
        $page_num = $this->addObject(
            "<< /Type /Page /Parent $pages_num 0 R " .
            "/MediaBox [0 0 {$this->page_width} {$this->page_height}] " .
            "/Resources $resources " .
            "/Contents $content_num 0 R >>"
        );
        error_log("TCPDF: Page object = $page_num, content = $content_num");
        
        // Objeto 4: Font Helvetica
        $this->addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
        
        // Objeto 5: Font Helvetica-Bold
        $this->addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
        
        // Objeto 6: Logo (se existir)
        if ($logo_data) {
            $logo_len = strlen($logo_data);
            $this->addObject(
                "<< /Type /XObject /Subtype /Image " .
                "/Width $logo_width /Height $logo_height " .
                "/ColorSpace /DeviceRGB /BitsPerComponent 8 " .
                "/Filter /DCTDecode /Length $logo_len >>\n" .
                "stream\n$logo_data\nendstream"
            );
            error_log("TCPDF: Logo object criado");
        }
        
        // Criar conteúdo da página
        $stream = $this->createPageContent($dados, $logo_data ? ['w' => $logo_width, 'h' => $logo_height] : null);
        error_log("TCPDF: Content stream length = " . strlen($stream));
        
        // Objeto 7 (ou 6): Content stream
        $stream_len = strlen($stream);
        $this->addObject("<< /Length $stream_len >>\nstream\n$stream\nendstream");
        
        // Objeto 1: Catalog
        $this->objects[1] = "<< /Type /Catalog /Pages $pages_num 0 R >>";
        error_log("TCPDF: Total objects = " . count($this->objects));
        
        $xref_pos = strlen($this->pdf_content);
        $positions = [0 => 0];
        
        foreach ($this->objects as $num => $obj) {
            $positions[$num] = strlen($this->pdf_content);
            $this->pdf_content .= "$num 0 obj\n$obj\nendobj\n";
        }
        
        // Xref table
        $xref_start = strlen($this->pdf_content);
        $obj_count = count($this->objects) + 1;
        $this->pdf_content .= "xref\n0 $obj_count\n";
        $this->pdf_content .= "0000000000 65535 f \n";
        
        for ($i = 1; $i <= count($this->objects); $i++) {
            if (isset($positions[$i])) {
                $this->pdf_content .= sprintf("%010d 00000 n \n", $positions[$i]);
            }
        }
        
        $this->pdf_content .= "trailer\n<< /Size $obj_count /Root 1 0 R >>\n";
        $this->pdf_content .= "startxref\n$xref_start\n%%EOF";
        
        return $this->pdf_content;
    }
    
    private function createPageContent($dados, $logo) {
        $content = '';
        
        // Desenhar logo centralizado
        if ($logo) {
            $x = ($this->page_width - $logo['w']) / 2;
            $y = 760;
            $content .= "q\n{$logo['w']} 0 0 {$logo['h']} $x $y cm\n/Logo Do\nQ\n";
        }
        
        $y = $logo ? 735 : 780;
        
        // Linha decorativa superior
        $content .= "q\n0.831 0.686 0.216 RG\n3 w\n";
        $content .= "50 $y m 545 $y l S\nQ\n";
        
        $y -= 40;
        
        // Título principal - SOLICITAÇÃO DE ORÇAMENTO
        $content .= "BT\n/F2 20 Tf\n0.831 0.686 0.216 rg\n";
        $titulo1 = $this->escapeText("SOLICITAÇÃO DE ORÇAMENTO");
        $content .= "110 $y Td\n($titulo1) Tj\nET\n";
        
        $y -= 25;
        
        // Subtítulo - LOJA BRESSER
        $content .= "BT\n/F2 16 Tf\n0.831 0.686 0.216 rg\n";
        $titulo2 = $this->escapeText("LOJA BRESSER");
        $content .= "230 $y Td\n($titulo2) Tj\n0 0 0 rg\nET\n";
        
        $y -= 20;
        
        // Linha decorativa inferior
        $content .= "q\n0.831 0.686 0.216 RG\n2 w\n";
        $content .= "50 $y m 545 $y l S\nQ\n";
        
        $y -= 35;
        
        // Boxes com dados
        $sections = [
            'DADOS DO CLIENTE' => [
                'Nome' => $dados['nome'] ?? 'Não informado',
                'Telefone' => $dados['telefone'] ?? 'Não informado'
            ],
            'MEDIDAS DA PAREDE' => [
                'Largura' => $dados['largura'] ?? 'Não informado',
                'Altura' => $dados['altura'] ?? 'Não informado'
            ],
            'ESPECIFICAÇÕES' => [
                'Tipo de Tecido' => $dados['tecido'] ?? 'Não informado',
                'Tipo de Instalação' => $dados['instalacao'] ?? 'Não informado'
            ]
        ];
        
        foreach ($sections as $titulo => $campos) {
            $box_height = 70;
            $content .= $this->drawBox($y, $box_height, $titulo, $campos);
            $y -= ($box_height + 15);
        }
        
        // Endereço
        $endereco = $dados['endereco'] ?? 'Não informado';
        $linhas = $this->wordWrap($endereco, 60);
        $box_height = 50 + (count($linhas) * 16);
        $content .= $this->drawBox($y, $box_height, 'ENDEREÇO PARA INSTALAÇÃO', ['Endereço' => implode("\n", $linhas)]);
        $y -= ($box_height + 15);
        
        // Observações
        $obs = $dados['observacoes'] ?? 'Nenhuma observação';
        $linhas_obs = $this->wordWrap($obs, 60);
        $box_height = 50 + (count($linhas_obs) * 16);
        $content .= $this->drawBox($y, $box_height, 'OBSERVAÇÕES', ['Obs' => implode("\n", $linhas_obs)]);
        
        // Footer
        $content .= "q\n0.831 0.686 0.216 RG\n1 w\n50 60 m 545 60 l S\nQ\n";
        $content .= "BT\n/F1 8 Tf\n0.4 0.4 0.4 rg\n";
        $content .= "50 45 Td\n(" . $this->escapeText("Data/Hora: " . date('d/m/Y H:i:s')) . ") Tj\n";
        $content .= "0 -12 Td\n(" . $this->escapeText("Cortinas Bresser - www.cortinasbresser.com.br") . ") Tj\nET\n";
        
        return $content;
    }
    
    private function drawBox($y, $height, $titulo, $campos) {
        $content = '';
        
        // Fundo cinza
        $content .= "q\n0.95 0.95 0.95 rg\n60 " . ($y - $height) . " 475 $height re f\nQ\n";
        
        // Borda dourada
        $content .= "q\n0.831 0.686 0.216 RG\n1 w\n60 " . ($y - $height) . " 475 $height re S\nQ\n";
        
        // Título
        $content .= "BT\n/F2 12 Tf\n0.831 0.686 0.216 rg\n";
        $content .= "70 " . ($y - 20) . " Td\n(" . $this->escapeText($titulo) . ") Tj\n";
        $content .= "0 0 0 rg\n/F1 10 Tf\n";
        
        // Campos
        $offset = -25;
        foreach ($campos as $label => $value) {
            $lines = explode("\n", $value);
            foreach ($lines as $i => $line) {
                if ($i === 0 && $label !== 'Obs' && $label !== 'Endereço') {
                    $content .= "0 $offset Td\n(" . $this->escapeText("$label: $line") . ") Tj\n";
                } else {
                    $content .= "0 $offset Td\n(" . $this->escapeText($line) . ") Tj\n";
                }
                $offset = -15;
            }
        }
        
        $content .= "ET\n";
        return $content;
    }
    
    private function escapeText($text) {
        $text = iconv('UTF-8', 'ISO-8859-1//TRANSLIT//IGNORE', $text);
        $text = str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);
        return $text;
    }
    
    private function wordWrap($text, $width) {
        return explode("\n", wordwrap($text, $width, "\n", true));
    }
}
?>
