# 🚀 IMPLEMENTAÇÃO N8N + WHATSAPP - GUIA PASSO A PASSO

**Data:** 07/12/2025  
**Projeto:** Cortinas Bresser  
**Tempo estimado:** 30-45 minutos

---

## ✅ PRÉ-REQUISITOS VERIFICADOS

- ✅ Docker instalado: **v28.5.1**
- ✅ Docker Compose instalado: **v2.40.0**
- ✅ Arquivo .env existe
- ✅ Arquivo .env.example configurado

---

## 📋 PASSO 1: CONFIGURAR VARIÁVEIS DE AMBIENTE

### 1.1 Abrir arquivo .env

Abra o arquivo `.env` no seu editor e **adicione/atualize** as seguintes variáveis:

```env
# ==============================================
# N8N - Automação de Workflows
# ==============================================
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=CortinasBresser2025!
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http
N8N_WEBHOOK_URL=http://localhost:5678
N8N_ENCRYPTION_KEY=df1c1f7574774c101ea3bc3b35accb0a

# ==============================================
# Evolution API - WhatsApp Gateway
# ==============================================
EVOLUTION_API_URL=http://localhost:8080
EVOLUTION_API_KEY=bresser_api_key_2025_secure
WHATSAPP_INSTANCE_NAME=cortinas_bresser

# ==============================================
# PostgreSQL - Banco de Dados
# ==============================================
POSTGRES_USER=n8n
POSTGRES_PASSWORD=N8nPostgres2025!Bresser
POSTGRES_DB=n8n

# ==============================================
# Redis - Cache e Filas
# ==============================================
REDIS_PASSWORD=RedisN8n2025!Bresser
```

### 1.2 Verificar variáveis existentes

Certifique-se de que estas variáveis **já existem** no seu `.env`:

```env
SMTP_HOST=mail.seuservidor.com
SMTP_PORT=587
SMTP_USER=seu@email.com
SMTP_PASS=senha_ou_token
RECIPIENT_EMAIL=loja@cortinasbresser.com.br
WHATSAPP_NUMBER=5511994013938
```

---

## 📋 PASSO 2: VERIFICAR DOCKER-COMPOSE.YML

O arquivo `docker-compose.yml` já está configurado com todos os serviços necessários:

- ✅ **app** - Next.js (aplicação principal)
- ✅ **postgres** - Banco de dados
- ✅ **redis** - Cache
- ✅ **n8n** - Plataforma de automação
- ✅ **evolution-api** - Gateway WhatsApp
- ✅ **n8n-worker** - Processamento de filas

**Nenhuma ação necessária neste passo.**

---

## 📋 PASSO 3: CRIAR BANCO DE DADOS

### 3.1 Subir apenas o PostgreSQL primeiro

Execute no terminal:

```powershell
docker-compose up -d postgres
```

### 3.2 Aguardar PostgreSQL iniciar (15 segundos)

```powershell
Start-Sleep -Seconds 15
```

### 3.3 Executar script de setup do banco

```powershell
docker-compose exec postgres psql -U n8n -d n8n -f /docker-entrypoint-initdb.d/setup-n8n.sql
```

---

## 📋 PASSO 4: SUBIR TODOS OS SERVIÇOS

### 4.1 Iniciar todos os containers

```powershell
docker-compose up -d
```

### 4.2 Verificar status dos containers

```powershell
docker-compose ps
```

**Resultado esperado:** Todos os serviços devem estar com status "Up"

---

## 📋 PASSO 5: ACESSAR N8N

### 5.1 Abrir N8N no navegador

URL: **http://localhost:5678**

### 5.2 Fazer login

- **Usuário:** `admin`
- **Senha:** `CortinasBresser2025!`

### 5.3 Importar workflow

1. Clique em **"Workflows"** no menu lateral
2. Clique em **"Import from File"**
3. Selecione o arquivo: `n8n-workflows/atendimento-whatsapp.json`
4. Clique em **"Import"**

---

## 📋 PASSO 6: CONFIGURAR CREDENCIAIS NO N8N

### 6.1 Configurar PostgreSQL

1. Vá em **Settings → Credentials**
2. Clique em **"Add Credential"**
3. Selecione **"Postgres"**
4. Preencha:
   - **Host:** `postgres`
   - **Database:** `n8n`
   - **User:** `n8n`
   - **Password:** `N8nPostgres2025!Bresser`
   - **Port:** `5432`
5. Clique em **"Save"**

### 6.2 Configurar SMTP (Email)

