# Script de Limpeza e Reinstalação
# Use este script se encontrar problemas com node_modules ou build

Write-Host "`n🧹 Limpando projeto..." -ForegroundColor Cyan

# Remover node_modules
if (Test-Path "node_modules") {
    Write-Host "  Removendo node_modules..." -ForegroundColor Yellow
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  ✅ node_modules removido" -ForegroundColor Green
}

# Remover .next
if (Test-Path ".next") {
    Write-Host "  Removendo .next..." -ForegroundColor Yellow
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  ✅ .next removido" -ForegroundColor Green
}

# Remover out
if (Test-Path "out") {
    Write-Host "  Removendo out..." -ForegroundColor Yellow
    Remove-Item -Path "out" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  ✅ out removido" -ForegroundColor Green
}

# Remover cache de deploy
if (Test-Path "scripts/.deploy-cache.json") {
    Write-Host "  Removendo cache de deploy..." -ForegroundColor Yellow
    Remove-Item -Path "scripts/.deploy-cache.json" -Force -ErrorAction SilentlyContinue
    Write-Host "  ✅ Cache removido" -ForegroundColor Green
}

Write-Host "`n📦 Reinstalando dependências..." -ForegroundColor Cyan
npm install

Write-Host "`n✅ Limpeza concluída!" -ForegroundColor Green
Write-Host "`nPróximos passos:" -ForegroundColor Cyan
Write-Host "  1. npm run build" -ForegroundColor Blue
Write-Host "  2. npm run test:ftp" -ForegroundColor Blue
Write-Host "  3. npm run deploy:sync`n" -ForegroundColor Blue
