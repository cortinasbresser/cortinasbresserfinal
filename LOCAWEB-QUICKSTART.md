# 🚀 Deploy Rápido na Locaweb

## ⚡ Opção 1: Deploy Automático (Recomendado)

### 1. Configure as credenciais FTP

Copie `.env.locaweb` para `.env` e preencha:

```bash
FTP_HOST=ftp.seudominio.com.br
FTP_USER=seu_usuario_ftp
FTP_PASSWORD=sua_senha_ftp
FTP_REMOTE_PATH=/public_html
```

### 2. Execute o deploy

```bash
npm run deploy:locaweb
```

Pronto! O script vai:
- ✅ Fazer build do projeto
- ✅ Conectar no FTP
- ✅ Enviar todos os arquivos
- ✅ Configurar o .htaccess

## 📁 Opção 2: Upload Manual via FTP

### 1. Gere os arquivos estáticos

```bash
npm run build:static
```

### 2. Use um cliente FTP (FileZilla)

1. Baixe o [FileZilla](https://filezilla-project.org/)
2. Conecte com as credenciais da Locaweb
3. Envie **TODO** o conteúdo da pasta `out` para `public_html`
4. Envie também o arquivo `.htaccess` para a raiz

### 3. Acesse seu site

Abra: `https://seudominio.com.br`

## 📖 Documentação Completa

Ver arquivo: **[LOCAWEB-DEPLOY.md](LOCAWEB-DEPLOY.md)**

## 🆘 Problemas?

### Página em branco
- Limpe o cache: `Ctrl + Shift + Delete`
- Verifique o console do navegador (F12)

### CSS não aplica
- Certifique-se que enviou a pasta `_next`
- Limpe o cache do navegador

### Formulário não envia
- O formulário redireciona para WhatsApp (funciona no cliente)
- Verifique o console para erros JavaScript

## 📞 Suporte Locaweb

- **Telefone**: 0800 777 4000
- **Chat**: Painel da Locaweb

## ✨ Comandos Disponíveis

```bash
# Desenvolvimento local
npm run dev

# Build para produção (exportação estática)
npm run build:static

# Deploy automático para Locaweb
npm run deploy:locaweb

# Apenas preparar para upload manual
npm run locaweb
```

## 🎯 Próximos Passos

Após o deploy:

1. ✅ Configure SSL (HTTPS) no painel da Locaweb
2. ✅ Configure o domínio principal
3. ✅ Teste em diferentes dispositivos
4. ✅ Configure Google Analytics (opcional)
5. ✅ Configure Search Console (opcional)

---

**Desenvolvido para Cortinas Bresser** 🎯
