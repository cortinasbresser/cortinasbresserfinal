# 🐳 Deploy com Docker

Guia para fazer deploy do **Cortinas Bresser** usando Docker.

---

## 📦 Arquivos Docker Criados

- **`Dockerfile`** - Imagem Docker otimizada para Next.js
- **`.dockerignore`** - Arquivos excluídos da imagem
- **`docker-compose.yml`** - Orquestração do container

---

## 📍 Localização dos Arquivos

```
e:\CB\www\cortinasbresser\
├── Dockerfile              ← Imagem Docker
├── .dockerignore          ← Exclusões
└── docker-compose.yml     ← Compose config
```

---

## 🚀 Deploy Local (Desenvolvimento)

### Método 1: Docker Compose (Recomendado)

```bash
# Build e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### Método 2: Docker Manual

```bash
# Build da imagem
docker build -t cortinasbresser .

# Executar container
docker run -d \
  --name cortinasbresser \
  -p 3000:3000 \
  -e NODE_ENV=production \
  cortinasbresser

# Ver logs
docker logs -f cortinasbresser

# Parar e remover
docker stop cortinasbresser
docker rm cortinasbresser
```

**Acesse**: http://localhost:3000

---

## 🌐 Deploy na VPS com Docker

### Passo 1: Preparar VPS

```bash
# Conectar na VPS
ssh root@SEU_IP

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install -y docker-compose

# Verificar instalação
docker --version
docker-compose --version
```

### Passo 2: Clonar Projeto

```bash
# Criar diretório
mkdir -p /var/www
cd /var/www

# Clonar repositório
git clone https://github.com/SEU_USUARIO/cortinasbresser.git
cd cortinasbresser
```

### Passo 3: Build e Deploy

```bash
# Build e iniciar com Docker Compose
docker-compose up -d --build

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f cortinasbresser
```

### Passo 4: Configurar Nginx (Reverse Proxy)

```bash
# Instalar Nginx
apt install -y nginx

# Criar configuração
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
rm -f /etc/nginx/sites-enabled/default

# Testar e reiniciar
nginx -t
systemctl restart nginx
```

### Passo 5: SSL com Certbot

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obter certificado
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br

# Escolha: Redirect (opção 2)
```

---

## 🔄 Atualizações

```bash
# Conectar na VPS
ssh root@SEU_IP

# Ir para pasta do projeto
cd /var/www/cortinasbresser

# Puxar atualizações
git pull

# Rebuild e reiniciar
docker-compose up -d --build

# Verificar logs
docker-compose logs -f
```

---

## 🛠️ Comandos Úteis

### Docker Compose

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Rebuild
docker-compose up -d --build

# Logs
docker-compose logs -f

# Ver status
docker-compose ps

# Reiniciar
docker-compose restart
```

### Docker Direto

```bash
# Listar containers
docker ps

# Ver logs
docker logs -f cortinasbresser

# Executar comando no container
docker exec -it cortinasbresser sh

# Parar container
docker stop cortinasbresser

# Remover container
docker rm cortinasbresser

# Listar imagens
docker images

# Remover imagem
docker rmi cortinasbresser
```

### Limpeza

```bash
# Remover containers parados
docker container prune

# Remover imagens não usadas
docker image prune

# Limpeza completa (cuidado!)
docker system prune -a
```

---

## 🔒 Variáveis de Ambiente

Se precisar de variáveis de ambiente, crie `.env` na raiz:

```env
NODE_ENV=production
PORT=3000
# Adicione outras variáveis conforme necessário
```

E atualize `docker-compose.yml`:

```yaml
services:
  cortinasbresser:
    # ... outras configs
    env_file:
      - .env
```

---

## 📊 Vantagens do Docker

✅ **Consistência**
- Mesmo ambiente em dev, staging e produção
- "Funciona na minha máquina" problema resolvido

✅ **Isolamento**
- Aplicação isolada do sistema host
- Não conflita com outras aplicações

✅ **Portabilidade**
- Funciona em qualquer servidor com Docker
- Fácil migração entre VPS

✅ **Escalabilidade**
- Fácil criar múltiplas instâncias
- Load balancing simples

✅ **Rollback Rápido**
- Voltar para versão anterior facilmente
- Imagens versionadas

---

## 🎯 Deploy em EasyPanel com Docker

EasyPanel usa Docker por baixo dos panos, então:

1. **Envie código para GitHub**
2. **Configure projeto no EasyPanel**
3. **EasyPanel detecta Dockerfile automaticamente**
4. **Build e deploy acontecem automaticamente**

Sem necessidade de configuração adicional!

---

## 📋 Troubleshooting

### Container não inicia

```bash
# Ver logs de erro
docker-compose logs

# Verificar se porta está em uso
lsof -i :3000

# Verificar saúde do container
docker inspect cortinasbresser
```

### Build falha

```bash
# Limpar cache e rebuildar
docker-compose build --no-cache

# Verificar espaço em disco
df -h
```

### Aplicação lenta

```bash
# Ver uso de recursos
docker stats

# Limitar recursos (docker-compose.yml)
services:
  cortinasbresser:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

### Permissões

```bash
# Se tiver erro de permissão
sudo chown -R $USER:$USER /var/www/cortinasbresser
```

---

## 🚀 Opções Avançadas

### Docker Swarm

Para deploy em cluster:

```bash
docker swarm init
docker stack deploy -c docker-compose.yml cortinasbresser
```

### Registry Privado

Para armazenar imagens:

```bash
# Build
docker build -t registry.seudominio.com/cortinasbresser .

# Push
docker push registry.seudominio.com/cortinasbresser

# Pull na VPS
docker pull registry.seudominio.com/cortinasbresser
```

---

## 📞 Comparação: Docker vs PM2

| Aspecto | Docker | PM2 |
|---------|--------|-----|
| **Isolamento** | ✅ Completo | ❌ Limitado |
| **Portabilidade** | ✅ Total | ⚙️ Depende do host |
| **Overhead** | ⚙️ Médio | ✅ Baixo |
| **Complexidade** | ⚙️ Média | ✅ Simples |
| **Escalabilidade** | ✅ Excelente | ⚙️ Boa |
| **Rollback** | ✅ Fácil | ⚙️ Manual |

**Recomendação**:
- **Docker**: Para ambientes complexos, múltiplos serviços, ou se já usa Docker
- **PM2**: Para simplicidade, baixo overhead, single app

---

## ✅ Próximos Passos

1. ✅ Teste local: `docker-compose up`
2. ✅ Configure VPS com Docker
3. ✅ Faça deploy: `docker-compose up -d --build`
4. ✅ Configure Nginx e SSL
5. ✅ Configure backup e monitoramento

---

**Desenvolvido para**: Cortinas Bresser 🎯  
**Data**: 24/11/2025  
**Versão**: 1.0 (Docker)
