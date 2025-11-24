# 🚀 Deploy na Locaweb (Host Compartilhado)

Este guia ensina como hospedar seu projeto Next.js em um **host compartilhado da Locaweb**.

## 📋 Pré-requisitos

- Conta de hospedagem compartilhada na Locaweb
- Acesso FTP (host, usuário e senha)
- Node.js instalado localmente (para fazer o build)

## 🔧 Passos para Deploy

### 1️⃣ Build do Projeto (Localmente)

Execute o comando para gerar os arquivos estáticos:

```bash
npm run build
```

Este comando irá:
- Compilar todo o código TypeScript/React
- Otimizar imagens e assets
- Gerar arquivos HTML, CSS e JS estáticos
- Criar a pasta `out` com todos os arquivos prontos para upload

### 2️⃣ Arquivos Gerados

Após o build, você terá uma pasta `out` com a seguinte estrutura:

```
out/
├── index.html          # Página principal
├── _next/             # Assets otimizados (CSS, JS, etc)
├── images/            # Imagens otimizadas
└── ...outros arquivos
```

### 3️⃣ Upload via FTP

#### Opção A: Usando Cliente FTP (FileZilla)

1. **Baixe o FileZilla**: https://filezilla-project.org/
2. **Configure a conexão**:
   - Host: `ftp.seudominio.com.br` (fornecido pela Locaweb)
   - Usuário: seu usuário FTP
   - Senha: sua senha FTP
   - Porta: 21
3. **Conecte-se ao servidor**
4. **Navegue até a pasta pública**:
   - Geralmente é `public_html` ou `www`
5. **Faça upload de TODOS os arquivos** da pasta `out` para dentro de `public_html`

#### Opção B: Usando Script Automático (FTP)

Se você tiver as credenciais FTP configuradas:

1. **Crie o arquivo `.env`** (se não existir) com:

```env
FTP_HOST=ftp.seudominio.com.br
FTP_USER=seu_usuario_ftp
FTP_PASSWORD=sua_senha_ftp
FTP_REMOTE_PATH=/public_html
```

2. **Execute o deploy automático**:

```bash
npm run deploy
```

### 4️⃣ Configuração do Domínio na Locaweb

1. **Acesse o Painel da Locaweb**
2. **Vá em "Domínios"** → Seu domínio
3. **Configure o DNS** (se necessário)
4. **Aguarde a propagação** (pode levar até 24h)

### 5️⃣ Arquivo .htaccess (Importante!)

Crie um arquivo `.htaccess` na raiz do `public_html` com o seguinte conteúdo:

```apache
# Habilitar compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache de arquivos estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
</IfModule>

# Redirecionar HTTP para HTTPS (se tiver SSL)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Prevenir listagem de diretórios
Options -Indexes

# Proteção contra ataques
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

## 📱 Testando o Site

Após o upload, acesse seu domínio:
- `https://seudominio.com.br`

Teste:
- ✅ Carregamento da página principal
- ✅ Navegação entre seções
- ✅ Formulário de orçamento
- ✅ Responsividade (celular, tablet, desktop)
- ✅ Performance

## 🔄 Atualizações Futuras

Para atualizar o site:

1. **Faça as alterações** no código
2. **Execute o build**: `npm run build`
3. **Faça upload** da pasta `out` novamente via FTP
4. **Limpe o cache** do navegador (Ctrl + F5)

## ⚠️ Limitações do Host Compartilhado

Como você está usando um host compartilhado (sem Node.js), algumas funcionalidades não estarão disponíveis:

- ❌ **API Routes**: Não funcionam (precisa de servidor Node.js)
- ❌ **Server-Side Rendering (SSR)**: Não funciona
- ❌ **Incremental Static Regeneration (ISR)**: Não funciona
- ✅ **Páginas estáticas**: Funcionam perfeitamente
- ✅ **Client-side JavaScript**: Funciona normalmente
- ✅ **Formulários com redirecionamento**: Funcionam

### Solução para o Formulário

Seu formulário atual redireciona para WhatsApp, então funcionará perfeitamente! O envio é processado no lado do cliente (navegador).

## 🆘 Problemas Comuns

### 1. Página em branco
- Verifique se todos os arquivos foram enviados
- Verifique o console do navegador (F12)
- Confirme que está acessando o domínio correto

### 2. Imagens não carregam
- Verifique se a pasta `images` foi enviada
- Confirme as permissões dos arquivos (644 para arquivos, 755 para pastas)

### 3. CSS não aplica
- Limpe o cache do navegador (Ctrl + Shift + Delete)
- Verifique se a pasta `_next` foi enviada completamente

### 4. Formulário não funciona
- Como usa redirecionamento para WhatsApp, deve funcionar normalmente
- Verifique o console do navegador para erros JavaScript

## 📞 Suporte Locaweb

Se tiver problemas com o servidor:
- **Telefone**: 0800 777 4000
- **Chat**: Painel da Locaweb
- **Email**: suporte@locaweb.com.br

## ✨ Checklist Final

Antes de publicar, confirme:

- [ ] Build executado com sucesso (`npm run build`)
- [ ] Pasta `out` criada com todos os arquivos
- [ ] Upload FTP completo para `public_html`
- [ ] Arquivo `.htaccess` criado
- [ ] SSL configurado (HTTPS)
- [ ] Domínio apontando corretamente
- [ ] Site testado em diferentes dispositivos
- [ ] Formulário testado e funcionando
- [ ] Performance verificada

## 🎉 Pronto!

Seu site está no ar! 🚀

Acesse: `https://seudominio.com.br`
