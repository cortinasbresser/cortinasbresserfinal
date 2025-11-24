# ⚡ EasyPanel - Início Rápido

## 🚀 Deploy em 5 Minutos!

---

## 📋 Você vai precisar:

- ✅ VPS Hostinger ativa
- ✅ EasyPanel instalado
- ✅ Conta GitHub
- ✅ 5 minutos

---

## 🎯 Passo a Passo

### 1️⃣ Enviar Código para GitHub (1 min)

```bash
# Na pasta do projeto:
git init
git add .
git commit -m "Deploy inicial"

# Crie um repositório no GitHub e execute:
git remote add origin https://github.com/SEU_USUARIO/cortinasbresser.git
git push -u origin main
```

### 2️⃣ Acessar EasyPanel (30 seg)

Abra no navegador:
```
https://SEU_IP_DA_VPS:3000
```

Ou:
```
https://panel.seudominio.com
```

### 3️⃣ Criar Projeto (2 min)

No EasyPanel:

1. Clique **"+ New Project"**
2. Escolha **"GitHub"**
3. Selecione **"cortinasbresser"**
4. Configure:
   - **Framework**: `Next.js`
   - **Branch**: `main`
   - **Build**: `npm install && npm run build`
   - **Start**: `npm start`
   - **Port**: `3000`

### 4️⃣ Adicionar Domínio (1 min)

1. Vá em **"Domains"**
2. Adicione: `www.seudominio.com.br`
3. EasyPanel gera SSL automático! ✅

### 5️⃣ Configurar DNS (1 min)

No seu provedor de domínio:

```
Tipo A
Host: @
Valor: IP_DA_VPS
TTL: 3600

Tipo A
Host: www
Valor: IP_DA_VPS
TTL: 3600
```

### 6️⃣ Deploy! (30 seg)

Clique em **"Deploy"** e aguarde!

---

## ✅ Pronto!

Em menos de 5 minutos seu site está no ar! 🎉

**Acesse**: `https://www.seudominio.com.br`

---

## 🔄 Atualizações Futuras

Simplesmente faça:

```bash
git add .
git commit -m "Atualização"
git push
```

EasyPanel faz deploy automático! 🚀

---

## 🆘 Problemas?

Veja o guia completo: **EASYPANEL-DEPLOY.md**

---

**Método**: EasyPanel + GitHub  
**Tempo**: ~5 minutos  
**Dificuldade**: ⭐ Fácil  
