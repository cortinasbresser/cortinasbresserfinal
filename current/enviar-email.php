<?php
// enviar-email-phpmailer.php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Classe PHPMailer simplificada inline
class SimpleMailer {
    private $smtp_host;
    private $smtp_port;
    private $smtp_user;
    private $smtp_pass;
    private $from_email;
    private $from_name;
    private $to_email;
    private $subject;
    private $body_text;
    private $body_html;
    private $attachments = [];
    
    public function __construct($host, $port, $user, $pass) {
        $this->smtp_host = $host;
        $this->smtp_port = $port;
        $this->smtp_user = $user;
        $this->smtp_pass = $pass;
    }
    
    public function setFrom($email, $name = '') {
        $this->from_email = $email;
        $this->from_name = $name;
    }
    
    public function addAddress($email) {
        $this->to_email = $email;
    }
    
    public function setSubject($subject) {
        $this->subject = $subject;
    }
    
    public function setBodyText($text) {
        $this->body_text = $text;
    }
    
    public function setBodyHTML($html) {
        $this->body_html = $html;
    }
    
    public function addAttachment($content, $filename) {
        $this->attachments[] = [
            'content' => $content,
            'filename' => $filename
        ];
    }
    
    public function send() {
        // Tentar multiplas configuracoes SMTP
        $configs = [
            ['type' => 'ssl', 'port' => 465],
            ['type' => 'tls', 'port' => 587],
            ['type' => 'tcp', 'port' => 25]
        ];
        
        foreach ($configs as $config) {
            try {
                error_log("Tentando {$config['type']}:{$config['port']}");
                
                $socket = null;
                
                if ($config['type'] === 'ssl') {
                    // SSL direto (porta 465)
                    $socket = @stream_socket_client(
                        "ssl://{$this->smtp_host}:{$config['port']}",
                        $errno,
                        $errstr,
                        30,
                        STREAM_CLIENT_CONNECT,
                        stream_context_create([
                            'ssl' => [
                                'verify_peer' => false,
                                'verify_peer_name' => false,
                                'allow_self_signed' => true
                            ]
                        ])
                    );
                } else {
                    // Conexao normal (para STARTTLS ou sem criptografia)
                    $socket = @stream_socket_client(
                        "tcp://{$this->smtp_host}:{$config['port']}",
                        $errno,
                        $errstr,
                        30
                    );
                }
                
                if (!$socket) {
                    error_log("Falha ao conectar {$config['type']}:{$config['port']} - $errstr ($errno)");
                    continue;
                }
                
                // Tentar enviar com esta configuracao
                $resultado = $this->enviarComSocket($socket, $config['type']);
                
                if ($resultado) {
                    error_log("Sucesso com {$config['type']}:{$config['port']}");
                    return true;
                }
                
            } catch (Exception $e) {
                error_log("Erro com {$config['type']}:{$config['port']}: " . $e->getMessage());
                continue;
            }
        }
        
        error_log("Todas as tentativas de envio falharam");
        return false;
    }
    
