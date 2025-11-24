# 🚀 Deploy na VPS Hostinger com EasyPanel

## 📖 Guia Completo de Instalação

Este guia vai te ajudar a instalar o site **Cortinas Bresser** na sua VPS Hostinger usando o EasyPanel via SSH.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ VPS Hostinger ativa
- ✅ EasyPanel instalado na VPS
- ✅ Acesso SSH à VPS
- ✅ Domínio configurado (opcional, mas recomendado)
- ✅ Git instalado localmente
- ✅ Repositório Git do projeto (GitHub, GitLab, etc.)

---

## 🎯 Método 1: Deploy via GitHub + EasyPanel (RECOMENDADO)

### Passo 1: Preparar o Repositório

#### 1.1. Criar Repositório no GitHub

```bash
# No seu computador, na pasta do projeto:
cd e:\CB\www\cortinasbresser

# Inicializar Git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Preparando deploy para VPS"

# Criar repositório no GitHub e adicionar remote
git remote add origin https://github.com/SEU_USUARIO/cortinasbresser.git

# Enviar para GitHub
git push -u origin main
```

#### 1.2. Modificar Configuração para Servidor Node.js

O EasyPanel pode rodar o Next.js como aplicação Node.js completa (sem precisar de exportação estática).

Crie um novo arquivo `next.config.production.mjs` na raiz:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [],
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
```

### Passo 2: Acessar o EasyPanel

1. **Acesse o painel EasyPanel** da sua VPS:
   ```
   https://SEU_IP:3000
   ou
   https://panel.seudominio.com
   ```

2. **Faça login** com suas credenciais

### Passo 3: Criar Novo Projeto

1. No EasyPanel, clique em **"+ New Project"**
2. Escolha **"GitHub"** como fonte
3. Conecte sua conta do GitHub (se ainda não conectou)
4. Selecione o repositório **cortinasbresser**
5. Configure:
   - **Name**: `cortinasbresser`
   - **Branch**: `main` (ou `master`)
   - **Framework**: `Next.js`

### Passo 4: Configurar Build Settings

No EasyPanel, configure:

#### Build Command:
```bash
npm install && npm run build
```

#### Start Command:
```bash
npm start
```

#### Environment Variables:
```
NODE_ENV=production
PORT=3000
```

### Passo 5: Configurar Domínio (Opcional)

1. Vá em **"Domains"**
2. Adicione seu domínio: `www.cortinasbresser.com.br`
3. EasyPanel vai gerar certificado SSL automático
4. Configure DNS no seu provedor:
   - **Tipo A**: Aponte para o IP da VPS
   - **CNAME**: `www` → seu domínio principal

### Passo 6: Deploy!

1. Clique em **"Deploy"**
2. Aguarde o build (5-10 minutos)
3. Site estará no ar! 🎉

---

## 🎯 Método 2: Deploy Manual via SSH + Docker

Se preferir instalar manualmente via SSH:

### Passo 1: Conectar via SSH

```bash
ssh root@SEU_IP_DA_VPS
# Digite a senha quando solicitado
```

### Passo 2: Instalar Dependências

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verificar instalação
node -v  # deve mostrar v20.x.x
npm -v   # deve mostrar 10.x.x

# Instalar PM2 (gerenciador de processos)
npm install -g pm2

# Instalar Git
apt install -y git
```

### Passo 3: Clonar Repositório

```bash
# Criar diretório para aplicações
mkdir -p /var/www
cd /var/www

# Clonar projeto
git clone https://github.com/SEU_USUARIO/cortinasbresser.git
cd cortinasbresser
```

### Passo 4: Instalar e Buildar

```bash
# Instalar dependências
npm install

# Buildar aplicação
npm run build

# Testar localmente
npm start
```

### Passo 5: Configurar PM2

```bash
# Criar arquivo de configuração PM2
nano ecosystem.config.js
```

Cole o seguinte conteúdo:

```javascript
module.exports = {
  apps: [{
    name: 'cortinasbresser',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/cortinasbresser',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Salve (Ctrl+X, Y, Enter)

```bash
# Iniciar aplicação com PM2
pm2 start ecosystem.config.js

# Verificar status
pm2 status

# Ver logs
pm2 logs cortinasbresser

# Salvar configuração para reiniciar automaticamente
pm2 save
pm2 startup
```

### Passo 6: Configurar Nginx (Reverse Proxy)

```bash
# Instalar Nginx
apt install -y nginx

# Criar configuração do site
nano /etc/nginx/sites-available/cortinasbresser
```

Cole:

```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Ativar site
ln -s /etc/nginx/sites-available/cortinasbresser /etc/nginx/sites-enabled/

# Testar configuração
nginx -t

# Reiniciar Nginx
systemctl restart nginx
```

### Passo 7: Configurar SSL (HTTPS)

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obter certificado SSL (gratuito)
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br

# Seguir instruções interativas
# Escolher: "Redirect" (opção 2) para redirecionar HTTP → HTTPS

# Renovação automática já está configurada!
# Testar renovação:
certbot renew --dry-run
```

---

## 🔄 Atualizações Futuras

### Via EasyPanel:
- Apenas faça `git push` para o GitHub
- EasyPanel vai fazer deploy automático!

