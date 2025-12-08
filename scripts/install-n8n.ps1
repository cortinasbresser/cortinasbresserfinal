# =====================================================
# Script de Instalação Automática - PowerShell
# N8N + WhatsApp - Cortinas Bresser
# =====================================================

# Configurar para parar em caso de erro
$ErrorActionPreference = "Stop"

# Função para imprimir mensagens coloridas
function Print-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

function Print-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Print-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Print-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# Banner
Write-Host @"
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🤖 N8N + WhatsApp - Cortinas Bresser               ║
║   Instalação Automatizada (Windows)                  ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
"@ -ForegroundColor Blue

# =====================================================
# 1. Verificar Pré-requisitos
# =====================================================

Print-Info "Verificando pré-requisitos..."

# Verificar Docker
try {
    docker --version | Out-Null
    Print-Success "Docker instalado"
} catch {
    Print-Error "Docker não está instalado!"
    Write-Host "Instale o Docker Desktop: https://docs.docker.com/desktop/install/windows-install/"
    exit 1
}

# Verificar Docker Compose
try {
    docker-compose --version | Out-Null
    Print-Success "Docker Compose instalado"
} catch {
    Print-Error "Docker Compose não está instalado!"
    Write-Host "Instale o Docker Desktop (inclui Docker Compose)"
    exit 1
}

# Verificar se Docker está rodando
try {
    docker info | Out-Null
    Print-Success "Docker está rodando"
} catch {
    Print-Error "Docker não está rodando!"
    Write-Host "Inicie o Docker Desktop e tente novamente"
    exit 1
}

# =====================================================
# 2. Configurar Variáveis de Ambiente
# =====================================================

Print-Info "Configurando variáveis de ambiente..."

if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Print-Success "Arquivo .env criado a partir do .env.example"
        
        # Gerar chave de criptografia
        Print-Info "Gerando chave de criptografia do N8N..."
        $EncryptionKey = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
        
        # Atualizar .env com a chave gerada
        $envContent = Get-Content ".env" -Raw
        $envContent = $envContent -replace "gere_uma_chave_aleatoria_de_32_caracteres", $EncryptionKey
        Set-Content ".env" $envContent -NoNewline
        
        Print-Success "Chave de criptografia gerada"
        
        Print-Warning "IMPORTANTE: Edite o arquivo .env e configure suas credenciais!"
        Print-Warning "Pressione ENTER quando terminar de editar o .env"
        Read-Host
    } else {
        Print-Error "Arquivo .env.example não encontrado!"
        exit 1
    }
} else {
    Print-Success "Arquivo .env já existe"
}

# =====================================================
# 3. Criar Diretórios Necessários
# =====================================================

Print-Info "Criando diretórios necessários..."

$directories = @("logs", "quotes", "n8n-backups", "database")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
    }
}

Print-Success "Diretórios criados"

# =====================================================
# 4. Verificar Portas Disponíveis
# =====================================================

Print-Info "Verificando portas disponíveis..."

function Test-Port {
    param([int]$Port)
    
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($connection) {
        Print-Error "Porta $Port já está em uso!"
        Write-Host "Libere a porta ou altere no docker-compose.yml"
        exit 1
    }
}

Test-Port 3000  # Next.js
Test-Port 5678  # N8N
Test-Port 8080  # Evolution API

Print-Success "Todas as portas estão disponíveis"

# =====================================================
# 5. Baixar Imagens Docker
# =====================================================

Print-Info "Baixando imagens Docker (isso pode demorar)..."

docker-compose pull

Print-Success "Imagens baixadas"

# =====================================================
# 6. Iniciar Serviços
# =====================================================

Print-Info "Iniciando serviços..."

docker-compose up -d

Print-Success "Serviços iniciados"

# =====================================================
# 7. Aguardar Serviços Ficarem Prontos
# =====================================================

Print-Info "Aguardando serviços ficarem prontos..."

# Função para verificar se serviço está pronto
function Wait-ForService {
    param(
        [string]$ServiceName,
        [string]$Url,
        [int]$MaxAttempts = 30
    )
    
    $attempt = 1
    while ($attempt -le $MaxAttempts) {
        try {
            $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
            if ($response.StatusCode -in @(200, 401, 302)) {
                Print-Success "$ServiceName está pronto"
                return $true
            }
        } catch {
            # Ignorar erros e tentar novamente
        }
        
        Write-Host "." -NoNewline
        Start-Sleep -Seconds 2
        $attempt++
    }
    
    Print-Error "$ServiceName não ficou pronto a tempo"
    return $false
}

