# ✅ Checklist - Deploy VPS Hostinger + EasyPanel

Use este checklist para garantir um deploy perfeito na VPS.

---

## 📋 Pré-Deploy

### Preparação Local
- [ ] Projeto testado localmente (`npm run dev`)
- [ ] Todas as alterações commitadas
- [ ] Build executado com sucesso (`npm run build`)
- [ ] Repositório Git criado no GitHub/GitLab
- [ ] `.env` configurado (se necessário)

### Configuração VPS
- [ ] VPS Hostinger ativa e acessível
- [ ] EasyPanel instalado (ou acesso SSH root)
- [ ] IP da VPS em mãos
- [ ] Domínio registrado (opcional)
- [ ] DNS configurado (se usar domínio)

---

## 🚀 Deploy via EasyPanel

### Configuração GitHub
- [ ] Repositório no GitHub criado
- [ ] Código enviado (`git push`)
- [ ] Branch principal configurada (`main` ou `master`)

### Configuração EasyPanel
- [ ] Acessado painel (`https://IP:3000`)
- [ ] Login realizado
- [ ] Projeto criado
- [ ] GitHub conectado
- [ ] Repositório selecionado

### Build Settings
- [ ] Framework: `Next.js` selecionado
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Port: `3000` configurada
- [ ] Environment Variables configuradas (se necessário)

### Domínio e SSL
- [ ] Domínio adicionado no EasyPanel
- [ ] DNS configurado (A record → IP da VPS)
- [ ] SSL automático gerado
- [ ] Redirecionamento HTTP → HTTPS ativo
- [ ] Domínio funcionando com HTTPS

### Deploy
- [ ] Deploy iniciado
- [ ] Build completou sem erros
- [ ] Aplicação em execução
- [ ] Logs sem erros críticos

---

## 🎯 Deploy via SSH Manual

### Conexão SSH
- [ ] Conectado via SSH (`ssh root@IP`)
- [ ] Senha/chave SSH funcionando

### Instalação de Dependências
- [ ] Node.js 20 LTS instalado
- [ ] NPM atualizado
- [ ] PM2 instalado globalmente
- [ ] Git instalado
- [ ] Nginx instalado

### Clone e Build
- [ ] Diretório `/var/www` criado
- [ ] Repositório clonado
- [ ] `npm install` executado
- [ ] `npm run build` completado sem erros

### Configuração PM2
- [ ] Arquivo `ecosystem.config.js` criado
- [ ] PM2 iniciado (`pm2 start`)
- [ ] PM2 salvo (`pm2 save`)
- [ ] PM2 startup configurado
- [ ] Aplicação rodando (verificar `pm2 status`)

### Configuração Nginx
- [ ] Arquivo de config criado em `/etc/nginx/sites-available/`
- [ ] Symlink criado em `/etc/nginx/sites-enabled/`
- [ ] Configuração testada (`nginx -t`)
- [ ] Nginx reiniciado
- [ ] Site acessível via HTTP

### SSL/HTTPS
- [ ] Certbot instalado
- [ ] Certificado SSL obtido
- [ ] Redirecionamento HTTP → HTTPS configurado
- [ ] Site acessível via HTTPS
- [ ] Renovação automática configurada (`certbot renew --dry-run`)

### Firewall
- [ ] UFW instalado
- [ ] Porta 22 (SSH) permitida
- [ ] Porta 80 (HTTP) permitida
- [ ] Porta 443 (HTTPS) permitida
- [ ] Firewall ativado
- [ ] Acesso ainda funcionando

---

## 🧪 Testes Pós-Deploy

### Funcionalidade Básica
- [ ] Site carrega pelo domínio/IP
- [ ] Página inicial aparece corretamente
- [ ] Todas as imagens carregam
- [ ] CSS está aplicado
- [ ] JavaScript funciona
- [ ] Animações funcionando

