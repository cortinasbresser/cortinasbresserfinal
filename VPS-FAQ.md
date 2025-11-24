# ❓ FAQ - Deploy VPS Hostinger + EasyPanel

Perguntas frequentes sobre o deploy na VPS Hostinger.

---

## 🎯 Geral

### O que é EasyPanel?

EasyPanel é uma interface web moderna para gerenciar aplicações em servidores VPS. É como ter um Vercel/Netlify no seu próprio servidor, com:
- Deploy automático via Git
- SSL automático
- Monitoramento integrado
- Interface visual amigável
- Suporte a múltiplas aplicações

### Qual a diferença entre VPS e hospedagem compartilhada?

| Aspecto | Hospedagem Compartilhada | VPS |
|---------|--------------------------|-----|
| **Controle** | Limitado | Total (root access) |
| **Recursos** | Compartilhados | Dedicados |
| **Node.js** | ❌ Limitado/Não | ✅ Completo |
| **API Routes** | ❌ Não funciona | ✅ Funciona |
| **Performance** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Preço** | $ Barato | $$ Moderado |
| **Manutenção** | Provider | Você |

### Preciso saber programação para usar EasyPanel?

❌ **Não!** EasyPanel foi feito para ser simples:
- Interface visual (GUI)
- Deploy com alguns cliques
- SSL automático
- Sem necessidade de comandos complexos

Para o método SSH manual, você precisa de conhecimentos básicos de Linux.

---

## 💰 Custo e Planos

### Quanto custa uma VPS na Hostinger?

Planos VPS Hostinger (valores aproximados):
- **KVM 1**: R$ 19,99/mês (1 vCore, 4GB RAM, 50GB SSD)
- **KVM 2**: R$ 29,99/mês (2 vCores, 8GB RAM, 100GB SSD)
- **KVM 4**: R$ 49,99/mês (4 vCores, 16GB RAM, 200GB SSD)

💡 **Recomendado**: KVM 1 é suficiente para começar!

### EasyPanel é grátis?

✅ **Sim!** EasyPanel é 100% gratuito e open-source.

### Há custos adicionais?