# Aguardar PostgreSQL
Print-Info "Aguardando PostgreSQL..."
Start-Sleep -Seconds 10
Print-Success "PostgreSQL iniciado"

# Aguardar N8N
Print-Info "Aguardando N8N..."
Wait-ForService -ServiceName "N8N" -Url "http://localhost:5678"

# Aguardar Evolution API
Print-Info "Aguardando Evolution API..."
Wait-ForService -ServiceName "Evolution API" -Url "http://localhost:8080"

# =====================================================
# 8. Criar Banco de Dados
# =====================================================

Print-Info "Criando estrutura do banco de dados..."

if (Test-Path "database\setup-n8n.sql") {
    # Aguardar um pouco mais para garantir que o banco está pronto
    Start-Sleep -Seconds 5
    
    # Criar database evolution
    try {
        docker exec -i cortinasbresser-postgres psql -U n8n -d postgres -c "CREATE DATABASE evolution;" 2>$null
    } catch {
        # Ignorar se já existe
    }
    
    # Executar script SQL
    Get-Content "database\setup-n8n.sql" | docker exec -i cortinasbresser-postgres psql -U n8n -d evolution
    
    Print-Success "Banco de dados criado"
} else {
    Print-Warning "Script SQL não encontrado. Pule esta etapa se não for necessário."
}

# =====================================================
# 9. Exibir Informações de Acesso
# =====================================================

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                       ║" -ForegroundColor Green
Write-Host "║   ✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO!               ║" -ForegroundColor Green
Write-Host "║                                                       ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Print-Info "Acesse os serviços:"
Write-Host ""
Write-Host "  🌐 N8N:" -ForegroundColor Blue
Write-Host "     http://localhost:5678"
Write-Host "     Usuário: admin (conforme .env)"
Write-Host "     Senha: (conforme .env)"
Write-Host ""
Write-Host "  📱 Evolution API:" -ForegroundColor Blue
Write-Host "     http://localhost:8080"
Write-Host ""
Write-Host "  🖥️  Next.js:" -ForegroundColor Blue
Write-Host "     http://localhost:3000"
Write-Host ""

Print-Info "Próximos passos:"
Write-Host ""
Write-Host "  1. Acesse o N8N e faça login"
Write-Host "  2. Importe o workflow: n8n-workflows/atendimento-whatsapp.json"
Write-Host "  3. Configure as credenciais (SMTP, PostgreSQL)"
Write-Host "  4. Acesse a Evolution API e conecte o WhatsApp (QR Code)"
Write-Host "  5. Configure o webhook na Evolution API"
Write-Host "  6. Ative o workflow no N8N"
Write-Host "  7. Teste enviando uma mensagem para o WhatsApp"
Write-Host ""

Print-Info "Comandos úteis:"
Write-Host ""
Write-Host "  Ver logs:        docker-compose logs -f"
Write-Host "  Parar serviços:  docker-compose down"
Write-Host "  Reiniciar:       docker-compose restart"
Write-Host "  Status:          docker-compose ps"
Write-Host ""

Print-Info "Documentação:"
Write-Host ""
Write-Host "  📖 Guia Completo:  Get-Content N8N-WHATSAPP-SETUP.md"
Write-Host "  ⚡ Guia Rápido:    Get-Content N8N-QUICKSTART.md"
Write-Host "  📋 README:         Get-Content N8N-README.md"
Write-Host ""

Print-Success "Boa sorte! 🚀"
Write-Host ""

# =====================================================
# 10. Verificar Status Final
# =====================================================

Print-Info "Status dos containers:"
docker-compose ps

Write-Host ""
Print-Info "Instalação finalizada em $(Get-Date)"

# Perguntar se quer abrir o navegador
Write-Host ""
$openBrowser = Read-Host "Deseja abrir o N8N no navegador agora? (S/N)"
if ($openBrowser -eq "S" -or $openBrowser -eq "s") {
    Start-Process "http://localhost:5678"
}
