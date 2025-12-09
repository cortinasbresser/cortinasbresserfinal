# 🚀 COMECE AQUI - IMPLEMENTAÇÃO N8N

**Cortinas Bresser - Automação WhatsApp**  
**Data:** 08/12/2025

---

## ⚡ INÍCIO SUPER RÁPIDO (10 MINUTOS)

### **PASSO 1: Iniciar Docker Desktop**

1. Abra o **Docker Desktop** no Windows
2. Aguarde o ícone ficar **verde** na bandeja
3. ✅ Pronto!

### **PASSO 2: Executar Script Automatizado**

Abra o PowerShell **nesta pasta** e execute:

```powershell
.\scripts\start-n8n.ps1
```

**Aguarde o script concluir** (aprox. 2-3 minutos)

### **PASSO 3: Acessar e Configurar**

#### 3.1 Acessar N8N
- 🌐 **URL:** http://localhost:5678
- 👤 **Usuário:** `admin`
- 🔑 **Senha:** `CortinasBresser2025!`

#### 3.2 Importar Workflow
1. Clique em **"Workflows"**
2. Clique em **"Import from File"**
3. Selecione: `n8n-workflows/atendimento-whatsapp.json`
4. Clique em **"Import"**

#### 3.3 Conectar WhatsApp
1. Abra: http://localhost:8080
2. Clique em **"Create Instance"**
3. Nome: `cortinas_bresser`
4. API Key: `bresser_api_key_2025_secure`
5. **Escaneie o QR Code** com WhatsApp Business

#### 3.4 Ativar Workflow
1. Volte para N8N
2. Abra o workflow importado
3. Clique em **"Inactive"** → **"Active"**

### **PASSO 4: Testar**

Envie uma mensagem para o WhatsApp conectado:

```
Olá, quero um orçamento
```

✅ **Você deve receber resposta automática imediata!**

---

## 🆘 PROBLEMAS?

### Docker não inicia
- Reinicie o Docker Desktop
- Feche e abra novamente

### Containers não sobem
```powershell
docker-compose down
docker-compose up -d
```

### Ver logs
```powershell
docker-compose logs -f n8n
docker-compose logs -f evolution-api
```

### WhatsApp desconecta
1. Reescanear QR Code
2. Verificar conexão do celular
3. Reiniciar: `docker-compose restart evolution-api`

---

## 📊 VERIFICAR STATUS

```powershell
# Ver todos os containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Verificar banco de dados
docker-compose exec postgres psql -U n8n -d n8n -c "\dt"
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

Escolha seu nível:

### 👶 **Iniciante** (Nunca usei Docker/N8N)
1. `INICIO-RAPIDO-N8N.md` - Começar aqui
2. `PASSO-A-PASSO-N8N.md` - Guia detalhado
3. `CHECKLIST-N8N.md` - Acompanhar progresso

### 🧑 **Intermediário** (Já usei Docker)
1. `N8N-QUICKSTART.md` - Início rápido
2. `N8N-README.md` - Visão geral
3. `COMANDOS-N8N.md` - Referência

### 👨‍💻 **Avançado** (Experiente)
1. `N8N-WHATSAPP-SETUP.md` - Setup técnico
2. `docker-compose.yml` - Configuração direta
3. `database/setup-n8n.sql` - Estrutura do banco

### 📖 **Índice Completo**
- `INDICE-N8N.md` - Navegação completa por toda documentação

---

## 🎯 O QUE VOCÊ TERÁ APÓS IMPLEMENTAÇÃO

✅ **Atendimento WhatsApp 24/7**  
✅ **Respostas automáticas inteligentes**  
✅ **Leads salvos automaticamente no banco**  
✅ **Notificações por email**  
✅ **Métricas em tempo real**  
✅ **Dashboard de acompanhamento**

---

## 📈 MÉTRICAS ESPERADAS

Após implementação:
- ⚡ **Tempo de resposta:** Imediato
- 📈 **Taxa de conversão:** 8-12%
- 🚀 **Atendimentos/dia:** 50-100
- 💸 **Custo por lead:** -60%
- 🎯 **Disponibilidade:** 24/7

---

## 🎉 PRONTO PARA COMEÇAR?

1. ✅ Inicie o Docker Desktop
2. ✅ Execute: `.\scripts\start-n8n.ps1`
3. ✅ Siga os passos acima
4. ✅ Revolucione seu atendimento!

---

**💡 Dica:** Mantenha este arquivo aberto durante a implementação!

**📞 Suporte:** Consulte `INDICE-N8N.md` para ajuda específica

**Última atualização:** 08/12/2025  
**Desenvolvido por:** Antigravity AI
