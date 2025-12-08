# ============================================
# Script de Inicialização N8N + WhatsApp
# Cortinas Bresser
# ============================================

Write-Host "🚀 Iniciando N8N + WhatsApp Automation..." -ForegroundColor Cyan
Write-Host ""

# Verificar se Docker está rodando
Write-Host "📋 Passo 1: Verificando Docker..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✅ Docker está rodando!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Docker não está rodando!" -ForegroundColor Red
    Write-Host "   Por favor, inicie o Docker Desktop e tente novamente." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Verificar se .env existe
Write-Host "📋 Passo 2: Verificando arquivo .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ Arquivo .env encontrado!" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Arquivo .env não encontrado. Criando a partir do .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Arquivo .env criado!" -ForegroundColor Green
    Write-Host "⚠️  IMPORTANTE: Edite o arquivo .env com suas credenciais antes de continuar!" -ForegroundColor Red
    Write-Host "   Pressione qualquer tecla para continuar após editar o .env..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

Write-Host ""

# Parar containers existentes
Write-Host "📋 Passo 3: Parando containers existentes (se houver)..." -ForegroundColor Yellow
docker-compose down 2>$null
Write-Host "✅ Containers parados!" -ForegroundColor Green

Write-Host ""

# Subir PostgreSQL primeiro
Write-Host "📋 Passo 4: Iniciando PostgreSQL..." -ForegroundColor Yellow
docker-compose up -d postgres
Write-Host "⏳ Aguardando PostgreSQL iniciar (20 segundos)..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

# Verificar se PostgreSQL está rodando
$postgresStatus = docker-compose ps postgres --format json | ConvertFrom-Json
if ($postgresStatus.State -eq "running") {
    Write-Host "✅ PostgreSQL iniciado com sucesso!" -ForegroundColor Green
}
else {
    Write-Host "❌ Erro ao iniciar PostgreSQL!" -ForegroundColor Red
    Write-Host "   Executando logs para diagnóstico:" -ForegroundColor Yellow
    docker-compose logs postgres
    exit 1
}

Write-Host ""

# Criar banco de dados evolution (se não existir)
Write-Host "📋 Passo 5: Criando banco de dados 'evolution'..." -ForegroundColor Yellow
docker-compose exec -T postgres psql -U n8n -d postgres -c "CREATE DATABASE evolution;" 2>$null
Write-Host "✅ Banco 'evolution' verificado!" -ForegroundColor Green

Write-Host ""

# Executar script SQL de setup (se existir)
if (Test-Path "database/setup-n8n.sql") {
    Write-Host "📋 Passo 6: Executando script de setup do banco de dados..." -ForegroundColor Yellow
    Get-Content "database/setup-n8n.sql" | docker-compose exec -T postgres psql -U n8n -d n8n
    Write-Host "✅ Script SQL executado com sucesso!" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Script database/setup-n8n.sql não encontrado. Pulando..." -ForegroundColor Yellow
}

Write-Host ""

# Subir Redis
Write-Host "📋 Passo 7: Iniciando Redis..." -ForegroundColor Yellow
docker-compose up -d redis
Start-Sleep -Seconds 5
Write-Host "✅ Redis iniciado!" -ForegroundColor Green

Write-Host ""

# Subir N8N
Write-Host "📋 Passo 8: Iniciando N8N..." -ForegroundColor Yellow
docker-compose up -d n8n
Start-Sleep -Seconds 10
Write-Host "✅ N8N iniciado!" -ForegroundColor Green

Write-Host ""

# Subir Evolution API
Write-Host "📋 Passo 9: Iniciando Evolution API..." -ForegroundColor Yellow
docker-compose up -d evolution-api
Start-Sleep -Seconds 10
Write-Host "✅ Evolution API iniciada!" -ForegroundColor Green

Write-Host ""

# Subir N8N Worker
Write-Host "📋 Passo 10: Iniciando N8N Worker..." -ForegroundColor Yellow
docker-compose up -d n8n-worker
Start-Sleep -Seconds 5
Write-Host "✅ N8N Worker iniciado!" -ForegroundColor Green

Write-Host ""

# Verificar status de todos os containers
Write-Host "📋 Passo 11: Verificando status dos containers..." -ForegroundColor Yellow
Write-Host ""
docker-compose ps

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "🎉 INSTALAÇÃO CONCLUÍDA COM SUCESSO!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Próximos passos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Acesse o N8N:" -ForegroundColor White
Write-Host "   🌐 http://localhost:5678" -ForegroundColor Cyan
Write-Host "   👤 Usuário: admin" -ForegroundColor Gray
Write-Host "   🔑 Senha: (conforme configurado no .env)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Acesse a Evolution API:" -ForegroundColor White
Write-Host "   🌐 http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Importe o workflow:" -ForegroundColor White
Write-Host "   📁 n8n-workflows/atendimento-whatsapp.json" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Conecte o WhatsApp:" -ForegroundColor White
Write-Host "   📱 Escaneie o QR Code na Evolution API" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Ative o workflow no N8N" -ForegroundColor White
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Documentação completa:" -ForegroundColor Yellow
Write-Host "   - PASSO-A-PASSO-N8N.md" -ForegroundColor Gray
Write-Host "   - N8N-QUICKSTART.md" -ForegroundColor Gray
Write-Host "   - N8N-README.md" -ForegroundColor Gray
Write-Host ""
Write-Host "🆘 Problemas? Execute:" -ForegroundColor Yellow
Write-Host "   docker-compose logs [nome-do-serviço]" -ForegroundColor Gray
Write-Host ""
Write-Host "✨ Pronto para revolucionar seu atendimento! ✨" -ForegroundColor Green
Write-Host ""
