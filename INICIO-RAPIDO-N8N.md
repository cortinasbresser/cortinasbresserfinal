# 🚀 INÍCIO RÁPIDO - N8N + WhatsApp

**⏱️ Tempo total: 10 minutos**

---

## ✅ PRÉ-REQUISITOS

Antes de começar, certifique-se de que:

- [ ] Docker Desktop está **instalado** ✅
- [ ] Docker Desktop está **rodando** (ícone verde na bandeja)
- [ ] Você tem acesso ao WhatsApp Business

---

## 🎯 PASSO A PASSO SIMPLIFICADO

### **1️⃣ Iniciar Docker Desktop** (2 min)

1. Abra o **Docker Desktop** no Windows
2. Aguarde até o ícone ficar **verde** na bandeja
3. Confirme que está rodando

### **2️⃣ Executar Script de Instalação** (5 min)

Abra o PowerShell nesta pasta e execute:

```powershell
.\scripts\start-n8n.ps1
```

O script irá:
- ✅ Verificar Docker
- ✅ Criar banco de dados
- ✅ Iniciar todos os serviços
- ✅ Mostrar status

### **3️⃣ Acessar N8N** (1 min)

1. Abra o navegador em: **http://localhost:5678**
2. Faça login:
   - **Usuário:** `admin`
   - **Senha:** `CortinasBresser2025!`

### **4️⃣ Importar Workflow** (1 min)

1. No N8N, clique em **"Workflows"**
2. Clique em **"Import from File"**
3. Selecione: `n8n-workflows/atendimento-whatsapp.json`
4. Clique em **"Import"**

### **5️⃣ Conectar WhatsApp** (1 min)

1. Abra: **http://localhost:8080**
2. Clique em **"Create Instance"**
3. Nome: `cortinas_bresser`
4. API Key: `bresser_api_key_2025_secure`
5. Clique em **"Create"**
6. **Escaneie o QR Code** com o WhatsApp Business

### **6️⃣ Ativar Workflow** (30 seg)

1. Volte para o N8N
2. Abra o workflow importado
3. Clique no botão **"Inactive"** → **"Active"**

---

## 🧪 TESTAR

Envie uma mensagem para o WhatsApp conectado:

```
Olá, quero um orçamento
```

Você deve receber uma **resposta automática imediata**! 🎉

---

## 🆘 PROBLEMAS?

### Docker não inicia
```powershell
# Reiniciar Docker Desktop
# Feche e abra novamente
```

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

## 🎯 PRÓXIMOS PASSOS

Após tudo funcionando:

1. **Personalizar mensagens** no workflow
2. **Adicionar FAQs** no banco de dados
3. **Configurar notificações** por email
4. **Monitorar métricas** no banco

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **Guia Detalhado:** `PASSO-A-PASSO-N8N.md`
- **Setup Completo:** `N8N-WHATSAPP-SETUP.md`
- **README:** `N8N-README.md`
- **Resumo:** `RESUMO-N8N.md`

---

## 🎉 PRONTO!

Agora você tem:
- ✅ Atendimento WhatsApp 24/7
- ✅ Respostas automáticas
- ✅ Leads salvos automaticamente
- ✅ Notificações por email
- ✅ Métricas em tempo real

**Revolucione seu atendimento! 🚀**