    private function enviarComSocket($socket, $type) {
        try {
            // Ler banner
            $banner = $this->getResponse($socket);
            error_log("Banner: $banner");
            
            // EHLO
            fwrite($socket, "EHLO {$this->smtp_host}\r\n");
            $ehlo_resp = $this->getResponse($socket);
            error_log("EHLO: $ehlo_resp");
            
            // Se for TLS, fazer STARTTLS
            if ($type === 'tls') {
                fwrite($socket, "STARTTLS\r\n");
                $tls_resp = $this->getResponse($socket);
                error_log("STARTTLS: $tls_resp");
                
                if (strpos($tls_resp, '220') !== false) {
                    stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
                    
                    // Reenviar EHLO apos STARTTLS
                    fwrite($socket, "EHLO {$this->smtp_host}\r\n");
                    $this->getResponse($socket);
                }
            }
            
            // AUTH LOGIN
            fwrite($socket, "AUTH LOGIN\r\n");
            $auth_resp = $this->getResponse($socket);
            error_log("AUTH: $auth_resp");
            
            fwrite($socket, base64_encode($this->smtp_user) . "\r\n");
            $user_resp = $this->getResponse($socket);
            error_log("USER: $user_resp");
            
            fwrite($socket, base64_encode($this->smtp_pass) . "\r\n");
            $pass_resp = $this->getResponse($socket);
            error_log("PASS: $pass_resp");
            
            if (strpos($pass_resp, '235') === false) {
                error_log("Falha na autenticacao");
                fclose($socket);
                return false;
            }
            // MAIL FROM
            fwrite($socket, "MAIL FROM:<{$this->from_email}>\r\n");
            $from_resp = $this->getResponse($socket);
            error_log("MAIL FROM: $from_resp");
            
            // RCPT TO
            fwrite($socket, "RCPT TO:<{$this->to_email}>\r\n");
            $rcpt_resp = $this->getResponse($socket);
            error_log("RCPT TO: $rcpt_resp");
            
            // DATA
            fwrite($socket, "DATA\r\n");
            $data_resp = $this->getResponse($socket);
            error_log("DATA: $data_resp");
            
            // Construir mensagem
            $boundary = md5(uniqid(time()));
            
            $message = "From: {$this->from_email}\r\n";
            $message .= "To: {$this->to_email}\r\n";
            $message .= "Subject: {$this->subject}\r\n";
            $message .= "MIME-Version: 1.0\r\n";
            $message .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";
            $message .= "Date: " . date('r') . "\r\n\r\n";
            
            // Texto
            $message .= "--{$boundary}\r\n";
            $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
            $message .= $this->body_text . "\r\n\r\n";
            
            // HTML
            if ($this->body_html) {
                $message .= "--{$boundary}\r\n";
                $message .= "Content-Type: text/html; charset=UTF-8\r\n";
                $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
                $message .= $this->body_html . "\r\n\r\n";
            }
            
            // Anexos
            foreach ($this->attachments as $att) {
                $message .= "--{$boundary}\r\n";
                $message .= "Content-Type: application/pdf; name=\"{$att['filename']}\"\r\n";
                $message .= "Content-Transfer-Encoding: base64\r\n";
                $message .= "Content-Disposition: attachment; filename=\"{$att['filename']}\"\r\n\r\n";
                $message .= chunk_split(base64_encode($att['content'])) . "\r\n";
            }
            
            $message .= "--{$boundary}--\r\n";
            // Enviar mensagem
            fwrite($socket, $message . "\r\n.\r\n");
            $send_resp = $this->getResponse($socket);
            error_log("SEND: $send_resp");
            
            // QUIT
            fwrite($socket, "QUIT\r\n");
            fclose($socket);
            
            return (strpos($send_resp, '250') !== false);
            
        } catch (Exception $e) {
            error_log("Erro no envio: " . $e->getMessage());
            if (isset($socket) && $socket) {
                fclose($socket);
            }
            return false;
        }
    }
    
    private function getResponse($socket) {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) == ' ') {
                break;
            }
        }
        return $response;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Receber dados
        $input = file_get_contents('php://input');
        $dados = json_decode($input, true);
        
        if (!$dados || empty($dados['nome']) || empty($dados['telefone'])) {
            throw new Exception('Dados incompletos');
        }
        
        // Criar corpo do email em texto
        $corpo_texto = "
NOVO ORÇAMENTO RECEBIDO
==================================================

DADOS DO CLIENTE:
Nome: " . ($dados['nome'] ?? 'Nao informado') . "
Telefone: " . ($dados['telefone'] ?? 'Nao informado') . "

MEDIDAS DA PAREDE:
Largura: " . ($dados['paredeLargura'] ?? 'Nao informado') . " m
Altura: " . ($dados['paredeAltura'] ?? 'Nao informado') . " m

ESPECIFICACOES:
Tecido: " . ($dados['tecido'] ?? 'Nao informado') . "
Instalacao: " . ($dados['instalacao'] ?? 'Nao informado') . "

ENDERECO PARA INSTALACAO:
" . ($dados['endereco'] ?? 'Nao informado') . "

OBSERVACOES:
" . ($dados['observacoes'] ?? 'Nenhuma observacao') . "