1. Adicione nova credencial tipo **"SMTP"**
2. Preencha com os dados do seu `.env`:
   - **Host:** (seu SMTP_HOST)
   - **Port:** (seu SMTP_PORT)
   - **User:** (seu SMTP_USER)
   - **Password:** (seu SMTP_PASS)
3. Clique em **"Save"**

---

## 📋 PASSO 7: CONECTAR WHATSAPP

### 7.1 Acessar Evolution API

URL: **http://localhost:8080**

### 7.2 Criar instância

1. Clique em **"Create Instance"**
2. Nome da instância: `cortinas_bresser`
3. API Key: `bresser_api_key_2025_secure`
4. Clique em **"Create"**

### 7.3 Conectar WhatsApp via QR Code

1. Clique em **"Connect"** na instância criada
2. Escaneie o **QR Code** com o WhatsApp Business
3. Aguarde confirmação de conexão

### 7.4 Configurar Webhook

1. Na instância, clique em **"Settings"**
2. Em **"Webhook URL"**, adicione:
   ```
   http://n8n:5678/webhook/whatsapp-message
   ```
3. Clique em **"Save"**

---

## 📋 PASSO 8: ATIVAR WORKFLOW NO N8N

### 8.1 Abrir workflow importado

1. Volte para o N8N (http://localhost:5678)
2. Abra o workflow **"Atendimento WhatsApp - Cortinas Bresser"**

### 8.2 Ativar workflow

1. No canto superior direito, clique no botão **"Inactive"**
2. Ele mudará para **"Active"** (verde)

---

## 📋 PASSO 9: TESTAR AUTOMAÇÃO

### 9.1 Enviar mensagem de teste

Envie uma mensagem para o número do WhatsApp conectado:

```
Olá, quero um orçamento
```

### 9.2 Verificar resposta automática

Você deve receber uma resposta imediata do bot.

### 9.3 Verificar logs no N8N

1. Vá em **"Executions"** no menu lateral
2. Você verá a execução do workflow
3. Clique para ver detalhes

### 9.4 Verificar banco de dados

```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;"
```

---

## 📋 PASSO 10: MONITORAMENTO

### 10.1 Ver logs em tempo real

```powershell
# Logs do N8N
docker-compose logs -f n8n

# Logs da Evolution API
docker-compose logs -f evolution-api

# Todos os logs
docker-compose logs -f
```

### 10.2 Verificar métricas

```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT * FROM metricas ORDER BY data DESC LIMIT 7;"
```

---

## 🎯 CHECKLIST FINAL

Marque conforme completa:

- [ ] Arquivo .env configurado
- [ ] Banco de dados criado
- [ ] Todos os containers rodando
- [ ] N8N acessível (http://localhost:5678)
- [ ] Workflow importado
- [ ] Credenciais configuradas
- [ ] WhatsApp conectado via QR Code
- [ ] Webhook configurado
- [ ] Workflow ativado
- [ ] Teste de mensagem realizado
- [ ] Resposta automática funcionando
- [ ] Lead salvo no banco de dados

---

## 🆘 TROUBLESHOOTING

### Container não sobe

```powershell
docker-compose down
docker-compose up -d
docker-compose logs [nome-do-serviço]
```

### WhatsApp desconecta

1. Reescanear QR Code na Evolution API
2. Verificar se o celular está com internet
3. Reiniciar container: `docker-compose restart evolution-api`

### Webhook não funciona

1. Verificar se workflow está ativo (verde)
2. Verificar URL do webhook na Evolution API
3. Testar manualmente:
   ```powershell
   curl -X POST http://localhost:5678/webhook-test/whatsapp-message
   ```

### Banco de dados não conecta

```powershell
docker-compose restart postgres
docker-compose exec postgres psql -U n8n -d n8n -c "\dt"
```

---

## 📞 PRÓXIMOS PASSOS

Após tudo funcionando localmente:

1. **Deploy em Produção**
   - Configurar DNS (n8n.cortinasbresser.com.br)
   - Configurar SSL/HTTPS
   - Atualizar variáveis de ambiente para produção

2. **Personalização**
   - Ajustar mensagens do bot
   - Adicionar novos FAQs
   - Criar dashboards de métricas

3. **Expansão**
   - Integrar com CRM
   - Adicionar IA (GPT)
   - Criar mais automações

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- **Setup Completo:** `N8N-WHATSAPP-SETUP.md`
- **Início Rápido:** `N8N-QUICKSTART.md`
- **README:** `N8N-README.md`
- **Resumo:** `RESUMO-N8N.md`

---

**🎉 Pronto! Você está pronto para revolucionar o atendimento da Cortinas Bresser!**
