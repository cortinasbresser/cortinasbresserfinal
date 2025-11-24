#!/bin/bash

# Script de instalação automatizada para VPS Hostinger
# Uso: bash vps-install.sh

echo "🚀 Instalando Cortinas Bresser na VPS..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}❌ Por favor, execute como root (sudo bash vps-install.sh)${NC}"
  exit 1
fi

echo -e "${YELLOW}📦 Atualizando sistema...${NC}"
apt update && apt upgrade -y

echo -e "${YELLOW}📦 Instalando Node.js 20 LTS...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo -e "${GREEN}✅ Node.js $(node -v) instalado${NC}"
echo -e "${GREEN}✅ NPM $(npm -v) instalado${NC}"

echo -e "${YELLOW}📦 Instalando PM2...${NC}"
npm install -g pm2

echo -e "${YELLOW}📦 Instalando Git...${NC}"
apt install -y git

echo -e "${YELLOW}📦 Instalando Nginx...${NC}"
apt install -y nginx

echo -e "${YELLOW}📦 Instalando Certbot (SSL)...${NC}"
apt install -y certbot python3-certbot-nginx

echo ""
read -p "🔗 Digite a URL do repositório GitHub: " REPO_URL
read -p "🌐 Digite seu domínio (ex: cortinasbresser.com.br): " DOMAIN

echo ""
echo -e "${YELLOW}📥 Clonando repositório...${NC}"
mkdir -p /var/www
cd /var/www

if [ -d "cortinasbresser" ]; then
  echo -e "${YELLOW}⚠️  Diretório já existe, removendo...${NC}"
  rm -rf cortinasbresser
fi

git clone $REPO_URL cortinasbresser
cd cortinasbresser

echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm install

echo -e "${YELLOW}🔨 Buildando aplicação...${NC}"
npm run build

echo -e "${YELLOW}⚙️  Configurando PM2...${NC}"
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo -e "${YELLOW}🌐 Configurando Nginx...${NC}"
cat > /etc/nginx/sites-available/cortinasbresser << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/cortinasbresser /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo -e "${YELLOW}🔒 Configurando SSL (HTTPS)...${NC}"
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --register-unsafely-without-email --redirect

echo -e "${YELLOW}🔥 Configurando Firewall...${NC}"
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo ""
echo -e "🌐 Seu site está no ar em: ${GREEN}https://$DOMAIN${NC}"
echo -e "🌐 Também disponível em: ${GREEN}https://www.$DOMAIN${NC}"
echo ""
echo -e "${YELLOW}📊 Comandos úteis:${NC}"
echo -e "  pm2 status                  - Ver status da aplicação"
echo -e "  pm2 logs cortinasbresser    - Ver logs"
echo -e "  pm2 restart cortinasbresser - Reiniciar aplicação"
echo ""
echo -e "${YELLOW}🔄 Para atualizar o site:${NC}"
echo -e "  cd /var/www/cortinasbresser"
echo -e "  git pull"
echo -e "  npm install"
echo -e "  npm run build"
echo -e "  pm2 restart cortinasbresser"
echo ""
echo -e "${GREEN}🎉 Pronto para usar!${NC}"
echo ""
