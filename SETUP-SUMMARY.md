# 📦 Sistema de Deploy FTP - Resumo da Configuração

## ✅ O que foi configurado

### 🎯 Objetivo
Sistema completo de deploy automático para FTP da Locaweb, com múltiplas opções de uso.

---

## 📁 Arquivos Criados

### 1. **Configuração**
- ✅ `.env.example` - Template de configuração com credenciais FTP
- ✅ `next.config.mjs` - Atualizado para exportação estática
- ✅ `package.json` - Novos scripts de deploy adicionados
- ✅ `.gitignore` - Atualizado para ignorar cache de deploy

### 2. **Scripts de Deploy**
- ✅ `scripts/deploy-ftp.js` - Deploy completo via Node.js
- ✅ `scripts/deploy-ftp-sync.js` - Deploy incremental (apenas arquivos modificados)
- ✅ `scripts/test-ftp.js` - Teste de conexão FTP
- ✅ `scripts/deploy-ftp.ps1` - Deploy via PowerShell (alternativa Windows)

### 3. **Automação CI/CD**
- ✅ `.github/workflows/deploy-ftp.yml` - GitHub Actions para deploy automático

### 4. **Otimização**
- ✅ `public/.htaccess` - Configuração Apache para Locaweb (cache, rewrite, segurança)

### 5. **Documentação**
- ✅ `DEPLOY.md` - Guia completo de deploy (troubleshooting, configuração, etc.)
- ✅ `QUICKSTART.md` - Guia rápido de início
- ✅ `SETUP-SUMMARY.md` - Este arquivo

---

## 🚀 Comandos Disponíveis

| Comando | Descrição | Quando usar |
|---------|-----------|-------------|
| `npm run test:ftp` | Testa conexão FTP | Antes do primeiro deploy |
| `npm run build` | Cria build de produção | Para testar localmente |
| `npm run deploy` | Build + deploy completo | Primeiro deploy |
| `npm run deploy:sync` | Build + deploy incremental | **Uso diário (recomendado)** |
| `npm run deploy:only` | Deploy sem build | Quando já fez build |
| `npm run deploy:sync-only` | Deploy incremental sem build | Quando já fez build |

---

## 📋 Próximos Passos

### 1️⃣ Configurar Credenciais (OBRIGATÓRIO)

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas credenciais
# Obter credenciais no painel da Locaweb
```

**Credenciais necessárias:**
- `FTP_HOST` - Ex: ftp.seudominio.com.br
- `FTP_USER` - Seu usuário FTP
- `FTP_PASSWORD` - Sua senha FTP
- `FTP_REMOTE_PATH` - Ex: /public_html

### 2️⃣ Testar Conexão

```bash
npm run test:ftp
```

Se aparecer ✅, prossiga para o próximo passo.

### 3️⃣ Primeiro Deploy

```bash
npm run deploy
```

### 4️⃣ Deploys Futuros (Mais Rápido)

```bash
npm run deploy:sync
```

---

## 🤖 Deploy Automático (Opcional)

### Configurar GitHub Actions

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Adicione os seguintes **Repository Secrets**:

| Secret Name | Valor |
|-------------|-------|
| `FTP_HOST` | ftp.seudominio.com.br |
| `FTP_USER` | seu_usuario |
| `FTP_PASSWORD` | sua_senha |
| `FTP_REMOTE_PATH` | /public_html/ |

4. Faça push para branch `main` ou `master`
5. Deploy acontece automaticamente! 🎉

### Executar Deploy Manual via GitHub

1. Vá em **Actions** no GitHub
2. Selecione **Deploy to Locaweb FTP**
3. Clique em **Run workflow**

---

## 🎯 Fluxo de Trabalho Recomendado

### Desenvolvimento Local
```bash
npm run dev
# Desenvolva normalmente
```

### Antes do Deploy
```bash
npm run build
npm run start
# Teste localmente na porta 3000
```

### Deploy
```bash
npm run deploy:sync
# Deploy rápido (apenas arquivos alterados)
```

### Commit
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
# Deploy automático via GitHub Actions
```

---

## 🔧 Tecnologias Utilizadas

- **basic-ftp** - Cliente FTP para Node.js
- **dotenv** - Gerenciamento de variáveis de ambiente
- **GitHub Actions** - CI/CD automático
- **PowerShell** - Script alternativo para Windows
- **Apache .htaccess** - Otimização e segurança

---

## 📊 Comparação de Métodos

| Método | Velocidade | Complexidade | Quando usar |
|--------|-----------|--------------|-------------|
| `deploy` | ⭐⭐ | ⭐ | Primeiro deploy |
| `deploy:sync` | ⭐⭐⭐⭐⭐ | ⭐⭐ | **Uso diário** |
| GitHub Actions | ⭐⭐⭐⭐ | ⭐⭐⭐ | Deploy automático |
| PowerShell | ⭐⭐⭐ | ⭐⭐ | Sem Node.js |

---

## 🎨 Funcionalidades Especiais

### ✨ Deploy Incremental
- Detecta apenas arquivos modificados
- Usa hash MD5 para comparação
- Cache local em `scripts/.deploy-cache.json`
- **Até 10x mais rápido** que deploy completo

### 🔒 Segurança
- Credenciais em `.env` (não commitado)
- Secrets no GitHub Actions
- `.htaccess` com headers de segurança

### ⚡ Performance
- Cache de assets configurado
- Compressão GZIP habilitada
- Imagens otimizadas para static export

### 🛡️ Validação
- Teste de conexão antes do deploy
- Validação de credenciais
- Verificação de build antes do upload

---

## 📚 Documentação

- **Guia Rápido**: [QUICKSTART.md](./QUICKSTART.md)
- **Guia Completo**: [DEPLOY.md](./DEPLOY.md)
- **Este Resumo**: SETUP-SUMMARY.md

---

## 🆘 Suporte

### Problemas Comuns

1. **Erro de conexão FTP**
   - Execute `npm run test:ftp` para diagnosticar
   - Verifique credenciais no painel Locaweb

2. **Build falha**
   - Execute `npm install` novamente
   - Verifique erros no código

3. **Página em branco**
   - Confirme `FTP_REMOTE_PATH` correto
   - Verifique se `index.html` foi enviado

4. **Rotas não funcionam**
   - Certifique-se que `.htaccess` foi enviado
   - Verifique se mod_rewrite está ativo na Locaweb

### Onde Buscar Ajuda

- 📖 [DEPLOY.md](./DEPLOY.md) - Seção "Solução de Problemas"
- 🌐 [Ajuda Locaweb](https://ajuda.locaweb.com.br/)
- 📧 Suporte Locaweb

---

## ✅ Checklist de Configuração

- [ ] Arquivo `.env` criado com credenciais
- [ ] Teste de conexão FTP executado (`npm run test:ftp`)
- [ ] Build local testado (`npm run build`)
- [ ] Primeiro deploy realizado (`npm run deploy`)
- [ ] GitHub Secrets configurados (opcional)
- [ ] Deploy automático testado (opcional)

---

## 🎉 Conclusão

Você agora tem um sistema completo de deploy para Locaweb com:

✅ Deploy manual rápido e eficiente  
✅ Deploy automático via GitHub Actions  
✅ Múltiplas opções de uso  
✅ Otimização de performance  
✅ Segurança configurada  
✅ Documentação completa  

**Próximo passo:** Configure o arquivo `.env` e faça seu primeiro deploy! 🚀

---

**Criado em:** 2025-11-21  
**Versão:** 1.0.0  
**Projeto:** Cortinas Bresser CRM
