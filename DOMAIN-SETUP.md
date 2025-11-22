# Configuração de Domínio Personalizado no Netlify

## 📋 Pré-requisitos

- Domínio: `cortinasbresser.com.br`
- Registrado em: Registro.br
- Site hospedado no Netlify

## 🎯 Passo 1: Adicionar Domínio no Netlify

### 1.1 Acessar Painel do Netlify

1. Acesse: https://app.netlify.com/projects/cortinasbresser
2. Clique em **"Domain settings"** (Configurações de domínio)
3. Na seção **"Custom domains"**, clique em **"Add domain"**

### 1.2 Adicionar Domínio

1. Digite: `cortinasbresser.com.br`
2. Clique em **"Verify"**
3. Clique em **"Add domain"**

### 1.3 Adicionar www (Opcional mas Recomendado)

1. Clique novamente em **"Add domain"**
2. Digite: `www.cortinasbresser.com.br`
3. Clique em **"Verify"** e depois **"Add domain"**

## 🌐 Passo 2: Obter Informações de DNS do Netlify

Após adicionar o domínio, o Netlify fornecerá as seguintes informações:

### Opção A: DNS do Netlify (Recomendado)

Se você usar os nameservers do Netlify:
- `dns1.p01.nsone.net`
- `dns2.p01.nsone.net`
- `dns3.p01.nsone.net`
- `dns4.p01.nsone.net`

### Opção B: Registros DNS Personalizados

Se preferir manter o DNS no Registro.br, use:

**Para o domínio principal (cortinasbresser.com.br):**
- Tipo: `A`
- Nome: `@` (ou deixe em branco)
- Valor: `75.2.60.5` (IP do Netlify - verificar no painel)

**Para www (www.cortinasbresser.com.br):**
- Tipo: `CNAME`
- Nome: `www`
- Valor: `cortinasbresser.netlify.app`

## 🔧 Passo 3: Configurar DNS no Registro.br

### 3.1 Acessar Painel do Registro.br

1. Acesse: https://registro.br
2. Faça login com sua conta
3. Clique em **"Meus Domínios"**
4. Selecione `cortinasbresser.com.br`

### 3.2 Opção A - Usar Nameservers do Netlify (Mais Simples)

1. Clique em **"Alterar Servidores DNS"**
2. Selecione **"Usar outros servidores DNS"**
3. Adicione os nameservers do Netlify:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
4. Clique em **"Salvar"**

⚠️ **Importante**: Ao usar nameservers do Netlify, você gerenciará TODOS os registros DNS pelo painel do Netlify.

### 3.3 Opção B - Manter DNS no Registro.br (Mais Controle)

1. Clique em **"Editar Zona"** ou **"Gerenciar DNS"**
2. Adicione/Edite os seguintes registros:

#### Registro A (Domínio Principal)
```
Tipo: A
Nome: @
Valor: 75.2.60.5
TTL: 3600
```

#### Registro CNAME (www)
```
Tipo: CNAME
Nome: www
Valor: cortinasbresser.netlify.app
TTL: 3600
```

3. Clique em **"Salvar"** ou **"Aplicar Alterações"**

## 🔒 Passo 4: Ativar HTTPS/SSL no Netlify

1. Volte ao painel do Netlify
2. Vá em **"Domain settings"**
3. Na seção **"HTTPS"**, clique em **"Verify DNS configuration"**
4. Aguarde a verificação (pode levar alguns minutos)
5. Clique em **"Provision certificate"** (Provisionar certificado)
6. O Netlify gerará automaticamente um certificado SSL gratuito via Let's Encrypt

## ⏱️ Tempo de Propagação

- **Nameservers**: 24-48 horas (geralmente 2-6 horas)
- **Registros DNS**: 1-4 horas (geralmente 30 minutos)

## ✅ Verificar Configuração

### Verificar DNS

Use estas ferramentas para verificar se o DNS está propagado:

1. **DNS Checker**: https://dnschecker.org
   - Digite: `cortinasbresser.com.br`
   - Verifique se aponta para o IP do Netlify

2. **Comando no Terminal**:
   ```bash
   nslookup cortinasbresser.com.br
   nslookup www.cortinasbresser.com.br
   ```

### Verificar SSL

1. Acesse: https://cortinasbresser.com.br
2. Verifique se o cadeado aparece no navegador
3. Use: https://www.ssllabs.com/ssltest/

## 🎯 Configurações Adicionais Recomendadas

### Redirecionar www para domínio principal (ou vice-versa)

No painel do Netlify:
1. Vá em **"Domain settings"**
2. Em **"Custom domains"**, clique nos 3 pontinhos ao lado do domínio
3. Selecione **"Set as primary domain"**
4. O Netlify redirecionará automaticamente as outras variantes

### Forçar HTTPS

No painel do Netlify:
1. Vá em **"Domain settings"**
2. Na seção **"HTTPS"**
3. Ative **"Force HTTPS"**

## 📝 Resumo dos Passos

- [ ] Adicionar domínio no Netlify
- [ ] Adicionar www no Netlify
- [ ] Configurar DNS no Registro.br
- [ ] Aguardar propagação DNS
- [ ] Verificar DNS com dnschecker.org
- [ ] Provisionar certificado SSL
- [ ] Ativar Force HTTPS
- [ ] Definir domínio principal
- [ ] Testar acesso ao site

## 🆘 Problemas Comuns

### Site não carrega após configurar DNS

- Aguarde mais tempo (propagação pode levar até 48h)
- Limpe cache do navegador (Ctrl + Shift + Delete)
- Tente em modo anônimo
- Verifique se os registros DNS estão corretos

### Certificado SSL não provisiona

- Verifique se o DNS está propagado corretamente
- Certifique-se de que os registros A e CNAME estão corretos
- Aguarde 24h após configurar DNS
- Tente remover e adicionar o domínio novamente no Netlify

### Erro "Domain already registered"

- O domínio pode estar em outro projeto Netlify
- Remova de outros projetos antes de adicionar

## 📞 Suporte

- **Netlify**: https://answers.netlify.com
- **Registro.br**: https://registro.br/ajuda

---

**Data de criação**: 2025-11-22  
**Última atualização**: 2025-11-22
