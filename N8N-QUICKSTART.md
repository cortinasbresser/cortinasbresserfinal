# 🚀 Guia Rápido: Deploy N8N + WhatsApp
## Cortinas Bresser - Início Rápido em 30 Minutos

---

## ⚡ QUICK START

### Passo 1: Preparar Ambiente (5 min)

```bash
# 1. Copiar arquivo de exemplo
cp .env.example .env

# 2. Editar .env com suas credenciais
# Use um editor de texto para preencher:
# - Senhas do PostgreSQL
# - Senhas do Redis
# - Senha do N8N
# - API Key da Evolution
```

### Passo 2: Gerar Chaves de Segurança (2 min)

```bash
# Gerar chave de criptografia do N8N (32 caracteres)
# Windows PowerShell:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Linux/Mac:
openssl rand -base64 32

# Copie o resultado e cole em N8N_ENCRYPTION_KEY no arquivo .env
```

### Passo 3: Configurar DNS (10 min)

Adicione estes registros no seu DNS (Cloudflare/Hostinger):

```
Tipo: A
Nome: n8n
Valor: [IP do seu VPS]
TTL: Auto

Tipo: A
Nome: evolution
Valor: [IP do seu VPS]
TTL: Auto
```

**Aguarde 5-10 minutos para propagação do DNS**

### Passo 4: Iniciar Serviços (5 min)

```bash
# Subir todos os containers
docker-compose up -d

# Verificar se estão rodando
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f
```

### Passo 5: Acessar N8N (2 min)

1. Abra: `https://n8n.cortinasbresser.com.br`
2. Login:
   - Usuário: `admin` (ou o que você definiu no .env)
   - Senha: (a que você definiu no .env)
3. Você verá a interface do N8N!

### Passo 6: Conectar WhatsApp (5 min)

1. Abra: `https://evolution.cortinasbresser.com.br`
2. Clique em "Create Instance"
3. Nome da instância: `cortinas_bresser`
4. Clique em "Generate QR Code"
5. **Abra WhatsApp Business no celular**
6. Vá em: Configurações → Aparelhos conectados → Conectar aparelho
7. Escaneie o QR Code
8. ✅ Pronto! WhatsApp conectado!

### Passo 7: Criar Primeiro Workflow (5 min)

1. No N8N, clique em "Create Workflow"
2. Adicione um nó "Webhook"
3. Configure:
   - Method: POST
   - Path: `whatsapp`
4. Adicione um nó "Evolution API"
5. Configure:
   - Instance: `cortinas_bresser`
   - Action: Send Message
6. Salve e ative o workflow
7. Copie a URL do webhook

### Passo 8: Configurar Webhook na Evolution (3 min)

1. Volte para Evolution API
2. Clique na instância `cortinas_bresser`
3. Vá em "Webhooks"
4. Cole a URL do webhook do N8N
5. Marque os eventos:
   - `messages.upsert` (mensagens recebidas)
   - `messages.update` (mensagens atualizadas)
6. Salve

---

## ✅ TESTE RÁPIDO

Envie uma mensagem para o WhatsApp Business:

```
Olá! Quero um orçamento
```

Se tudo estiver correto:
1. A mensagem chegará no WhatsApp Business
2. O webhook enviará para o N8N
3. O N8N processará e responderá automaticamente

---

## 🔧 COMANDOS ÚTEIS

### Gerenciar Containers

```bash
# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f n8n
docker-compose logs -f evolution-api

# Reiniciar serviço específico
docker-compose restart n8n
docker-compose restart evolution-api

# Parar tudo
docker-compose down

# Parar e remover volumes (CUIDADO!)
docker-compose down -v
```

### Backup

```bash
# Backup do banco de dados
docker exec cortinasbresser-postgres pg_dump -U n8n n8n > backup-n8n-$(date +%Y%m%d).sql

# Backup dos workflows do N8N
docker exec cortinasbresser-n8n n8n export:workflow --all --output=/backups/workflows-$(date +%Y%m%d).json
```

### Restaurar Backup

```bash
# Restaurar banco
cat backup-n8n-20251207.sql | docker exec -i cortinasbresser-postgres psql -U n8n n8n

# Restaurar workflows
docker exec cortinasbresser-n8n n8n import:workflow --input=/backups/workflows-20251207.json
```

---

## 🆘 TROUBLESHOOTING RÁPIDO

### N8N não abre

```bash
# Verificar logs
docker-compose logs n8n

# Verificar se porta está aberta
curl http://localhost:5678/healthz

# Reiniciar
docker-compose restart n8n
```

### Evolution API não conecta WhatsApp

```bash
# Verificar logs
docker-compose logs evolution-api

# Limpar instância e tentar novamente
# (via interface web da Evolution)

# Verificar se Redis está rodando
docker-compose logs redis
```

### Webhook não recebe mensagens

1. Verifique se o workflow está ATIVADO no N8N
2. Verifique se a URL do webhook está correta na Evolution
3. Teste o webhook manualmente:

```bash
curl -X POST https://n8n.cortinasbresser.com.br/webhook/whatsapp \
  -H "Content-Type: application/json" \
  -d '{"message": "teste"}'
```

### Banco de dados não inicia

```bash
# Verificar logs
docker-compose logs postgres

# Verificar permissões do volume
ls -la postgres_data/

# Recriar banco (CUIDADO: apaga dados!)
docker-compose down -v
docker-compose up -d
```

---

## 📊 CHECKLIST DE VERIFICAÇÃO

Antes de considerar o setup completo, verifique:

- [ ] N8N acessível em `https://n8n.cortinasbresser.com.br`
- [ ] Evolution API acessível em `https://evolution.cortinasbresser.com.br`
- [ ] WhatsApp conectado (QR Code escaneado)
- [ ] Webhook configurado
- [ ] Primeiro workflow criado e ativado
- [ ] Teste de mensagem funcionando
- [ ] PostgreSQL rodando sem erros
- [ ] Redis rodando sem erros
- [ ] SSL/HTTPS funcionando
- [ ] Backup configurado

---

## 🎯 PRÓXIMOS PASSOS

Após o setup básico funcionar:

1. **Criar workflows avançados**
   - Atendimento automático
   - Qualificação de leads
   - Integração com formulário

2. **Configurar horário de atendimento**
   - Mensagem fora do horário
   - Redirecionamento para humano

3. **Integrar com o site**
   - Webhook do formulário
   - Tracking de conversões

4. **Otimizar e monitorar**
   - Analisar métricas
   - Ajustar mensagens
   - Melhorar conversão

---

## 📚 RECURSOS

- **Documentação N8N:** https://docs.n8n.io
- **Documentação Evolution:** https://doc.evolution-api.com
- **Guia Completo:** Ver arquivo `N8N-WHATSAPP-SETUP.md`
- **Suporte:** Discord N8N ou fórum da comunidade

---

## 🔐 SEGURANÇA

**IMPORTANTE:** Nunca compartilhe:
- ❌ Arquivo `.env`
- ❌ Senhas do banco de dados
- ❌ API Keys
- ❌ Chave de criptografia do N8N

**Sempre use:**
- ✅ Senhas fortes (mínimo 16 caracteres)
- ✅ HTTPS (SSL/TLS)
- ✅ Autenticação básica do N8N
- ✅ Firewall configurado
- ✅ Backups regulares

---

**Tempo total estimado:** 30-40 minutos  
**Dificuldade:** Intermediária  
**Pré-requisitos:** Docker, Docker Compose, VPS com IP público

**Boa sorte! 🚀**
