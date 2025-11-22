# 🚀 Guia de Deploy FTP - Locaweb

Este guia explica como fazer deploy automático do seu projeto Next.js para o servidor FTP da Locaweb.

## 📋 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Deploy Manual](#deploy-manual)
3. [Deploy Automático com GitHub Actions](#deploy-automático-com-github-actions)
4. [Comandos Disponíveis](#comandos-disponíveis)
5. [Solução de Problemas](#solução-de-problemas)

---

## 🔧 Configuração Inicial

### 1. Criar arquivo de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 2. Configurar credenciais FTP

Edite o arquivo `.env` com suas credenciais da Locaweb:

```env
FTP_HOST=ftp.seudominio.com.br
FTP_USER=seu_usuario_ftp
FTP_PASSWORD=sua_senha_ftp
FTP_PORT=21
FTP_REMOTE_PATH=/public_html
FTP_SECURE=false
NEXT_PUBLIC_BUILD_OUTPUT=out
```

**Como obter as credenciais:**

1. Acesse o painel da Locaweb
2. Vá em **Hospedagem de Sites** → **FTP**
3. Copie as informações:
   - **Host FTP**: geralmente `ftp.seudominio.com.br`
   - **Usuário**: seu usuário FTP
   - **Senha**: sua senha FTP
   - **Diretório**: normalmente `/public_html` (raiz do site)

### 3. Instalar dependências

As dependências já foram instaladas, mas caso precise reinstalar:

```bash
npm install
```

---

## 🚀 Deploy Manual

### Opção 1: Deploy Completo

Faz build e envia **todos** os arquivos para o FTP:

```bash
npm run deploy
```

### Opção 2: Deploy Incremental (Recomendado)

Faz build e envia **apenas os arquivos modificados**:

```bash
npm run deploy:sync
```

**Vantagens do deploy incremental:**
- ⚡ Muito mais rápido
- 📊 Mostra quais arquivos foram alterados
- 💾 Economiza banda
- 🔄 Usa cache MD5 para detectar mudanças

### Opção 3: Deploy sem Build

Se você já fez o build e quer apenas enviar os arquivos:

```bash
# Deploy completo
npm run deploy:only

# Deploy incremental
npm run deploy:sync-only
```

---

## 🤖 Deploy Automático com GitHub Actions

### 1. Configurar Secrets no GitHub

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Adicione os seguintes secrets:

| Nome | Valor | Descrição |
|------|-------|-----------|
| `FTP_HOST` | `ftp.seudominio.com.br` | Endereço do servidor FTP |
| `FTP_USER` | `seu_usuario` | Usuário FTP |
| `FTP_PASSWORD` | `sua_senha` | Senha FTP |
| `FTP_PORT` | `21` | Porta FTP (opcional, padrão: 21) |
| `FTP_REMOTE_PATH` | `/public_html/` | Diretório remoto (com `/` no final) |

### 2. Como funciona

O deploy automático acontece quando você:

- Faz **push** para a branch `main` ou `master`
- Executa manualmente via **Actions** → **Deploy to Locaweb FTP** → **Run workflow**

### 3. Acompanhar o deploy

1. Vá em **Actions** no seu repositório
2. Clique no workflow em execução
3. Acompanhe os logs em tempo real

---

## 📝 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run deploy` | Build + deploy completo via FTP |
| `npm run deploy:sync` | Build + deploy incremental via FTP |
| `npm run deploy:only` | Deploy completo (sem build) |
| `npm run deploy:sync-only` | Deploy incremental (sem build) |

---

## 🔍 Solução de Problemas

### ❌ Erro: "Variáveis de ambiente faltando"

**Solução:** Certifique-se de que o arquivo `.env` existe e contém todas as variáveis necessárias.

### ❌ Erro: "Diretório de build não encontrado"

**Solução:** Execute `npm run build` antes de fazer o deploy.

### ❌ Erro de conexão FTP

**Possíveis causas:**

1. **Credenciais incorretas**: Verifique usuário e senha
2. **Host incorreto**: Confirme o endereço FTP no painel da Locaweb
3. **Firewall**: Certifique-se de que a porta 21 está liberada
4. **IP bloqueado**: Alguns servidores bloqueiam IPs desconhecidos

**Solução:** Acesse o painel da Locaweb e verifique:
- Se o FTP está ativo
- Se há restrição de IP
- Se as credenciais estão corretas

### ❌ Site mostra página em branco após deploy

**Possíveis causas:**

1. **Diretório incorreto**: Verifique se `FTP_REMOTE_PATH` está correto
2. **Arquivo index.html não encontrado**: Certifique-se de que o build foi feito corretamente

**Solução:**
```bash
# Verificar se o build foi criado
ls out/

# Deve conter index.html e outros arquivos
```

### ❌ Imagens não aparecem

**Causa:** Next.js otimiza imagens por padrão, mas isso não funciona em hospedagem estática.

**Solução:** Já configurado no `next.config.mjs` com `images.unoptimized: true`

### ❌ Rotas não funcionam (erro 404)

**Causa:** Hospedagem estática não suporta rotas dinâmicas do Next.js automaticamente.

**Solução:** Configure um arquivo `.htaccess` na raiz do FTP:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📚 Recursos Adicionais

### Estrutura de arquivos criados

```
cortinasbresser/
├── .env.example          # Exemplo de configuração
├── .env                  # Suas credenciais (não commitado)
├── scripts/
│   ├── deploy-ftp.js     # Script de deploy completo
│   └── deploy-ftp-sync.js # Script de deploy incremental
├── .github/
│   └── workflows/
│       └── deploy-ftp.yml # GitHub Actions workflow
└── next.config.mjs       # Configurado para exportação estática
```

### Hospedagem em subdiretório

Se seu site não está na raiz, mas em `seudominio.com.br/subdiretorio`:

1. Edite `next.config.mjs`:
```javascript
basePath: '/subdiretorio',
assetPrefix: '/subdiretorio',
```

2. Atualize `.env`:
```env
FTP_REMOTE_PATH=/public_html/subdiretorio
```

---

## 🎯 Fluxo de Trabalho Recomendado

1. **Desenvolvimento local:**
   ```bash
   npm run dev
   ```

2. **Testar build:**
   ```bash
   npm run build
   npm run start
   ```

3. **Deploy incremental:**
   ```bash
   npm run deploy:sync
   ```

4. **Commit e push:**
   ```bash
   git add .
   git commit -m "feat: nova funcionalidade"
   git push origin main
   ```

5. **Deploy automático** acontece via GitHub Actions! 🎉

---

## 💡 Dicas

- ✅ Use `deploy:sync` para deploys mais rápidos
- ✅ Configure GitHub Actions para deploy automático
- ✅ Mantenha o `.env` seguro (nunca commite)
- ✅ Teste localmente antes de fazer deploy
- ✅ Use o painel da Locaweb para verificar os arquivos enviados

---

## 🆘 Suporte

Se precisar de ajuda:

1. Verifique os logs do deploy
2. Consulte a [documentação da Locaweb](https://ajuda.locaweb.com.br/)
3. Verifique o painel FTP da Locaweb

---

**Criado com ❤️ para Cortinas Bresser**