### Via SSH Manual:
```bash
# Conectar via SSH
ssh root@SEU_IP_DA_VPS

# Ir para pasta do projeto
cd /var/www/cortinasbresser

# Puxar atualizações
git pull

# Reinstalar dependências (se necessário)
npm install

# Rebuildar
npm run build

# Reiniciar aplicação
pm2 restart cortinasbresser

# Verificar status
pm2 status
```

---

## 🧪 Testes Após Deploy

✅ Checklist de verificação:

- [ ] Site acessível pelo IP ou domínio
- [ ] HTTPS funcionando (cadeado verde)
- [ ] Página inicial carrega
- [ ] Imagens aparecem
- [ ] CSS aplicado corretamente
- [ ] Formulário funciona
- [ ] WhatsApp abre corretamente
- [ ] Responsivo em mobile
- [ ] Console sem erros (F12)

---

## 🛠️ Comandos Úteis

### PM2:
```bash
pm2 status                    # Ver status
pm2 logs cortinasbresser      # Ver logs em tempo real
pm2 restart cortinasbresser   # Reiniciar app
pm2 stop cortinasbresser      # Parar app
pm2 delete cortinasbresser    # Remover app
pm2 monit                     # Monitor em tempo real
```

### Nginx:
```bash
systemctl status nginx        # Ver status
systemctl restart nginx       # Reiniciar
systemctl reload nginx        # Recarregar config
nginx -t                      # Testar configuração
tail -f /var/log/nginx/error.log  # Ver logs de erro
```

### Monitoramento:
```bash
htop                          # Monitor de recursos
df -h                         # Espaço em disco
free -h                       # Memória RAM
```

---

## 🔥 Firewall e Segurança

```bash
# Configurar UFW (Firewall)
ufw allow 22/tcp              # SSH
ufw allow 80/tcp              # HTTP
ufw allow 443/tcp             # HTTPS
ufw allow 3000/tcp            # EasyPanel (se necessário)
ufw enable                    # Ativar firewall
ufw status                    # Ver status
```

---

## 📞 Suporte e Troubleshooting

### Site não abre:
```bash
# Verificar se app está rodando
pm2 status

# Ver logs de erro
pm2 logs cortinasbresser --lines 100

# Verificar nginx
systemctl status nginx
nginx -t
```

### Porta 3000 já em uso:
```bash
# Ver o que está usando a porta
lsof -i :3000

# Matar processo se necessário
kill -9 PID_DO_PROCESSO
```

### Atualização não aparece:
```bash
# Limpar build e cache
cd /var/www/cortinasbresser
rm -rf .next
npm run build
pm2 restart cortinasbresser
```

### Problemas de memória:
```bash
# Ver uso de memória
free -h

# Criar swap (se necessário)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

---

## 🎯 Recursos da VPS Necessários

**Mínimo Recomendado:**
- CPU: 1 vCore
- RAM: 1GB (2GB ideal)
- Disco: 20GB
- Largura de Banda: 1TB/mês

**Para Melhor Performance:**
- CPU: 2 vCores
- RAM: 2-4GB
- Disco: 40GB SSD
- Largura de Banda: Ilimitada

---

## ✅ Vantagens do Deploy em VPS

Comparado com hospedagem compartilhada (Locaweb):

✅ **Funcionalidades Node.js completas**
- API Routes funcionam perfeitamente
- Envio de email via Nodemailer
- Server-Side Rendering (SSR)
- Incremental Static Regeneration (ISR)
- Middleware personalizado

✅ **Performance**
- Sem limitações de processamento
- Mais rápido que host compartilhado
- Controle total sobre otimizações

✅ **Escalabilidade**
- Fácil upgrade de recursos
- Load balancing se necessário
- CDN integração facilitada

✅ **Controle Total**
- Acesso SSH completo
- Instalar qualquer software
- Configurações avançadas

---

## 📊 Comparação de Métodos

| Aspecto | EasyPanel | SSH Manual |
|---------|-----------|------------|
| **Facilidade** | ⭐⭐⭐⭐⭐ Muito fácil | ⭐⭐⭐ Requer conhecimento |
| **Deploy Automático** | ✅ Sim (GitHub) | ❌ Manual |
| **SSL** | ✅ Automático | ⚙️ Manual (Certbot) |
| **Monitoramento** | ✅ Interface visual | ⚙️ Linha de comando |
| **Logs** | ✅ Interface visual | ⚙️ Via SSH |
| **Atualizações** | ✅ Git push | ⚙️ Git pull + rebuild |
| **Recomendado para** | Iniciantes e intermediários | Avançados |

---

## 🎉 Pronto!

Seu site **Cortinas Bresser** agora está rodando na VPS Hostinger!

**Próximos passos:**
1. ✅ Configure backup automático
2. ✅ Configure monitoramento (Uptime Robot)
3. ✅ Configure Google Analytics
4. ✅ Otimize imagens para CDN
5. ✅ Configure email transacional (SendGrid, Mailgun, etc.)

---

**Desenvolvido para**: Cortinas Bresser 🎯  
**Data**: 24/11/2025  
**Versão**: 1.0 (VPS + EasyPanel)  
