# 🤖 N8N + WhatsApp - Automação de Atendimento
## Cortinas Bresser - Guia Completo de Implementação

**Data:** 07/12/2025  
**Status:** Guia de Implementação  
**Idioma:** PT-BR

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Arquitetura da Solução](#arquitetura-da-solução)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação do N8N](#instalação-do-n8n)
5. [Integração WhatsApp](#integração-whatsapp)
6. [Workflows Recomendados](#workflows-recomendados)
7. [Integração com o Site](#integração-com-o-site)
8. [Configuração de Variáveis](#configuração-de-variáveis)
9. [Deploy no EasyPanel](#deploy-no-easypanel)
10. [Testes e Troubleshooting](#testes-e-troubleshooting)

---

## 🎯 VISÃO GERAL

### O que é N8N?

**N8N** é uma plataforma de automação de workflows (similar ao Zapier/Make) que permite:
- ✅ Automatizar processos de negócio
- ✅ Integrar diferentes serviços (WhatsApp, Email, CRM, etc.)
- ✅ Criar chatbots inteligentes
- ✅ Processar leads automaticamente
- ✅ Self-hosted (você controla seus dados)

### Por que usar N8N para WhatsApp?

1. **Automação 24/7**: Responder clientes mesmo fora do horário
2. **Qualificação de Leads**: Coletar informações antes de passar para vendedor
3. **Respostas Rápidas**: FAQ automatizado
4. **Integração com CRM**: Salvar leads automaticamente
5. **Custo Zero**: Open source e self-hosted

---

## 🏗️ ARQUITETURA DA SOLUÇÃO

```
┌─────────────────────────────────────────────────────────────┐
│                    SITE CORTINAS BRESSER                     │
│  (Next.js - cortinasbresser.com.br)                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 1. Cliente clica em WhatsApp
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              WHATSAPP BUSINESS API / EVOLUTION API           │
│  (Middleware para conectar WhatsApp ao N8N)                 │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 2. Mensagem enviada via webhook
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                         N8N WORKFLOWS                        │
│  • Chatbot de Atendimento                                   │
│  • Qualificação de Leads                                    │
│  • Envio de Orçamentos                                      │
│  • Integração com Email/CRM                                 │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 3. Dados processados
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    BANCO DE DADOS / CRM                      │
│  • SQLite (local)                                           │
│  • Google Sheets (opcional)                                 │
│  • Email (loja@cortinasbresser.com.br)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ PRÉ-REQUISITOS

### 1. Servidor/VPS
- ✅ VPS Hostinger (já possui)
- ✅ EasyPanel instalado (já possui)
- ✅ Docker e Docker Compose (já possui)
- ✅ Domínio configurado (cortinasbresser.com.br)

### 2. WhatsApp Business API

**Opção A: Evolution API (Recomendado - Gratuito)**
- ✅ Open source
- ✅ Self-hosted
- ✅ Sem custos mensais
- ✅ Fácil integração com N8N
- ❌ Requer WhatsApp Business (não pessoal)

**Opção B: WhatsApp Business API Oficial (Meta)**
- ✅ Oficial da Meta
- ✅ Mais estável
- ❌ Custo: ~R$ 0,10 por mensagem
- ❌ Processo de aprovação demorado

**Opção C: Baileys (Alternativa)**
- ✅ Gratuito
- ✅ Usa WhatsApp Web
- ❌ Menos estável
- ❌ Risco de banimento

### 3. Número de WhatsApp
- ✅ WhatsApp Business instalado
- ✅ Número: (11) 99401-3938 (já possui)

---

## 🚀 INSTALAÇÃO DO N8N

### Passo 1: Atualizar `docker-compose.yml`

Vou criar um arquivo atualizado que inclui:
- ✅ N8N
- ✅ Evolution API (para WhatsApp)
- ✅ PostgreSQL (banco do N8N)
- ✅ Redis (cache)

### Passo 2: Configurar Variáveis de Ambiente

Adicionar ao `.env`:

```env
# ==============================================
# N8N - Automação de Workflows
# ==============================================
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=SuaSenhaSegura123!
N8N_HOST=n8n.cortinasbresser.com.br
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_ENCRYPTION_KEY=sua_chave_de_criptografia_aqui

# ==============================================
# Evolution API - WhatsApp Gateway
# ==============================================
EVOLUTION_API_URL=https://evolution.cortinasbresser.com.br
EVOLUTION_API_KEY=sua_api_key_evolution
AUTHENTICATION_API_KEY=sua_chave_de_autenticacao

# ==============================================
# PostgreSQL - Banco do N8N
# ==============================================
POSTGRES_USER=n8n
POSTGRES_PASSWORD=SenhaBancoN8N123!
POSTGRES_DB=n8n
POSTGRES_NON_ROOT_USER=n8n
POSTGRES_NON_ROOT_PASSWORD=SenhaBancoN8N123!

# ==============================================
# Redis - Cache
# ==============================================
REDIS_PASSWORD=SenhaRedis123!
```

### Passo 3: Criar Subdomínios

Configurar no DNS (Cloudflare/Hostinger):

```
n8n.cortinasbresser.com.br       → IP do VPS
evolution.cortinasbresser.com.br → IP do VPS
```

---

## 📱 INTEGRAÇÃO WHATSAPP

### Opção Recomendada: Evolution API

#### 1. Acessar Evolution API
```
https://evolution.cortinasbresser.com.br
```

#### 2. Criar Instância WhatsApp
1. Fazer login na Evolution API
2. Criar nova instância
3. Escanear QR Code com WhatsApp Business
4. Copiar API Key da instância

#### 3. Configurar Webhook no N8N
1. Acessar N8N: `https://n8n.cortinasbresser.com.br`
2. Criar novo workflow
3. Adicionar trigger "Webhook"
4. Copiar URL do webhook
5. Configurar na Evolution API

---

## 🔄 WORKFLOWS RECOMENDADOS

### Workflow 1: Atendimento Inicial (Chatbot)

**Objetivo:** Responder automaticamente e qualificar leads

```
┌─────────────────┐
│  Webhook        │ ← Cliente envia mensagem
│  (Evolution)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  IF: Horário    │ ← Verifica se está no horário de atendimento
│  Comercial?     │
└────┬───────┬────┘
     │       │
  SIM│       │NÃO
     │       │
     ▼       ▼
┌─────────┐ ┌──────────────┐
│ Chatbot │ │ Mensagem:    │
│ Ativo   │ │ "Fora do     │
│         │ │  horário"    │
└────┬────┘ └──────────────┘
     │
     ▼
┌─────────────────┐
│  Detectar       │ ← Identifica intenção do cliente
│  Intenção       │
└────┬────────────┘
     │
     ├─ "orçamento" → Workflow de Orçamento
     ├─ "preço"     → Enviar Tabela de Preços
     ├─ "prazo"     → Informar Prazos
     └─ "outros"    → Transferir para Humano
```

### Workflow 2: Captura de Orçamento

**Objetivo:** Coletar dados para orçamento automaticamente

```
1. Cliente: "Quero um orçamento"
2. Bot: "Ótimo! Qual tipo de tecido você prefere?"
   - Blackout
   - Voil
   - Linho
   - Veludo
   - Não sei

3. Cliente escolhe: "Blackout"
4. Bot: "Perfeito! Qual tipo de instalação?"
   - Trilho
   - Varão
   - Motorizado
   - Não sei

5. Cliente escolhe: "Trilho"
6. Bot: "Qual o tamanho aproximado da janela?"
   [Cliente digita]

7. Bot: "Pode me passar seu nome completo?"
   [Cliente digita]

8. Bot: "Ótimo! Vou gerar seu orçamento e enviar por email também.
        Qual seu melhor email?"
   [Cliente digita]

9. N8N:
   - Salva no banco de dados
   - Envia email para loja@cortinasbresser.com.br
   - Gera PDF do orçamento
   - Envia PDF para o cliente
   - Notifica vendedor
```

### Workflow 3: FAQ Automático

**Objetivo:** Responder perguntas frequentes

```javascript
// Gatilhos de palavras-chave
const faq = {
  'preço|valor|quanto custa': 'Nossos preços variam de acordo com o tecido...',
  'prazo|entrega|demora': 'O prazo médio é de 7 a 10 dias úteis...',
  'instalação|instalar': 'A instalação é GRÁTIS e incluída no orçamento!',
  'horário|funciona|aberto': 'Atendemos de Segunda a Sexta: 9h às 18h...',
  'endereço|localização|onde': 'Rua Bresser, 1084 - Brás, São Paulo - SP',
  'tecido|tipo|modelo': 'Trabalhamos com Blackout, Voil, Linho, Veludo...'
};
```

### Workflow 4: Integração com Formulário do Site

**Objetivo:** Quando alguém preenche o formulário, enviar dados para WhatsApp

```
┌─────────────────┐
│  Webhook do     │ ← Formulário enviado no site
│  Site (Flask)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Processar      │ ← Extrair dados do formulário
│  Dados          │
└────────┬────────┘
         │
         ├─ Salvar no Banco
         ├─ Enviar Email
         ├─ Gerar PDF
         └─ Enviar WhatsApp para Cliente
```

---

## 🌐 INTEGRAÇÃO COM O SITE

### Opção 1: Webhook Direto (Recomendado)

Modificar `flask_app/app.py` para enviar dados ao N8N:

```python
import requests

@app.route('/submit', methods=['POST'])
def submit_quote():
    # ... código existente ...
    
    # Enviar para N8N
    n8n_webhook_url = os.environ.get('N8N_WEBHOOK_URL')
    if n8n_webhook_url:
        try:
            requests.post(n8n_webhook_url, json={
                'nome': lead.nome,
                'telefone': lead.telefone,
                'tecido': lead.tecido,
                'instalacao': lead.instalacao,
                'timestamp': datetime.now().isoformat()
            }, timeout=5)
        except Exception as e:
            print(f"Erro ao enviar para N8N: {e}")
    
    # ... resto do código ...
```

### Opção 2: Widget de Chat Integrado

Substituir o widget atual por um que conecta direto ao N8N:

```tsx
// components/N8NChat.tsx
'use client';

import { useState } from 'react';

export default function N8NChat() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="n8n-chat-widget">
      {isOpen && (
        <iframe
          src="https://n8n.cortinasbresser.com.br/form/chat-widget"
          width="400"
          height="600"
          frameBorder="0"
        />
      )}
      <button onClick={() => setIsOpen(!isOpen)}>
        💬 Chat
      </button>
    </div>
  );
}
```

---

## ⚙️ CONFIGURAÇÃO DE VARIÁVEIS

### Adicionar ao `.env.example`:

```env
# ==============================================
# N8N - Automação de Workflows
# ==============================================
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=change_me
N8N_HOST=n8n.yourdomain.com
N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/form-submission

# ==============================================
# Evolution API - WhatsApp
# ==============================================
EVOLUTION_API_URL=https://evolution.yourdomain.com
EVOLUTION_API_KEY=your_api_key_here
WHATSAPP_INSTANCE_NAME=cortinas_bresser
```

---

## 🚀 DEPLOY NO EASYPANEL

### Passo 1: Criar Serviços no EasyPanel

1. **Acessar EasyPanel**
   ```
   https://seu-easypanel.com
   ```

2. **Criar Projeto "cortinas-automation"**

3. **Adicionar Serviços:**
   - PostgreSQL (banco do N8N)
   - Redis (cache)
   - N8N (automação)
   - Evolution API (WhatsApp)

### Passo 2: Configurar N8N

1. Criar serviço "n8n"
2. Usar imagem: `n8nio/n8n:latest`
3. Configurar porta: `5678`
4. Adicionar variáveis de ambiente
5. Conectar ao PostgreSQL
6. Configurar domínio: `n8n.cortinasbresser.com.br`
7. Habilitar SSL automático

### Passo 3: Configurar Evolution API

1. Criar serviço "evolution-api"
2. Usar imagem: `atendai/evolution-api:latest`
3. Configurar porta: `8080`
4. Adicionar variáveis de ambiente
5. Configurar domínio: `evolution.cortinasbresser.com.br`
6. Habilitar SSL automático

### Passo 4: Conectar WhatsApp

1. Acessar Evolution API
2. Criar instância
3. Escanear QR Code
4. Configurar webhook para N8N

---

## 🧪 TESTES E TROUBLESHOOTING

### Checklist de Testes

- [ ] N8N está acessível em `https://n8n.cortinasbresser.com.br`
- [ ] Evolution API está acessível
- [ ] WhatsApp conectado (QR Code escaneado)
- [ ] Webhook recebendo mensagens
- [ ] Chatbot respondendo automaticamente
- [ ] Dados sendo salvos no banco
- [ ] Email sendo enviado
- [ ] PDF sendo gerado

### Problemas Comuns

#### 1. N8N não inicia
```bash
# Verificar logs
docker logs n8n

# Verificar banco de dados
docker logs postgres
```

#### 2. WhatsApp desconecta
- Verificar se o celular está com internet
- Reescanear QR Code
- Verificar logs da Evolution API

#### 3. Webhook não recebe mensagens
- Verificar URL do webhook
- Testar com Postman/curl
- Verificar firewall

#### 4. Mensagens não são enviadas
- Verificar API Key da Evolution
- Verificar se instância está ativa
- Verificar logs do N8N

---

## 📊 BENEFÍCIOS ESPERADOS

### Métricas de Sucesso

| Métrica | Antes | Depois (Esperado) |
|---------|-------|-------------------|
| Tempo de Resposta | 2-24h | Imediato |
| Taxa de Conversão | 3% | 8-12% |
| Leads Qualificados | 50% | 80% |
| Atendimentos/dia | 10-15 | 50-100 |
| Custo por Lead | R$ 50 | R$ 20 |

### ROI Estimado

**Investimento:**
- Tempo de setup: 4-6 horas
- Custo mensal: R$ 0 (self-hosted)

**Retorno:**
- +200% em leads qualificados
- -60% em custo por lead
- Atendimento 24/7
- Melhor experiência do cliente

---

## 📚 RECURSOS ADICIONAIS

### Documentação Oficial
- **N8N:** https://docs.n8n.io
- **Evolution API:** https://doc.evolution-api.com
- **WhatsApp Business API:** https://developers.facebook.com/docs/whatsapp

### Tutoriais Recomendados
- [N8N + WhatsApp Tutorial](https://www.youtube.com/results?search_query=n8n+whatsapp)
- [Evolution API Setup](https://www.youtube.com/results?search_query=evolution+api)

### Comunidade
- **Discord N8N:** https://discord.gg/n8n
- **Fórum N8N:** https://community.n8n.io

---

## ✅ PRÓXIMOS PASSOS

### Fase 1: Setup Inicial (Semana 1)
1. [ ] Atualizar `docker-compose.yml`
2. [ ] Configurar variáveis de ambiente
3. [ ] Deploy N8N no EasyPanel
4. [ ] Deploy Evolution API
5. [ ] Conectar WhatsApp

### Fase 2: Workflows Básicos (Semana 2)
1. [ ] Criar workflow de atendimento inicial
2. [ ] Criar workflow de FAQ
3. [ ] Testar respostas automáticas
4. [ ] Ajustar mensagens

### Fase 3: Integração Avançada (Semana 3)
1. [ ] Integrar com formulário do site
2. [ ] Criar workflow de orçamento
3. [ ] Configurar geração de PDF
4. [ ] Integrar com email

### Fase 4: Otimização (Semana 4)
1. [ ] Analisar métricas
2. [ ] Otimizar workflows
3. [ ] Adicionar novos recursos
4. [ ] Treinar equipe

---

**Preparado por:** Antigravity AI  
**Data:** 07/12/2025  
**Versão:** 1.0  
**Idioma:** PT-BR

**🎯 Objetivo:** Transformar o atendimento WhatsApp da Cortinas Bresser com automação inteligente!
