# 🚀 Quick Start - Deploy FTP Locaweb

## ⚡ Configuração Rápida (5 minutos)

### 1️⃣ Configure as credenciais

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas credenciais da Locaweb
# FTP_HOST=ftp.seudominio.com.br
# FTP_USER=seu_usuario
# FTP_PASSWORD=sua_senha
```

### 2️⃣ Teste a conexão

```bash
npm run test:ftp
```

Se aparecer ✅, está tudo certo!

### 3️⃣ Faça o deploy

```bash
npm run deploy:sync
```

Pronto! Seu site está no ar! 🎉

---

## 📚 Comandos Principais

| Comando | O que faz |
|---------|-----------|
| `npm run test:ftp` | 🔍 Testa conexão FTP |
| `npm run deploy:sync` | 🚀 Deploy rápido (só arquivos alterados) |
| `npm run deploy` | 📦 Deploy completo (todos os arquivos) |

---

## 🆘 Problemas?

### ❌ Erro de conexão?
- Verifique as credenciais no arquivo `.env`
- Acesse o painel da Locaweb e confirme os dados FTP

### ❌ Página em branco?
- Verifique se `FTP_REMOTE_PATH=/public_html` está correto
- Acesse o painel FTP da Locaweb e veja se os arquivos foram enviados

---

## 📖 Documentação Completa

Para mais detalhes, veja: [DEPLOY.md](./DEPLOY.md)

---

## 🤖 Deploy Automático (Opcional)

Configure GitHub Actions para deploy automático:

1. Vá em **Settings** → **Secrets** no GitHub
2. Adicione os secrets: `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_REMOTE_PATH`
3. Faça push para `main` → Deploy automático! 🎉

---

**Dúvidas?** Consulte [DEPLOY.md](./DEPLOY.md) para guia completo.
