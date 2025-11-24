# 📦 Deploy VPS - Documentação Completa

Documentação completa para instalar o **Cortinas Bresser** na VPS Hostinger usando EasyPanel ou SSH.

---

## 🎯 Início Rápido

**Primeira vez?** Comece aqui:

1. 📖 **Leia primeiro**: [`EASYPANEL-QUICKSTART.md`](EASYPANEL-QUICKSTART.md)
2. 🚀 **Faça deploy** (5 minutos!)
3. ✅ **Verifique**: [`CHECKLIST-VPS.md`](CHECKLIST-VPS.md)

---

## 📚 Documentação Disponível

### 🟢 Iniciantes - Comece Aqui

| Arquivo | Descrição | Tempo |
|---------|-----------|-------|
| [`EASYPANEL-QUICKSTART.md`](EASYPANEL-QUICKSTART.md) | Guia rápido de 5 minutos | ⏱️ 5 min |
| [`VPS-ROADMAP.md`](VPS-ROADMAP.md) | Roadmap visual com diagramas | ⏱️ 3 min |
| [`VPS-FAQ.md`](VPS-FAQ.md) | Perguntas frequentes | ⏱️ 10 min |

### 🟡 Intermediário - Guias Completos

| Arquivo | Descrição | Tempo |
|---------|-----------|-------|
| [`EASYPANEL-DEPLOY.md`](EASYPANEL-DEPLOY.md) | Guia completo de deploy | ⏱️ 20 min |
| [`CHECKLIST-VPS.md`](CHECKLIST-VPS.md) | Checklist de verificação | ⏱️ 15 min |

### 🔴 Avançado - Deploy Manual

| Arquivo | Descrição | Quando usar |
|---------|-----------|-------------|
| [`ecosystem.config.js`](ecosystem.config.js) | Config PM2 | Deploy SSH manual |
| [`scripts/vps-install.sh`](scripts/vps-install.sh) | Script instalação auto | Deploy SSH automatizado |

---

## 🎯 Escolha Seu Método

```
┌─────────────────────────────────────────────────────────┐
│              🚀 QUAL MÉTODO USAR?                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Você é novo em VPS/Linux?                              │
│  ├─ 👍 SIM  → Use EasyPanel (GUI visual)               │
│  └─ 👎 NÃO  → Escolha o que preferir                   │
│                                                         │
│  Quer deploy automático (git push)?                     │
│  ├─ 👍 SIM  → Use EasyPanel                            │
│  └─ 👎 NÃO  → SSH Manual está OK                       │
│                                                         │
│  Quer zero configuração?                                │
│  ├─ 👍 SIM  → Use script vps-install.sh                │
│  └─ 👎 NÃO  → Configure manualmente                    │
│                                                         │
│  Prefere interface visual?                              │
│  ├─ 👍 SIM  → Use EasyPanel                            │
│  └─ 👎 NÃO  → SSH Manual                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📖 Guias por Cenário

### Cenário 1: "Quero o mais fácil e rápido" ⚡

```bash
# 1. Enviar para GitHub
git push origin main

# 2. Acessar EasyPanel
# Abrir: https://SEU_IP:3000

# 3. Criar projeto e conectar GitHub

# 4. Pronto! Deploy automático
```

📖 **Leia**: [`EASYPANEL-QUICKSTART.md`](EASYPANEL-QUICKSTART.md)

---

### Cenário 2: "Quero total controle via SSH" 💻

```bash
# 1. Conectar na VPS
ssh root@SEU_IP

# 2. Usar script automático
scp scripts/vps-install.sh root@IP:/tmp/
ssh root@IP
bash /tmp/vps-install.sh

# 3. Seguir instruções do script
```

📖 **Leia**: [`EASYPANEL-DEPLOY.md`](EASYPANEL-DEPLOY.md) (Método 2)

---

### Cenário 3: "Quero entender tudo passo a passo" 📚

```bash
# 1. Ler documentação completa
EASYPANEL-DEPLOY.md     # Guia detalhado
VPS-ROADMAP.md          # Roadmap visual
VPS-FAQ.md              # Perguntas frequentes

