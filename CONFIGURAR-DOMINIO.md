# 🚀 Configuração Rápida - Domínio Registro.br → Netlify

## ✅ Status Atual

- ✅ Domínio já adicionado no Netlify: `cortinasbresser.com.br`
- ✅ Site funcionando em: https://cortinasbresser.netlify.app
- ⏳ Aguardando configuração DNS no Registro.br

## 📋 O Que Você Precisa Fazer Agora

### 1️⃣ Acessar o Registro.br

1. Acesse: **https://registro.br**
2. Faça login com seu CPF/CNPJ e senha
3. Clique em **"Meus Domínios"**
4. Selecione **cortinasbresser.com.br**

### 2️⃣ Configurar DNS (ESCOLHA UMA OPÇÃO)

---

## 🎯 OPÇÃO A: Usar DNS do Netlify (RECOMENDADO - Mais Simples)

### Vantagens:
- ✅ Configuração automática
- ✅ SSL automático
- ✅ Melhor performance
- ✅ Gerenciamento centralizado no Netlify

### Passos:

1. No painel do Registro.br, clique em **"Alterar Servidores DNS"**
2. Selecione **"Usar outros servidores DNS"**
3. **REMOVA** os DNS atuais
4. **ADICIONE** os seguintes nameservers do Netlify:

```
dns1.p08.nsone.net
dns2.p08.nsone.net
dns3.p08.nsone.net
dns4.p08.nsone.net
```

5. Clique em **"Salvar"**

⏱️ **Tempo de propagação**: 2-6 horas (máximo 48h)

---

## 🎯 OPÇÃO B: Manter DNS no Registro.br

### Vantagens:
- ✅ Você mantém controle total do DNS
- ✅ Pode configurar e-mails no mesmo painel

### Passos:

1. No painel do Registro.br, clique em **"Editar Zona"** ou **"DNS"**
2. **ADICIONE** ou **EDITE** os seguintes registros:

### Registro para o domínio principal:

```
Tipo:  A
Host:  @ (ou deixe em branco)
Valor: 75.2.60.5
TTL:   3600
```

### Registro para www:

```
Tipo:  CNAME
Host:  www
Valor: cortinasbresser.netlify.app
TTL:   3600
```

3. Clique em **"Salvar"** ou **"Aplicar"**

⏱️ **Tempo de propagação**: 30 minutos a 4 horas

---

## 🔒 3️⃣ Ativar SSL (Automático após DNS)

Após a propagação do DNS:

1. Acesse: https://app.netlify.com/projects/cortinasbresser
2. Vá em **"Domain settings"**
3. Role até **"HTTPS"**
4. Clique em **"Verify DNS configuration"**
5. Clique em **"Provision certificate"**

O Netlify gerará um certificado SSL **GRATUITO** automaticamente!

---

## ✅ 4️⃣ Verificar se Funcionou

### Verificar DNS:

**Opção 1 - Online:**
- Acesse: https://dnschecker.org
- Digite: `cortinasbresser.com.br`
- Verifique se aparece o IP: `75.2.60.5`

**Opção 2 - Terminal:**
```bash
nslookup cortinasbresser.com.br
```

### Testar o Site:

1. Aguarde a propagação (30 min - 6 horas)
2. Acesse: **https://cortinasbresser.com.br**
3. Verifique se o site carrega
4. Verifique se aparece o cadeado 🔒 (SSL)

---

## 📊 Checklist Completo

- [ ] Acessar Registro.br
- [ ] Escolher Opção A ou B
- [ ] Configurar DNS conforme escolhido
- [ ] Aguardar propagação (2-6 horas)
- [ ] Verificar DNS em dnschecker.org
- [ ] Acessar https://cortinasbresser.com.br
- [ ] Verificar SSL (cadeado verde)
- [ ] Provisionar certificado no Netlify
- [ ] Ativar "Force HTTPS" no Netlify

---

## 🆘 Problemas?

### Site não carrega:
- Aguarde mais tempo (até 48h)
- Limpe cache: Ctrl + Shift + Delete
- Tente modo anônimo

### SSL não funciona:
- Aguarde propagação completa do DNS
- Verifique se DNS está correto
- Tente provisionar certificado novamente

### Dúvidas sobre Registro.br:
- Suporte: https://registro.br/ajuda
- Telefone: 0800 940 0000

---

## 📞 Informações Importantes

**Domínio**: cortinasbresser.com.br  
**Netlify URL**: https://cortinasbresser.netlify.app  
**Painel Netlify**: https://app.netlify.com/projects/cortinasbresser  
**IP Netlify**: 75.2.60.5

---

**💡 Dica**: Recomendo usar a **OPÇÃO A** (DNS do Netlify) para ter SSL automático e melhor performance!
