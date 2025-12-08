# ✅ CHECKLIST DE IMPLEMENTAÇÃO N8N + WHATSAPP

**Projeto:** Cortinas Bresser  
**Data:** 07/12/2025  
**Status:** Em Progresso

---

## 🎯 FASE 1: PREPARAÇÃO (5 min)

- [ ] **Docker Desktop instalado**
  - Versão: Docker 28.5.1 ✅
  - Docker Compose: v2.40.0 ✅

- [ ] **Docker Desktop rodando**
  - Ícone verde na bandeja do sistema
  - Testado com: `docker ps`

- [ ] **Arquivo .env configurado**
  - Copiar de `.env.example` se necessário
  - Atualizar senhas e chaves
  - Verificar SMTP configurado

- [ ] **Arquivos necessários presentes**
  - `docker-compose.yml` ✅
  - `database/setup-n8n.sql` ✅
  - `n8n-workflows/atendimento-whatsapp.json`
  - `scripts/start-n8n.ps1` ✅

---

## 🚀 FASE 2: INSTALAÇÃO (5 min)

- [ ] **Executar script de instalação**
  ```powershell
  .\scripts\start-n8n.ps1
  ```

- [ ] **Verificar containers rodando**
  ```powershell
  docker-compose ps
  ```
  
  Containers esperados:
  - [ ] `cortinasbresser-postgres` - Running
  - [ ] `cortinasbresser-redis` - Running
  - [ ] `cortinasbresser-n8n` - Running
  - [ ] `cortinasbresser-evolution` - Running
  - [ ] `cortinasbresser-n8n-worker` - Running

- [ ] **Verificar logs sem erros**
  ```powershell
  docker-compose logs --tail=50
  ```

---

## ⚙️ FASE 3: CONFIGURAÇÃO N8N (3 min)

- [ ] **Acessar N8N**
  - URL: http://localhost:5678
  - Usuário: `admin`
  - Senha: (conforme .env)

- [ ] **Importar workflow**
  - Workflows → Import from File
  - Arquivo: `n8n-workflows/atendimento-whatsapp.json`
  - Verificar importação bem-sucedida

- [ ] **Configurar credenciais PostgreSQL**
  - Settings → Credentials → Add Credential
  - Tipo: Postgres
  - Host: `postgres`
  - Database: `n8n`
  - User: `n8n`
  - Password: (conforme .env)
  - Port: `5432`

- [ ] **Configurar credenciais SMTP**
  - Settings → Credentials → Add Credential
  - Tipo: SMTP
  - Preencher com dados do .env

---

## 📱 FASE 4: CONFIGURAÇÃO WHATSAPP (2 min)

- [ ] **Acessar Evolution API**
  - URL: http://localhost:8080

- [ ] **Criar instância**
  - Nome: `cortinas_bresser`
  - API Key: `bresser_api_key_2025_secure`

- [ ] **Conectar WhatsApp**
  - Escanear QR Code com WhatsApp Business
  - Aguardar confirmação de conexão
  - Status: Connected ✅

- [ ] **Configurar webhook**
  - URL: `http://n8n:5678/webhook/whatsapp-message`
  - Eventos: Todas as mensagens
  - Salvar configuração

---

## 🔄 FASE 5: ATIVAÇÃO (1 min)

- [ ] **Ativar workflow no N8N**
  - Abrir workflow importado
  - Clicar em "Inactive" → "Active"
  - Verificar status verde

- [ ] **Verificar webhook ativo**
  - No workflow, verificar nó "Webhook"
  - URL deve estar visível
  - Status: Listening

---

## 🧪 FASE 6: TESTES (5 min)

- [ ] **Teste 1: Mensagem simples**
  - Enviar: "Olá"
  - Receber: Mensagem de boas-vindas
  - ✅ Passou / ❌ Falhou

