# 🛠️ COMANDOS ÚTEIS - N8N + WhatsApp

**Referência rápida de comandos para gerenciar o sistema**

---

## 🚀 INICIALIZAÇÃO

### Iniciar todos os serviços
```powershell
docker-compose up -d
```

### Iniciar serviço específico
```powershell
docker-compose up -d postgres
docker-compose up -d redis
docker-compose up -d n8n
docker-compose up -d evolution-api
```

### Usar script automatizado
```powershell
.\scripts\start-n8n.ps1
```

---

## 🛑 PARAR SERVIÇOS

### Parar todos os serviços
```powershell
docker-compose down
```

### Parar serviço específico
```powershell
docker-compose stop n8n
docker-compose stop evolution-api
```

### Parar e remover volumes (CUIDADO!)
```powershell
docker-compose down -v
```

---

## 🔄 REINICIAR SERVIÇOS

### Reiniciar todos
```powershell
docker-compose restart
```

### Reiniciar serviço específico
```powershell
docker-compose restart n8n
docker-compose restart evolution-api
docker-compose restart postgres
```

---

## 📊 MONITORAMENTO

### Ver status de todos os containers
```powershell
docker-compose ps
```

### Ver logs em tempo real
```powershell
# Todos os serviços
docker-compose logs -f

# Serviço específico
docker-compose logs -f n8n
docker-compose logs -f evolution-api
docker-compose logs -f postgres

# Últimas 50 linhas
docker-compose logs --tail=50 n8n
```

### Ver uso de recursos
```powershell
docker stats
```

---

## 🗄️ BANCO DE DADOS

### Acessar PostgreSQL
```powershell
docker-compose exec postgres psql -U n8n -d n8n
```

### Executar query
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT * FROM leads LIMIT 10;"
```

### Ver todas as tabelas
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "\dt"
```

### Ver leads recentes
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT id, nome, telefone, created_at FROM leads ORDER BY created_at DESC LIMIT 10;"
```

### Ver métricas
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT * FROM metricas ORDER BY data DESC LIMIT 7;"
```

### Ver mensagens recentes
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT id, telefone, mensagem, created_at FROM mensagens ORDER BY created_at DESC LIMIT 20;"
```

### Backup do banco
```powershell
docker-compose exec postgres pg_dump -U n8n n8n > backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql
```

### Restaurar backup
```powershell
Get-Content backup_20251207.sql | docker-compose exec -T postgres psql -U n8n -d n8n
```

---

## 📱 EVOLUTION API

### Ver instâncias
```powershell
curl http://localhost:8080/instance/fetchInstances -H "apikey: bresser_api_key_2025_secure"
```

### Ver status da instância
```powershell
curl http://localhost:8080/instance/connectionState/cortinas_bresser -H "apikey: bresser_api_key_2025_secure"
```

### Reiniciar instância
```powershell
curl -X POST http://localhost:8080/instance/restart/cortinas_bresser -H "apikey: bresser_api_key_2025_secure"
```

### Desconectar WhatsApp
```powershell
curl -X DELETE http://localhost:8080/instance/logout/cortinas_bresser -H "apikey: bresser_api_key_2025_secure"
```

---

## 🔄 N8N

### Acessar N8N CLI
```powershell
docker-compose exec n8n n8n --help
```

### Exportar workflow
```powershell
docker-compose exec n8n n8n export:workflow --id=1 --output=/backups/workflow.json
```

### Importar workflow
```powershell
docker-compose exec n8n n8n import:workflow --input=/backups/workflow.json
```

### Ver execuções
```powershell
docker-compose exec n8n n8n list:workflow
```

---

## 🧹 LIMPEZA

### Remover containers parados
```powershell
docker-compose down
```

### Limpar volumes não utilizados
```powershell
docker volume prune
```

### Limpar imagens não utilizadas
```powershell
docker image prune -a
```

### Limpar tudo (CUIDADO!)
```powershell
docker system prune -a --volumes
```

---

## 🔍 DIAGNÓSTICO

### Verificar conectividade entre containers
```powershell
# Do N8N para o PostgreSQL
docker-compose exec n8n ping postgres