Possíveis custos extras:
- ✅ **Domínio**: R$ 40-80/ano (opcional)
- ✅ **Backup externo**: R$ 0-30/mês (opcional)
- ❌ **SSL**: Grátis (Let's Encrypt)
- ❌ **EasyPanel**: Grátis

---

## 🚀 Deploy

### Quanto tempo leva o deploy?

**Via EasyPanel**: ~5-10 minutos
- Configuração: 3 min
- Build: 2-5 min
- Deploy: 1-2 min

**Via SSH Manual**: ~15-30 minutos
- Instalação: 10-15 min
- Configuração: 5-10 min
- Deploy: 5 min

### O deploy é automático?

**EasyPanel**: ✅ Sim! 
- Faça `git push` no GitHub
- EasyPanel detecta e faz deploy automaticamente

**SSH Manual**: ❌ Não
- Você precisa fazer `git pull` e `pm2 restart` manualmente

### Posso fazer rollback se algo der errado?

**EasyPanel**: ✅ Sim, com 1 clique
- Histórico de deploys disponível
- Rollback instantâneo

**SSH Manual**: ⚙️ Manual
- `git checkout <commit-anterior>`
- `npm install && npm run build`
- `pm2 restart`

---

## 🔒 Segurança

### O site vai ter HTTPS?

✅ **Sim, automaticamente!**

**EasyPanel**: SSL configurado automaticamente
**SSH Manual**: Use Certbot (grátis)

### Como proteger minha VPS?

Boas práticas de segurança:

1. **Firewall**:
   ```bash
   ufw enable
   ufw allow 22,80,443/tcp
   ```

2. **SSH Key** (ao invés de senha):
   ```bash
   ssh-keygen
   ssh-copy-id root@IP
   ```

3. **Atualizações regulares**:
   ```bash
   apt update && apt upgrade -y
   ```

4. **Fail2Ban** (bloqueia ataques):
   ```bash
   apt install fail2ban
   systemctl enable fail2ban
   ```

5. **Backup regular**

### Meus dados estão seguros?

✅ Sim, se você seguir as boas práticas:
- HTTPS ativo (dados criptografados)
- Firewall configurado
- Senhas fortes
- Backups regulares
- Sistema atualizado

---

## ⚡ Performance

### Quantos visitantes simultâneos a VPS aguenta?

Depende do plano:

**KVM 1** (1 vCore, 4GB RAM):
- ~100-500 usuários simultâneos
- ~10.000-50.000 visitas/mês

**KVM 2** (2 vCores, 8GB RAM):
- ~500-2.000 usuários simultâneos
- ~50.000-200.000 visitas/mês

💡 Para site de cortinas, KVM 1 é mais que suficiente!

### Como melhorar a performance?

1. **CDN** (Cloudflare - grátis):
   - Cache global
   - Proteção DDoS
   - Reduz latência

2. **Otimização de imagens**:
   - Usar WebP
   - Lazy loading
   - Compressão

3. **Cache**:
   - Nginx cache
   - Redis (para dados dinâmicos)

4. **Compression**:
   - GZIP/Brotli habilitados

### O site vai ficar lento?

❌ Não! VPS é geralmente **mais rápido** que hospedagem compartilhada:
- Recursos dedicados
- Sem "vizinhos barulhentos"
- Controle total sobre otimizações

---

## 🔧 Manutenção

### Preciso fazer manutenção regularmente?

✅ Sim, mas é simples:

**Semanal**:
- Verificar logs (`pm2 logs`)
- Verificar uso de recursos (`htop`)

**Mensal**:
- Atualizar sistema (`apt update && apt upgrade`)
- Verificar espaço em disco (`df -h`)
- Testar backup/restore

**Quando necessário**:
- Atualizar dependências do projeto
- Renovar SSL (automático com certbot)

### E se eu não souber fazer manutenção?

Opções:

1. **EasyPanel**: Interface visual facilita muito!
2. **Serviço gerenciado**: Pague alguém para gerenciar
3. **Hostinger Managed VPS**: Hostinger cuida da manutenção
4. **Voltar para Vercel/Netlify**: Se preferir zero manutenção

### Como faço backup?

**Método 1: Snapshot da VPS** (Hostinger):
- Painel Hostinger → Snapshots
- Backup completo do servidor
- Restauração em 1 clique

**Método 2: Backup do código**:
```bash
# Git já é um backup!
git push origin main
```

**Método 3: Backup automático**:
```bash
# Criar script de backup
crontab -e

# Executar backup diário às 2AM
0 2 * * * /var/www/backup.sh
```

---

## 🌐 Domínio

### Preciso de domínio?

❌ **Não é obrigatório**
- Site funciona pelo IP: `http://SEU_IP`

✅ **Mas é recomendado**:
- Mais profissional
- Mais fácil de lembrar
- Melhor para SEO
- SSL mais fácil

### Onde comprar domínio?

Opções populares no Brasil:
- **Registro.br**: .com.br (R$ 40/ano)
- **Hostinger**: Vários TLDs
- **GoDaddy**: Internacional
- **Namecheap**: Internacional

### Como configurar DNS?

No seu provedor de domínio, crie:

```
Tipo A
Nome: @
Valor: [IP_DA_VPS]
TTL: 3600

Tipo A  
Nome: www
Valor: [IP_DA_VPS]
TTL: 3600
```

Propagação leva 1-48 horas (geralmente < 6 horas).

---

## 📧 Email

### Como enviar emails?

Em VPS, você pode:

**Opção 1: Serviço externo** (Recomendado):
- SendGrid (100 emails/dia grátis)
- Mailgun (5.000 emails/mês grátis)
- Amazon SES (muito barato)
- Resend (3.000 emails/mês grátis)

**Opção 2: Servidor SMTP próprio**:
- Mais complexo
- Pode cair em spam
- Não recomendado

### O formulário vai enviar email?

Com VPS, você tem 3 opções:

1. **WhatsApp** (atual - funciona perfeitamente!)
2. **Email via serviço externo** (SendGrid, etc)
3. **Ambos** (WhatsApp + Email)

---

## 🔄 Atualizações

### Como atualizar o site?

**EasyPanel**:
```bash
# No seu computador
git add .
git commit -m "Atualização"
git push
# EasyPanel detecta e faz deploy automático!
```

**SSH Manual**:
```bash
# Conectar na VPS
ssh root@IP

# Ir para pasta do projeto
cd /var/www/cortinasbresser

# Puxar atualizações
git pull

# Reinstalar dependências (se necessário)
npm install

# Rebuildar
npm run build

# Reiniciar
pm2 restart cortinasbresser
```

### Posso atualizar sem derrubar o site?

✅ **Sim!** PM2 faz "zero-downtime reload":

```bash
pm2 reload cortinasbresser
```

Site continua no ar durante atualização!

### E se a atualização quebrar o site?

**EasyPanel**: 
- Rollback com 1 clique
- Volta para versão anterior

**SSH Manual**:
```bash
git log                    # Ver commits
git checkout COMMIT_ANTERIOR
npm install
npm run build
pm2 restart cortinasbresser
```

---

## 🐛 Problemas Comuns

### Site não abre depois do deploy

**Checklist**:
1. App rodando? `pm2 status`
2. Nginx rodando? `systemctl status nginx`
3. Firewall liberado? `ufw status`
4. DNS configurado? `nslookup seudominio.com`
5. Porta correta? Deve ser 3000

**Solução**:
```bash
# Ver logs
pm2 logs cortinasbresser

# Reiniciar tudo
pm2 restart cortinasbresser
systemctl restart nginx
```

### Erro "EADDRINUSE: address already in use"

Porta 3000 já está em uso.

**Solução**:
```bash
# Ver o que está usando
lsof -i :3000

# Matar processo
kill -9 PID_DO_PROCESSO

# Reiniciar app
pm2 restart cortinasbresser
```

### Não consigo conectar via SSH

**Possíveis causas**:
1. IP errado
2. Senha errada
3. Firewall bloqueando porta 22
4. VPS desligada

**Solução**:
- Verificar IP no painel Hostinger
- Resetar senha no painel
- Verificar firewall: `ufw allow 22/tcp`
- Ligar VPS no painel

### SSL não funciona / "Not Secure"

**Causas**:
1. Certificado não instalado
2. Certificado expirado
3. Configuração Nginx errada

**Solução EasyPanel**:
- Remover e adicionar domínio novamente
- SSL deve ser gerado automaticamente

**Solução SSH**:
```bash
# Reobter certificado
certbot --nginx -d seudominio.com.br

# Testar renovação
certbot renew --dry-run
```

### Site está lento

**Diagnóstico**:
```bash
# Ver uso de recursos
htop

# Ver uso de disco
df -h

# Ver logs de erro
pm2 logs --err
```

**Soluções**:
1. Aumentar plano VPS
2. Adicionar CDN (Cloudflare)
3. Otimizar imagens
4. Adicionar cache
5. Verificar código (memory leaks?)

### Durante build: "JavaScript heap out of memory"

Pouca RAM durante build.

**Solução**:
```bash
# Aumentar limite de memória do Node
export NODE_OPTIONS="--max-old-space-size=4096"

# Rebuildar
npm run build
```

Ou adicionar swap:
```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

---

## 📊 Monitoramento

### Como monitorar se o site está no ar?

**Opção 1: UptimeRobot** (Grátis):
- Monitora a cada 5 minutos
- Envia email se site cair
- 50 monitores grátis
- upti merobot.com

**Opção 2: Pingdom** (Pago):
- Mais recursos
- Monitoramento detalhado

**Opção 3: PM2 Plus** (Freemium):
- Monitoramento de performance
- Logs centralizados
- Alerts

### Como ver logs?

**EasyPanel**: Interface visual, aba "Logs"

**SSH/PM2**:
```bash
# Logs em tempo real
pm2 logs cortinasbresser

# Últimas 100 linhas
pm2 logs --lines 100

# Apenas erros
pm2 logs --err

# Logs do Nginx
tail -f /var/log/nginx/error.log
```

### Como ver uso de recursos?

```bash
# CPU e RAM em tempo real
htop

# PM2 monitor
pm2 monit

# Espaço em disco
df -h

# Memória
free -h
```

---

## 🎓 Preciso Saber

### Preciso saber Linux?

**EasyPanel**: ❌ Não necessário
- Interface visual
- Tudo via cliques

**SSH Manual**: ⚙️ Básico ajuda
- Comandos simples
- Tudo documentado nos guias

### Preciso saber Docker?

❌ **Não!** 
- EasyPanel usa Docker internamente
- Você não precisa saber Docker
- Tudo é abstraído

### Preciso saber Nginx?

**EasyPanel**: ❌ Não
- Configurado automaticamente

**SSH Manual**: ⚙️ Um pouco
- Mas há template pronto no guia
- Só copiar e colar!

---

## 🔄 Migração

### Como migrar da Locaweb para VPS?

É simples! Já temos tudo no Git:

1. Código já está no GitHub
2. Deploy na VPS (5-20 min)
3. Testar tudo
4. Atualizar DNS para apontar para VPS
5. Aguardar propagação (1-48h)
6. Cancelar Locaweb se quiser

### Posso manter nos dois lugares?

✅ **Sim!** Durante transição:
- Locaweb: versão estática (fallback)
- VPS: versão completa (principal)

### Como migrar de Vercel para VPS?

1. Código já está no Git
2. Deploy na VPS
3. Testar domínio temporário
4. Atualizar DNS
5. Remover projeto do Vercel

---

## 💡 Dicas

### Vale a pena usar VPS ao invés de Vercel/Netlify?

**Use VPS se**:
- ✅ Quer funcionalidades Node.js completas
- ✅ Precisa de APIs próprias
- ✅ Quer controle total
- ✅ Planeja escalar muito
- ✅ Quer aprender DevOps

**Use Vercel/Netlify se**:
- ✅ Quer zero manutenção
- ✅ Não precisa de APIs complexas
- ✅ Prefere simplicidade
- ✅ Está começando

### Melhor plano VPS para começar?

**Hostinger KVM 1**:
- 1 vCore
- 4GB RAM
- 50GB SSD
- R$ ~20/mês

É mais que suficiente para:
- 1-5 sites pequenos/médios
- Milhares de visitas/mês
- APIs leves

### Posso hospedar múltiplos sites na mesma VPS?

✅ **Sim!** 

**EasyPanel**: Suporta múltiplos projetos
**SSH Manual**: Configure múltiplos sites no Nginx

---

## 📞 Suporte

### Onde pedir ajuda?

**Hostinger**:
- 💬 Chat: 24/7 no painel
- 📧 Email: support@hostinger.com
- 📚 Base de conhecimento

**Comunidade**:
- EasyPanel Discord
- Stack Overflow
- Reddit r/selfhosted

**Documentação do Projeto**:
- `EASYPANEL-DEPLOY.md`
- `EASYPANEL-QUICKSTART.md`
- `CHECKLIST-VPS.md`
- `VPS-ROADMAP.md`

---

## ✅ Próximos Passos

Depois de ler o FAQ:

1. 📖 Leia: `EASYPANEL-QUICKSTART.md`
2. 🚀 Faça o deploy!
3. ✅ Use o checklist: `CHECKLIST-VPS.md`
4. 🎉 Site no ar!

---

**Dúvidas não respondidas?**  
Consulte os guias completos ou entre em contato com o suporte da Hostinger.

**Desenvolvido para**: Cortinas Bresser 🎯  
**Data**: 24/11/2025  
**Versão**: 1.0  