- [ ] **Teste 2: Solicitar orçamento**
  - Enviar: "Quero um orçamento"
  - Receber: Formulário de orçamento
  - ✅ Passou / ❌ Falhou

- [ ] **Teste 3: Perguntar preço**
  - Enviar: "Quanto custa?"
  - Receber: Informações sobre preços
  - ✅ Passou / ❌ Falhou

- [ ] **Teste 4: Verificar banco de dados**
  ```powershell
  docker-compose exec postgres psql -U n8n -d n8n -c "SELECT * FROM leads ORDER BY created_at DESC LIMIT 3;"
  ```
  - Lead salvo no banco
  - ✅ Passou / ❌ Falhou

- [ ] **Teste 5: Verificar execuções no N8N**
  - N8N → Executions
  - Ver execução recente
  - Status: Success
  - ✅ Passou / ❌ Falhou

- [ ] **Teste 6: Notificação por email** (se configurado)
  - Enviar mensagem de orçamento
  - Verificar email recebido
  - ✅ Passou / ❌ Falhou

---

## 📊 FASE 7: MONITORAMENTO (Contínuo)

- [ ] **Configurar monitoramento de logs**
  ```powershell
  docker-compose logs -f n8n evolution-api
  ```

- [ ] **Verificar métricas diárias**
  ```powershell
  docker-compose exec postgres psql -U n8n -d n8n -c "SELECT * FROM metricas ORDER BY data DESC LIMIT 7;"
  ```

- [ ] **Backup configurado**
  - Verificar pasta `n8n-backups/`
  - Configurar backup automático

---

## 🎯 FASE 8: PRODUÇÃO (Futuro)

- [ ] **Configurar DNS**
  - `n8n.cortinasbresser.com.br`
  - `evolution.cortinasbresser.com.br`

- [ ] **Configurar SSL/HTTPS**
  - Certificado Let's Encrypt
  - Atualizar .env com URLs HTTPS

- [ ] **Deploy em VPS**
  - Transferir para servidor de produção
  - Atualizar variáveis de ambiente
  - Testar em produção

- [ ] **Treinar equipe**
  - Demonstrar funcionamento
  - Explicar como monitorar
  - Criar documentação de uso

---

## 🆘 TROUBLESHOOTING

### ❌ Container não sobe

```powershell
docker-compose down
docker-compose up -d
docker-compose logs [nome-container]
```

### ❌ WhatsApp desconecta

1. Reescanear QR Code
2. Verificar conexão do celular
3. Reiniciar Evolution API:
   ```powershell
   docker-compose restart evolution-api
   ```

### ❌ Webhook não funciona

1. Verificar workflow ativo (verde)
2. Verificar URL na Evolution API
3. Testar manualmente:
   ```powershell
   curl -X POST http://localhost:5678/webhook-test/whatsapp-message
   ```

### ❌ Banco não conecta

```powershell
docker-compose restart postgres
docker-compose exec postgres psql -U n8n -d n8n -c "\dt"
```

---

## 📈 MÉTRICAS DE SUCESSO

Após 1 semana de uso:

- [ ] **Taxa de resposta:** > 95%
- [ ] **Tempo médio de resposta:** < 5 segundos
- [ ] **Leads gerados:** > 50/semana
- [ ] **Taxa de conversão:** > 8%
- [ ] **Uptime:** > 99%

---

## 📝 NOTAS

**Data de início:** _____________  
**Data de conclusão:** _____________  
**Responsável:** _____________  
**Observações:**

_____________________________________________
_____________________________________________
_____________________________________________

---

## ✅ STATUS FINAL

- [ ] **Todos os testes passaram**
- [ ] **Equipe treinada**
- [ ] **Documentação completa**
- [ ] **Backup configurado**
- [ ] **Monitoramento ativo**

---

**🎉 IMPLEMENTAÇÃO CONCLUÍDA COM SUCESSO!**

**Assinatura:** _____________  
**Data:** _____________