# Do N8N para o Redis
docker-compose exec n8n ping redis

# Do N8N para Evolution API
docker-compose exec n8n ping evolution-api
```

### Verificar portas abertas
```powershell
netstat -an | Select-String "5678|8080|5432|6379"
```

### Verificar espaço em disco
```powershell
docker system df
```

### Inspecionar container
```powershell
docker inspect cortinasbresser-n8n
docker inspect cortinasbresser-evolution
```

---

## 📦 ATUALIZAÇÃO

### Atualizar imagens
```powershell
docker-compose pull
```

### Atualizar e reiniciar
```powershell
docker-compose pull
docker-compose down
docker-compose up -d
```

### Atualizar serviço específico
```powershell
docker-compose pull n8n
docker-compose up -d --no-deps n8n
```

---

## 🔐 SEGURANÇA

### Ver variáveis de ambiente
```powershell
docker-compose config
```

### Verificar senhas (sem mostrar valores)
```powershell
docker-compose config | Select-String "PASSWORD"
```

### Gerar nova chave de criptografia
```powershell
-join ((1..32) | ForEach-Object { '{0:x}' -f (Get-Random -Maximum 16) })
```

---

## 📊 MÉTRICAS E ANALYTICS

### Total de leads hoje
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT COUNT(*) FROM leads WHERE DATE(created_at) = CURRENT_DATE;"
```

### Mensagens por dia (últimos 7 dias)
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT DATE(created_at) as dia, COUNT(*) as total FROM mensagens WHERE created_at >= CURRENT_DATE - INTERVAL '7 days' GROUP BY DATE(created_at) ORDER BY dia DESC;"
```

### Intenções mais comuns
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT intencao, COUNT(*) as total FROM mensagens WHERE intencao IS NOT NULL GROUP BY intencao ORDER BY total DESC;"
```

### Taxa de conversão
```powershell
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT (COUNT(DISTINCT CASE WHEN intencao = 'orcamento' THEN telefone END)::float / COUNT(DISTINCT telefone)::float * 100) as taxa_conversao FROM mensagens;"
```

---

## 🆘 TROUBLESHOOTING

### Container não inicia
```powershell
# Ver logs detalhados
docker-compose logs --tail=100 [nome-container]

# Verificar configuração
docker-compose config

# Reiniciar do zero
docker-compose down
docker-compose up -d
```

### Erro de permissão
```powershell
# Executar como administrador
# Botão direito no PowerShell → "Executar como Administrador"
```

### Porta já em uso
```powershell
# Ver processo usando a porta
netstat -ano | Select-String ":5678"

# Matar processo (substitua PID)
Stop-Process -Id [PID] -Force
```

### Banco de dados corrompido
```powershell
# Parar serviços
docker-compose down

# Remover volume do PostgreSQL
docker volume rm cortinasbresser_postgres_data

# Reiniciar
docker-compose up -d postgres

# Restaurar backup
Get-Content backup.sql | docker-compose exec -T postgres psql -U n8n -d n8n
```

---

## 📚 ATALHOS ÚTEIS

### Criar alias no PowerShell
```powershell
# Adicionar ao perfil do PowerShell
Set-Alias -Name dcup -Value 'docker-compose up -d'
Set-Alias -Name dcdown -Value 'docker-compose down'
Set-Alias -Name dclogs -Value 'docker-compose logs -f'
Set-Alias -Name dcps -Value 'docker-compose ps'
```

### Função para logs rápidos
```powershell
function n8n-logs { docker-compose logs -f n8n }
function evo-logs { docker-compose logs -f evolution-api }
function db-logs { docker-compose logs -f postgres }
```

---

## 🎯 COMANDOS MAIS USADOS

```powershell
# 1. Ver status
docker-compose ps

# 2. Ver logs
docker-compose logs -f n8n

# 3. Reiniciar N8N
docker-compose restart n8n

# 4. Ver leads
docker-compose exec postgres psql -U n8n -d n8n -c "SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;"

# 5. Backup
docker-compose exec postgres pg_dump -U n8n n8n > backup.sql
```

---

**💡 Dica:** Salve este arquivo nos favoritos para consulta rápida!
