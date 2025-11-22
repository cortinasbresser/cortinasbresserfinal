# Script PowerShell para Deploy FTP - Locaweb
# Alternativa nativa do Windows (não requer Node.js)

param(
    [string]$EnvFile = ".env"
)

# Cores para output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Cyan "`n🚀 Deploy FTP para Locaweb - PowerShell"
Write-ColorOutput Cyan ("=" * 50)

# Carregar variáveis do .env
if (-not (Test-Path $EnvFile)) {
    Write-ColorOutput Red "`n❌ Erro: Arquivo $EnvFile não encontrado!"
    Write-ColorOutput Yellow "Crie um arquivo .env baseado no .env.example"
    exit 1
}

Write-ColorOutput Yellow "`n📋 Carregando configurações..."

$envVars = @{}
Get-Content $EnvFile | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        $envVars[$key] = $value
    }
}

$FTP_HOST = $envVars['FTP_HOST']
$FTP_USER = $envVars['FTP_USER']
$FTP_PASSWORD = $envVars['FTP_PASSWORD']
$FTP_REMOTE_PATH = $envVars['FTP_REMOTE_PATH']
$BUILD_DIR = $envVars['NEXT_PUBLIC_BUILD_OUTPUT']

if (-not $BUILD_DIR) { $BUILD_DIR = "out" }
if (-not $FTP_REMOTE_PATH) { $FTP_REMOTE_PATH = "/public_html" }

# Validar configuração
if (-not $FTP_HOST -or -not $FTP_USER -or -not $FTP_PASSWORD) {
    Write-ColorOutput Red "`n❌ Erro: Credenciais FTP não configuradas!"
    Write-ColorOutput Yellow "Configure FTP_HOST, FTP_USER e FTP_PASSWORD no arquivo .env"
    exit 1
}

if (-not (Test-Path $BUILD_DIR)) {
    Write-ColorOutput Red "`n❌ Erro: Diretório de build '$BUILD_DIR' não encontrado!"
    Write-ColorOutput Yellow "Execute 'npm run build' antes de fazer o deploy"
    exit 1
}

Write-ColorOutput Green "✅ Configuração carregada"
Write-ColorOutput Blue "  Host: $FTP_HOST"
Write-ColorOutput Blue "  Usuário: $FTP_USER"
Write-ColorOutput Blue "  Diretório local: $BUILD_DIR"
Write-ColorOutput Blue "  Diretório remoto: $FTP_REMOTE_PATH"

# Função para upload FTP
function Upload-FtpFile {
    param(
        [string]$LocalFile,
        [string]$RemoteFile,
        [string]$FtpHost,
        [string]$Username,
        [string]$Password
    )
    
    try {
        $ftpUri = "ftp://$FtpHost$RemoteFile"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($Username, $Password)
        $ftpRequest.UseBinary = $true
        $ftpRequest.KeepAlive = $false
        
        $fileContent = [System.IO.File]::ReadAllBytes($LocalFile)
        $ftpRequest.ContentLength = $fileContent.Length
        
        $requestStream = $ftpRequest.GetRequestStream()
        $requestStream.Write($fileContent, 0, $fileContent.Length)
        $requestStream.Close()
        
        $response = $ftpRequest.GetResponse()
        $response.Close()
        
        return $true
    }
    catch {
        Write-ColorOutput Red "  ❌ Erro: $_"
        return $false
    }
}

# Criar diretório FTP
function Create-FtpDirectory {
    param(
        [string]$RemoteDir,
        [string]$FtpHost,
        [string]$Username,
        [string]$Password
    )
    
    try {
        $ftpUri = "ftp://$FtpHost$RemoteDir"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($Username, $Password)
        
        $response = $ftpRequest.GetResponse()
        $response.Close()
        return $true
    }
    catch {
        # Diretório pode já existir
        return $false
    }
}

Write-ColorOutput Yellow "`n📤 Iniciando upload dos arquivos..."

$files = Get-ChildItem -Path $BUILD_DIR -Recurse -File
$totalFiles = $files.Count
$uploadedFiles = 0
$failedFiles = 0

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Resolve-Path $BUILD_DIR).Path.Length)
    $remotePath = "$FTP_REMOTE_PATH$($relativePath.Replace('\', '/'))"
    
    # Criar diretório remoto se necessário
    $remoteDir = Split-Path $remotePath -Parent
    if ($remoteDir -ne $FTP_REMOTE_PATH) {
        Create-FtpDirectory -RemoteDir $remoteDir -FtpHost $FTP_HOST -Username $FTP_USER -Password $FTP_PASSWORD | Out-Null
    }
    
    Write-Host -NoNewline "  ⏳ $relativePath..."
    
    if (Upload-FtpFile -LocalFile $file.FullName -RemoteFile $remotePath -FtpHost $FTP_HOST -Username $FTP_USER -Password $FTP_PASSWORD) {
        Write-Host "`r  ✅ $relativePath" -ForegroundColor Green
        $uploadedFiles++
    }
    else {
        Write-Host "`r  ❌ $relativePath" -ForegroundColor Red
        $failedFiles++
    }
}

Write-ColorOutput Cyan ("`n" + ("=" * 50))

if ($failedFiles -eq 0) {
    Write-ColorOutput Green "✅ Deploy concluído com sucesso! 🎉"
    Write-ColorOutput Blue "📊 $uploadedFiles/$totalFiles arquivos enviados"
}
else {
    Write-ColorOutput Yellow "⚠️  Deploy concluído com avisos"
    Write-ColorOutput Blue "📊 $uploadedFiles/$totalFiles arquivos enviados"
    Write-ColorOutput Red "❌ $failedFiles arquivo(s) falharam"
}

Write-ColorOutput Cyan "`n🌐 Seu site deve estar disponível em breve!`n"