==================================================
Data/Hora: " . date('d/m/Y H:i:s') . "
Via: Site Cortinas Bresser
==================================================
";

        // Criar corpo HTML
        $corpo_html = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f4f4f4; }
        .container { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; }
        h1 { color: #d4af37; text-align: center; margin-bottom: 10px; }
        h2 { color: #666; text-align: center; font-size: 18px; margin-top: 0; }
        .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #d4af37; }
        .section h3 { color: #333; margin-top: 0; font-size: 16px; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; margin-left: 10px; }
        .footer { margin-top: 30px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
    </style>
</head>
<body>
    <div class='container'>
        <h1>CORTINAS BRESSER</h1>
        <h2>Solicitação de Orçamento</h2>
        
        <div class='section'>
            <h3>DADOS DO CLIENTE</h3>
            <p><span class='label'>Nome:</span> <span class='value'>" . htmlspecialchars($dados['nome'] ?? 'Não informado') . "</span></p>
            <p><span class='label'>Telefone:</span> <span class='value'>" . htmlspecialchars($dados['telefone'] ?? 'Não informado') . "</span></p>
        </div>
        
        <div class='section'>
            <h3>MEDIDAS DA PAREDE</h3>
            <p><span class='label'>Largura:</span> <span class='value'>" . htmlspecialchars($dados['paredeLargura'] ?? 'Não informado') . " metros</span></p>
            <p><span class='label'>Altura:</span> <span class='value'>" . htmlspecialchars($dados['paredeAltura'] ?? 'Não informado') . " metros</span></p>
        </div>
        
        <div class='section'>
            <h3>ESPECIFICAÇÕES</h3>
            <p><span class='label'>Tipo de Tecido:</span> <span class='value'>" . htmlspecialchars($dados['tecido'] ?? 'Não informado') . "</span></p>
            <p><span class='label'>Tipo de Instalação:</span> <span class='value'>" . htmlspecialchars($dados['instalacao'] ?? 'Não informado') . "</span></p>
        </div>
        
        <div class='section'>
            <h3>ENDEREÇO PARA INSTALAÇÃO</h3>
            <p>" . nl2br(htmlspecialchars($dados['endereco'] ?? 'Não informado')) . "</p>
        </div>
        
        <div class='section'>
            <h3>OBSERVAÇÕES</h3>
            <p>" . nl2br(htmlspecialchars($dados['observacoes'] ?? 'Nenhuma observação')) . "</p>
        </div>
        
        <div class='footer'>
            <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
            <p>Enviado via Site Cortinas Bresser<br>www.cortinasbresser.com.br</p>
        </div>
    </div>
</body>
</html>";

        // Gerar PDF
        require_once(__DIR__ . '/gerar-pdf.php');
        $pdf_content = gerarPDFProfissional($dados);
        $pdf_nome = "Orcamento_" . preg_replace('/[^a-zA-Z0-9]/', '_', $dados['nome']) . "_" . date('Ymd_His') . ".pdf";
        
        // Configurar e enviar email
        $mailer = new SimpleMailer(
            'mail.cronos-painel.com',
            465,
            'vendas@cortinasbresser.com.br',
            '3fdgkMPeARzHEYD@'
        );
        
        $mailer->setFrom('vendas@cortinasbresser.com.br', 'Cortinas Bresser');
        $mailer->addAddress('vendas@cortinasbresser.com.br');
        $mailer->setSubject('Novo Orçamento - ' . $dados['nome']);
        $mailer->setBodyText($corpo_texto);
        $mailer->setBodyHTML($corpo_html);
        $mailer->addAttachment($pdf_content, $pdf_nome);
        
        $enviado = $mailer->send();
        
        if ($enviado) {
            // Salvar PDF para envio via WhatsApp
            $pdfDir = __DIR__ . '/temp_pdfs';
            if (!is_dir($pdfDir)) {
                @mkdir($pdfDir, 0755, true);
            }
            $pdf_file_path = $pdfDir . '/' . $pdf_nome;
            @file_put_contents($pdf_file_path, $pdf_content);
            
            // Gerar URL do PDF
            $pdf_url = 'https://www.cortinasbresser.com.br/temp_pdfs/' . $pdf_nome;
            
            // Salvar backup
            $logDir = __DIR__ . '/logs';
            if (!is_dir($logDir)) {
                @mkdir($logDir, 0755, true);
            }
            $logFile = $logDir . '/orcamentos_' . date('Y-m') . '.txt';
            @file_put_contents($logFile, "\n" . date('d/m/Y H:i:s') . " - Email enviado\n" . $corpo_texto . "\n", FILE_APPEND);
            
            error_log("Email enviado com sucesso via SimpleMailer");
            echo json_encode([
                'status' => 'success', 
                'message' => 'Email enviado com sucesso',
                'pdf_url' => $pdf_url,
                'pdf_nome' => $pdf_nome
            ]);
        } else {
            throw new Exception('Falha no envio do email');
        }
        
    } catch (Exception $e) {
        error_log("Erro: " . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Erro: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido']);
}
?>