# 2. Seguir checklist
CHECKLIST-VPS.md        # Verificação passo a passo
```

---

## 🔧 Arquivos de Configuração

### Para EasyPanel

Nenhuma configuração adicional necessária! EasyPanel detecta Next.js automaticamente.

### Para SSH Manual

| Arquivo | Localização | Uso |
|---------|-------------|-----|
| `ecosystem.config.js` | Raiz do projeto | Configuração PM2 |
| `vps-install.sh` | `scripts/` | Script instalação automática |
| Nginx config | `/etc/nginx/sites-available/` | Reverse proxy |

---

## 📊 Comparação de Métodos

| Aspecto | EasyPanel | SSH + Script Auto | SSH Manual |
|---------|-----------|-------------------|------------|
| **Tempo** | ⏱️ 5 min | ⏱️ 15 min | ⏱️ 30 min |
| **Dificuldade** | ⭐ Fácil | ⭐⭐ Médio | ⭐⭐⭐ Difícil |
| **Deploy Auto** | ✅ Sim | ❌ Não | ❌ Não |
| **SSL Auto** | ✅ Sim | ✅ Sim | ⚙️ Manual |
| **Interface** | 🎨 GUI | 💻 CLI | 💻 CLI |
| **Controle** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Recomendado** | ✅ Sim | ⚙️ Opcional | ⚙️ Avançados |

---

## ✅ Checklist Rápido

Antes de começar, você precisa:

- [ ] VPS Hostinger ativa
- [ ] Acesso SSH (IP + senha)
- [ ] Código no GitHub
- [ ] Domínio (opcional mas recomendado)
- [ ] 10-30 minutos livres

Durante deploy:

- [ ] Seguir guia escolhido
- [ ] Anotar credenciais
- [ ] Testar cada etapa

Após deploy:

- [ ] Verificar site está no ar
- [ ] Testar HTTPS
- [ ] Testar formulário
- [ ] Configurar backup
- [ ] Configurar monitoramento

---

## 🎯 Passo a Passo Recomendado

### Para Iniciantes (EasyPanel)

```
1. Preparar código
   └─ Ver: EASYPANEL-QUICKSTART.md

2. Configurar EasyPanel
   └─ Ver: EASYPANEL-QUICKSTART.md

3. Deploy!
   └─ Ver: EASYPANEL-QUICKSTART.md

4. Verificar
   └─ Ver: CHECKLIST-VPS.md

5. Configurar extras
   └─ Backup, monitoramento, analytics
```

### Para Avançados (SSH)

```
1. Preparar VPS
   └─ Ver: EASYPANEL-DEPLOY.md (Método 2, Passo 2)

2. Clonar e configurar
   └─ Ver: EASYPANEL-DEPLOY.md (Método 2, Passos 3-5)

3. Configurar Nginx e SSL
   └─ Ver: EASYPANEL-DEPLOY.md (Método 2, Passos 6-7)

4. Verificar
   └─ Ver: CHECKLIST-VPS.md

5. Otimizar
   └─ Cache, CDN, monitoring
```

---

## 🆘 Precisa de Ajuda?

### 1. Procure na documentação

| Problema | Arquivo |
|----------|---------|
| Dúvidas gerais | [`VPS-FAQ.md`](VPS-FAQ.md) |
| Erro durante deploy | [`EASYPANEL-DEPLOY.md`](EASYPANEL-DEPLOY.md) → Troubleshooting |
| Não sei por onde começar | [`EASYPANEL-QUICKSTART.md`](EASYPANEL-QUICKSTART.md) |
| Problemas após deploy | [`CHECKLIST-VPS.md`](CHECKLIST-VPS.md) |

### 2. Comandos de diagnóstico

```bash
# Verificar status da aplicação
pm2 status

# Ver logs
pm2 logs cortinasbresser

# Verificar Nginx
systemctl status nginx
nginx -t

# Verificar recursos
htop
df -h
free -h

# Verificar portas
lsof -i :3000
lsof -i :80
lsof -i :443
```

### 3. Suporte Hostinger

- 💬 **Chat**: painel.hostinger.com (24/7)
- 📧 **Email**: support@hostinger.com
- 📚 **Base de conhecimento**: hostinger.com/tutorials

---

## 🔄 Fluxo de Atualização

### Deploy Automático (EasyPanel)

```bash
# No seu computador
git add .
git commit -m "Sua mensagem"
git push

# EasyPanel detecta e faz deploy automaticamente! ✅
```

### Deploy Manual (SSH)

```bash
# Conectar na VPS
ssh root@SEU_IP

# Ir para pasta do projeto
cd /var/www/cortinasbresser

# Atualizar código
git pull

# Reinstalar deps (se necessário)
npm install

# Rebuildar
npm run build