### Navegação
- [ ] Menu de navegação funciona
- [ ] Links internos funcionam
- [ ] Âncoras (#sections) funcionam
- [ ] Scroll suave funciona
- [ ] Transições de página funcionam

### Formulário
- [ ] Formulário aparece
- [ ] Validações funcionam
- [ ] Modal de confirmação aparece
- [ ] Redirecionamento WhatsApp funciona
- [ ] Mensagem WhatsApp formatada corretamente

### Performance
- [ ] Tempo de carregamento < 3 segundos
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3s
- [ ] Sem erros no console (F12)
- [ ] Sem warnings críticos

### Responsividade
- [ ] Desktop 1920x1080
- [ ] Laptop 1366x768
- [ ] Tablet 768x1024
- [ ] Mobile 375x667 (iPhone)
- [ ] Mobile 360x640 (Android)

### Navegadores
- [ ] Google Chrome
- [ ] Mozilla Firefox
- [ ] Safari
- [ ] Microsoft Edge
- [ ] Chrome Mobile
- [ ] Safari Mobile

### SEO e Segurança
- [ ] Meta tags presentes
- [ ] Título da página correto
- [ ] Favicon aparece
- [ ] SSL/HTTPS funcionando
- [ ] Certificado válido
- [ ] Headers de segurança configurados
- [ ] Sem conteúdo misto (mixed content)

---

## 🔧 Configurações Adicionais

### Backup
- [ ] Backup automático configurado
- [ ] Backup manual testado
- [ ] Local de backup definido
- [ ] Restauração testada

### Monitoramento
- [ ] PM2 monitorando aplicação
- [ ] Uptime monitoring configurado (UptimeRobot, etc)
- [ ] Alertas de downtime configurados
- [ ] Logs centralizados

### Performance
- [ ] CDN configurado (opcional)
- [ ] Imagens otimizadas
- [ ] Compressão GZIP ativa
- [ ] Cache configurado
- [ ] Rate limiting configurado (se necessário)

### Analytics
- [ ] Google Analytics instalado (opcional)
- [ ] Google Search Console configurado
- [ ] Sitemap enviado
- [ ] robots.txt configurado

---

## 📊 Verificação de Recursos

### Servidor
- [ ] CPU: Uso normal (< 50%)
- [ ] RAM: Uso normal (< 70%)
- [ ] Disco: Espaço suficiente (> 20% livre)
- [ ] Rede: Sem gargalos

### Aplicação
- [ ] Sem memory leaks
- [ ] Sem processos zumbis
- [ ] Logs sem erros recorrentes
- [ ] Tempo de resposta < 500ms

---

## 🔄 Procedimento de Atualização

### Deploy Automático (EasyPanel)
- [ ] Documentado como fazer git push
- [ ] Equipe sabe que EasyPanel atualiza automaticamente
- [ ] Testado em ambiente de desenvolvimento primeiro

### Deploy Manual (SSH)
- [ ] Procedimento documentado
- [ ] Script de atualização criado
- [ ] Rollback procedure definido
- [ ] Downtime mínimo garantido

---

## 🆘 Troubleshooting

### Comandos de Diagnóstico
- [ ] `pm2 status` - Verificar status
- [ ] `pm2 logs` - Ver logs
- [ ] `nginx -t` - Testar config Nginx
- [ ] `systemctl status nginx` - Status Nginx
- [ ] `htop` - Monitorar recursos
- [ ] `df -h` - Verificar espaço em disco
- [ ] `free -h` - Verificar memória

### Contatos de Suporte
- [ ] Suporte Hostinger salvo
- [ ] Documentação técnica acessível
- [ ] Credenciais salvas em local seguro

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] ✅ Site 100% funcional
- [ ] ✅ HTTPS configurado e funcionando
- [ ] ✅ Testado em todos os dispositivos
- [ ] ✅ Performance excelente
- [ ] ✅ Sem erros no console ou logs
- [ ] ✅ Formulário e WhatsApp funcionando
- [ ] ✅ Backup configurado
- [ ] ✅ Monitoramento ativo
- [ ] ✅ DNS propagado (pode levar até 48h)
- [ ] ✅ Equipe treinada para atualizações

---

## 📝 Informações do Deploy

**Data do Deploy**: ___/___/______

**Método Usado**: [ ] EasyPanel  [ ] SSH Manual

**IP da VPS**: _________________

**Domínio**: _____________________

**Branch**: _____________________

**Commit Hash**: _____________________

**Responsável**: _________________

**Status**: [ ] Em andamento  [ ] Concluído  [ ] Com pendências

---

## 📞 Contatos de Emergência

**Hostinger Suporte VPS**:
- 📱 Chat: painel.hostinger.com
- 📧 Email: support@hostinger.com

**Desenvolvedor/DevOps**:
- Nome: _________________
- Tel: _________________
- Email: _________________

---

**Guia Completo**: EASYPANEL-DEPLOY.md  
**Guia Rápido**: EASYPANEL-QUICKSTART.md  
**Versão**: 1.0  
