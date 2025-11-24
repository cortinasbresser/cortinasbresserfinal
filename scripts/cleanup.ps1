# Script de Limpeza e Otimização do Projeto
# Cortinas Bresser - 24/11/2025

Write-Host "🧹 Limpeza e Otimização do Projeto Cortinas Bresser" -ForegroundColor Cyan
Write-Host ""

$removed = 0
$errors = 0

# Função para remover arquivo com segurança
function Remove-SafeFile {
    param($file)
    if (Test-Path $file) {
        try {
            Remove-Item $file -Force
            Write-Host "✅ Removido: $file" -ForegroundColor Green
            return 1
        } catch {
            Write-Host "❌ Erro ao remover: $file" -ForegroundColor Red
            return 0
        }
    }
    return 0
}

# Função para remover diretório com segurança
function Remove-SafeDir {
    param($dir)
    if (Test-Path $dir) {
        try {
            Remove-Item $dir -Recurse -Force
            Write-Host "✅ Removido diretório: $dir" -ForegroundColor Green
            return 1
        } catch {
            Write-Host "❌ Erro ao remover diretório: $dir" -ForegroundColor Red
            return 0
        }
    }
    return 0
}

Write-Host "📄 Removendo documentação redundante..." -ForegroundColor Yellow

# Documentação Locaweb (não usada)
$removed += Remove-SafeFile "CHECKLIST-DEPLOY.md"
$removed += Remove-SafeFile "LEIA-ME-PRIMEIRO.txt"
$removed += Remove-SafeFile "LOCAWEB-DEPLOY.md"
$removed += Remove-SafeFile "LOCAWEB-QUICKSTART.md"
$removed += Remove-SafeFile "PRONTO-PARA-LOCAWEB.md"

# Documentação de outros serviços (não usados)
$removed += Remove-SafeFile "NETLIFY-DEPLOY.md"
$removed += Remove-SafeFile "VERCEL-DEPLOY.md"

# Documentação duplicada
$removed += Remove-SafeFile "CONFIGURAR-DOMINIO.md"
$removed += Remove-SafeFile "DOMAIN-SETUP.md"
$removed += Remove-SafeFile "DEPLOY-GUIDE.md"
$removed += Remove-SafeFile "DEPLOY-WEB.md"
$removed += Remove-SafeFile "DEPLOY.md"
$removed += Remove-SafeFile "QUICKSTART.md"

# Documentação histórica/temporária
$removed += Remove-SafeFile "CORRECTIONS.md"
$removed += Remove-SafeFile "CSS-MIGRATION.md"
$removed += Remove-SafeFile "DOCKER-FIXES.md"
$removed += Remove-SafeFile "EASYPANEL-FIX-GUIDE.md"
$removed += Remove-SafeFile "ELEGANT-UPDATE.md"
$removed += Remove-SafeFile "FINAL-SUMMARY.md"
$removed += Remove-SafeFile "FORM-EFFECTS.md"
$removed += Remove-SafeFile "GITHUB-AUTH.md"
$removed += Remove-SafeFile "IMAGE-SPECS.md"
$removed += Remove-SafeFile "IMPLEMENTATION-SUMMARY.md"
$removed += Remove-SafeFile "MIGRATION-COMPLETE.md"
$removed += Remove-SafeFile "PREMIUM-IMPROVEMENTS.md"
$removed += Remove-SafeFile "PROJECT-STRUCTURE.txt"
$removed += Remove-SafeFile "PROJECT_SUMMARY.md"
$removed += Remove-SafeFile "RESPONSIVE.md"
$removed += Remove-SafeFile "SETUP-SUMMARY.md"

Write-Host ""
Write-Host "🔧 Removendo scripts antigos..." -ForegroundColor Yellow

# Scripts FTP/Locaweb
$removed += Remove-SafeFile "scripts/deploy-ftp-sync.js"
$removed += Remove-SafeFile "scripts/deploy-ftp.js"
$removed += Remove-SafeFile "scripts/deploy-ftp.ps1"
$removed += Remove-SafeFile "scripts/deploy-locaweb.js"
$removed += Remove-SafeFile "scripts/test-ftp.js"

Write-Host ""
Write-Host "⚙️ Removendo configs antigos..." -ForegroundColor Yellow

# Configs desnecessários
$removed += Remove-SafeFile ".env.locaweb"
$removed += Remove-SafeFile ".htaccess"
$removed += Remove-SafeFile "netlify.toml"
$removed += Remove-SafeFile "next.config.docker.mjs"
$removed += Remove-SafeFile "ecosystem.config.js"

Write-Host ""
Write-Host "📁 Removendo diretórios desnecessários..." -ForegroundColor Yellow

# Diretórios antigos
$removed += Remove-SafeDir ".netlify"
$removed += Remove-SafeDir "out"

# Verificar se diretórios estão vazios antes de remover
if (Test-Path "crm-system") {
    $items = Get-ChildItem "crm-system" -Recurse
    if ($items.Count -eq 0) {
        $removed += Remove-SafeDir "crm-system"
    }
}

if (Test-Path "frontend") {
    $items = Get-ChildItem "frontend" -Recurse
    if ($items.Count -eq 0) {
        $removed += Remove-SafeDir "frontend"
    }
}

if (Test-Path "current") {
    Write-Host "⚠️  Diretório 'current' encontrado - verifique manualmente" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎨 Limpando caches e builds..." -ForegroundColor Yellow

# Limpar cache Next.js
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Cache Next.js limpo"
}

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Limpeza Concluída!" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Resumo:" -ForegroundColor Yellow
Write-Host "   - Arquivos removidos: $removed" -ForegroundColor White
Write-Host "   - Erros: $errors" -ForegroundColor White
Write-Host ""
Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
Write-Host "   1. Verifique se tudo está OK" -ForegroundColor White
Write-Host "   2. Teste o app: npm run dev" -ForegroundColor White
Write-Host "   3. Faça commit: git add . && git commit -m 'Clean up project'" -ForegroundColor White
Write-Host "   4. Push: git push" -ForegroundColor White
Write-Host ""