# Reiniciar (zero downtime!)
pm2 reload cortinasbresser
```

---

## 📊 Recursos Necessários

### Para o site Cortinas Bresser

**Mínimo** (funciona bem):
- CPU: 1 vCore
- RAM: 2GB
- Disco: 20GB SSD
- Tráfego: 1TB/mês

**Recomendado** (performance ótima):
- CPU: 2 vCores  
- RAM: 4GB
- Disco: 40GB SSD
- Tráfego: Ilimitado

💡 **Hostinger KVM 1** (R$ ~20/mês) é perfeito para começar!

---

## 🎉 Vantagens da VPS vs Hospedagem Compartilhada

### ✅ O que passa a funcionar na VPS:

| Recurso | Host Compartilhado | VPS |
|---------|-------------------|-----|
| **API Routes** | ❌ Não | ✅ Sim |
| **Server-Side Rendering** | ❌ Não | ✅ Sim |
| **Envio de Email (Nodemailer)** | ❌ Não | ✅ Sim |
| **WebSockets** | ❌ Não | ✅ Sim |
| **Background Jobs** | ❌ Não | ✅ Sim |
| **Controle Total** | ❌ Limitado | ✅ Total |
| **Performance** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Escalabilidade** | ❌ Limitada | ✅ Fácil |

---

## 🚀 Próximos Passos Após Deploy

### Imediato (Pós-Deploy)

- [ ] Testar tudo (veja checklist)
- [ ] Configurar SSL (se SSH manual)
- [ ] Configurar DNS
- [ ] Testar em diferentes dispositivos

### Primeira Semana

- [ ] Configurar backup automático
- [ ] Configurar monitoramento (UptimeRobot)
- [ ] Configurar Google Analytics
- [ ] Documentar credenciais (em local seguro!)

### Melhoria Contínua

- [ ] Adicionar CDN (Cloudflare)
- [ ] Otimizar imagens
- [ ] Configurar email transacional
- [ ] Implementar cache avançado
- [ ] Adicionar analytics detalhado

---

## 📞 Contatos e Links

### Documentação

- **Guia Rápido**: [`EASYPANEL-QUICKSTART.md`](EASYPANEL-QUICKSTART.md)
- **Guia Completo**: [`EASYPANEL-DEPLOY.md`](EASYPANEL-DEPLOY.md)
- **Checklist**: [`CHECKLIST-VPS.md`](CHECKLIST-VPS.md)
- **Roadmap Visual**: [`VPS-ROADMAP.md`](VPS-ROADMAP.md)
- **FAQ**: [`VPS-FAQ.md`](VPS-FAQ.md)

### Suporte

- **Hostinger**: painel.hostinger.com
- **EasyPanel Docs**: easypanel.io/docs
- **PM2 Docs**: pm2.keymetrics.io
- **Next.js Docs**: nextjs.org/docs

---

## 📝 Informações do Projeto

**Nome**: Cortinas Bresser  
**Tipo**: Site institucional + Formulário de orçamento  
**Framework**: Next.js 16  
**Deploy Target**: VPS Hostinger + EasyPanel  
**Versão da Documentação**: 1.0  
**Data**: 24/11/2025  

---

## 🎯 Escolha Seu Guia

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  Tempo disponível?                                           │
│  ├─ 5 min   → EASYPANEL-QUICKSTART.md                       │
│  ├─ 20 min  → EASYPANEL-DEPLOY.md                           │
│  └─ 30 min  → Leia tudo, comece com VPS-FAQ.md             │
│                                                              │
│  Experiência?                                                │
│  ├─ Iniciante     → EASYPANEL-QUICKSTART.md                 │
│  ├─ Intermediário → EASYPANEL-DEPLOY.md                     │
│  └─ Avançado      → Use scripts/vps-install.sh             │
│                                                              │
│  Objetivo?                                                   │
│  ├─ Deploy rápido     → EASYPANEL-QUICKSTART.md            │
│  ├─ Entender processo → VPS-ROADMAP.md                      │
│  ├─ Resolver problema → VPS-FAQ.md                          │
│  └─ Verificar status  → CHECKLIST-VPS.md                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ✨ Comece Agora!

**Recomendação**: Se é sua primeira vez, comece com:

1. 📖 [`EASYPANEL-QUICKSTART.md`](EASYPANEL-QUICKSTART.md) (5 min)
2. 🚀 Faça o deploy!
3. ✅ [`CHECKLIST-VPS.md`](CHECKLIST-VPS.md) (verificação)
4. 🎉 Site no ar!

---

**🎊 Boa sorte com seu deploy!**

Qualquer dúvida, consulte os guias ou o FAQ.

---

_Desenvolvido para: **Cortinas Bresser** 🎯_  
_Data: 24/11/2025_  
_Versão: 1.0_
