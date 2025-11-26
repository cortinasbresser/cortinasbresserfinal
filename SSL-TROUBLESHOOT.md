# 🔒 Diagnóstico e Solução de SSL/HTTPS

## 🔍 Diagnóstico do Problema

### Possíveis Causas do SSL Não Funcionar

1. **Domínio não configurado**
2. **DNS não propagado**
3. **SSL não gerado no EasyPanel**
4. **Porta errada configurada**
5. **Certificado inválido**

---

## ✅ Checklist de Diagnóstico

### 1. Verificar se Você Tem Domínio Configurado

**No EasyPanel:**
- Vá em **Domains** no projeto
- Há algum domínio adicionado?

**Situações:**

#### ❌ Nenhum domínio configurado
- **Problema**: SSL só funciona com domínio próprio
- **IP direto** (http://123.45.67.89) **NÃO tem SSL**
- **Solução**: Adicionar domínio no EasyPanel

#### ✅ Domínio configurado
- Se está usando `seudominio.com.br`
- Prossiga para próximo passo

---

### 2. Verificar DNS

#### Teste se DNS está apontando correto:

```bash
# No seu PC (PowerShell ou CMD)
nslookup seudominio.com.br
```

**Resultado esperado:**
```
Servidor:  dns.google
Address:  8.8.8.8

Nome:    seudominio.com.br
Address: [IP_DA_VPS]
```

#### ❌ Se não mostrar o IP correto:
- DNS não está configurado OU
- DNS ainda não propagou (leva 1-48 horas)

**Solução**: Configurar DNS no provedor do domínio:

| Tipo | Host | Valor | TTL |
|------|------|-------|-----|
| A | @ | [IP_DA_VPS] | 3600 |
| A | www | [IP_DA_VPS] | 3600 |

---

### 3. Verificar Configuração no EasyPanel

#### Passo 1: Acessar Projeto
1. EasyPanel → Seu projeto
2. Clique em **"Domains"**

#### Passo 2: Verificar Domínio
Deve ter algo como:
```
✅ seudominio.com.br
   - SSL: Enabled OU Pending
   - Status: Active
```

#### ❌ Se mostrar "SSL: Disabled" ou erro:
**Cause**: SSL não foi gerado automaticamente

**Solução**:
1. **Remover domínio**:
   - Clique em ⚙️ ou ⋮ ao lado do domínio
   - "Remove Domain"

2. **Adicionar novamente**:
   - Clique "Add Domain"
   - Digite: `seudominio.com.br`
   - Marque: ✅ Enable SSL
   - Save

3. **Aguarde**: EasyPanel vai gerar SSL automaticamente (1-5 min)

---

### 4. Forçar Geração de SSL

Se o SSL não for gerado automaticamente:

#### Via SSH:
```bash
# Conectar na VPS
ssh root@SEU_IP

# Verificar se Certbot está instalado
certbot --version

# Gerar certificado manualmente
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br

# Escolher: Redirect (opção 2)
```

---

### 5. Verificar Porta do Container

#### Problema Comum:
- SSL precisa que o container exponha porta 80 E 443
- Ou que Nginx/EasyPanel faça proxy correto

#### No EasyPanel:
1. Project → Settings
2. Verifique **Port**: deve ser `3000` (ou `80`)
3. **Protocol**: deve ser `HTTP` (não HTTPS)

**Por quê?**
- EasyPanel/Nginx faz SSL termination
- Container roda HTTP internamente
- EasyPanel converte HTTPS → HTTP

---

## 🔧 Soluções por Cenário

### Cenário 1: Usando Apenas IP (Sem Domínio)

**Problema**: Não é possível ter SSL com IP direto

**Solução**:
1. **Opção A**: Comprar domínio (Registro.br ~R$ 40/ano)
2. **Opção B**: Usar subdomínio do EasyPanel (se disponível)

---

### Cenário 2: Domínio Configurado, Mas SSL Não Funciona

**Passo 1**: Verificar se DNS propagou
```bash
nslookup seudominio.com.br
```

**Passo 2**: Testar acesso HTTP primeiro
```
http://seudominio.com.br
```

Se HTTP funciona mas HTTPS não:

**Passo 3**: Remover e adicionar domínio novamente no EasyPanel
- Remove Domain
- Add Domain (com SSL enabled)

**Passo 4**: Aguardar 5 minutos e testar

---

### Cenário 3: Certificado Expirado/Inválido

**Sintomas**:
- Navegador mostra "Certificado inválido"
- Aviso de segurança

**Solução**:
```bash
# Via SSH
ssh root@SEU_IP

# Renovar certificado
certbot renew --force-renewal

# Reiniciar Nginx
systemctl restart nginx
```

---

### Cenário 4: Mixed Content (Conteúdo Misto)

**Sintomas**:
- Site abre mas mostra "Não seguro"
- Alguns recursos não carregam

**Problema**: Site carrega recursos via HTTP em vez de HTTPS

**Solução**: No código, garantir que todos os links sejam relativos:
```javascript
// ❌ Errado
<img src="http://seusite.com/image.jpg" />

// ✅ Correto
<img src="/image.jpg" />
```

---

## 🎯 Solução Rápida (Mais Comum)

Na maioria dos casos, o problema é:

### 1️⃣ Adicionar Domínio no EasyPanel

1. **EasyPanel → Projeto → Domains**
2. **"Add Domain"**
3. **Digite**: `www.seudominio.com.br`
4. **✅ Enable SSL** (marcar checkbox)
5. **Save**

### 2️⃣ Configurar DNS

No provedor do domínio:

```
Tipo A
Host: @
Valor: [IP_DA_VPS]

Tipo A
Host: www
Valor: [IP_DA_VPS]
```

### 3️⃣ Aguardar

- DNS propagação: 1-48 horas (geralmente < 6h)
- SSL geração: 2-5 minutos

### 4️⃣ Testar

```
https://www.seudominio.com.br
```

Deve mostrar **🔒 cadeado verde**!

---

## 🔍 Ferramentas de Diagnóstico

### Online (não precisa SSH):

1. **DNS Checker**:
   - https://dnschecker.org
   - Digite seu domínio
   - Veja se está apontando para IP correto

2. **SSL Checker**:
   - https://www.ssllabs.com/ssltest/
   - Digite seu domínio
   - Vê status completo do SSL

3. **WhatIsMyDNS**:
   - https://www.whatsmydns.net
   - Verifica propagação DNS mundial

### Via SSH:

```bash
# Verificar se Nginx está rodando
systemctl status nginx

# Verificar certificados instalados
certbot certificates

# Testar configuração Nginx
nginx -t

# Ver logs de erro
tail -f /var/log/nginx/error.log
```

---

## ❓ Perguntas para Diagnóstico

Me responda para eu te ajudar melhor:

1. **Você tem domínio próprio?**
   - [ ] Sim, tenho (qual?)
   - [ ] Não, estou usando IP

2. **Se tem domínio, está configurado no EasyPanel?**
   - [ ] Sim
   - [ ] Não
   - [ ] Não sei

3. **Quando acessa http://seu-site (sem HTTPS), funciona?**
   - [ ] Sim
   - [ ] Não
   - [ ] Não tentei

4. **Qual erro aparece no navegador?**
   - [ ] "Certificado inválido"
   - [ ] "Conexão não é segura"
   - [ ] "Site não encontrado"
   - [ ] Outro: _______

5. **Quando adicionou o domínio?**
   - [ ] Há menos de 1 hora
   - [ ] Há poucas horas
   - [ ] Há 1+ dias

---

## 📋 Status Atual

**Me envie**:
1. Seu domínio (se tiver)
2. Screenshot da tela "Domains" no EasyPanel
3. Resultado de `nslookup seudominio.com.br`
4. Qual erro aparece no navegador

Com essas informações, posso te dar a solução exata! 🎯

---

**Desenvolvido para**: Cortinas Bresser 🎯  
**Data**: 24/11/2025  
**Status**: Diagnóstico SSL
