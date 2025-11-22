# 🚀 DEPLOY AUTOMÁTICO - GitHub → Netlify

## ✅ **SOLUÇÃO MAIS SIMPLES:**

Como o build local falha no Windows, a melhor opção é conectar o GitHub diretamente ao Netlify.

---

## 📋 **PASSO A PASSO COMPLETO:**

### **1. Acesse o Netlify**
- Abra seu navegador
- Acesse: https://app.netlify.com
- Faça login (ou crie conta) com GitHub

### **2. Conecte o Repositório**
1. Clique em **"Add new site"**
2. Selecione **"Import an existing project"**
3. Escolha **"Deploy with GitHub"**
4. Autorize o Netlify (se necessário)
5. Procure por: **cortinasbresserfinal**
6. Clique no repositório

### **3. Configure o Build**

**Configurações:**
```
Owner: cortinasbresser
Branch to deploy: main
Build command: npm run build
Publish directory: out
```

**Deixe vazio:**
- Base directory
- Functions directory
- Environment variables (por enquanto)

### **4. Deploy**
1. Clique em **"Deploy cortinasbresserfinal"**
2. Aguarde 2-5 minutos
3. O Netlify vai:
   - Clonar o repositório
   - Instalar dependências
   - Fazer build (no Linux, sem erro!)
   - Publicar o site

### **5. Pronto!**
- URL gerada: `https://random-name.netlify.app`
- Site no ar! ✅

---

## 🌐 **APÓS O DEPLOY:**

### **Mudar nome do site:**
1. Site settings → General
2. Site details → Change site name
3. Digite: `cortinasbresser`
4. Nova URL: `https://cortinasbresser.netlify.app`

### **Adicionar domínio personalizado:**
1. Domain settings
2. Add custom domain
3. Digite: `cortinasbresser.com.br`
4. Configure DNS conforme instruções
5. HTTPS ativa automaticamente

---

## 🔄 **ATUALIZAÇÕES AUTOMÁTICAS:**

Sempre que você fizer push para o GitHub:
```bash
git add .
git commit -m "atualização"
git push origin main
```

**O Netlify detecta e faz deploy automático!** ✨

---

## 📊 **VANTAGENS DESTA ABORDAGEM:**

| Vantagem | Descrição |
|----------|-----------|
| ✅ **Sem build local** | Netlify faz no Linux |
| ✅ **Sem erro de symlink** | Funciona perfeitamente |
| ✅ **Deploy automático** | A cada push no GitHub |
| ✅ **Grátis** | 100GB bandwidth/mês |
| ✅ **HTTPS grátis** | SSL automático |
| ✅ **CDN global** | Site rápido em todo mundo |

---

## 🆘 **TROUBLESHOOTING:**

### **Problema: Build falha no Netlify**
**Solução:**
1. Verifique os logs de build
2. Confirme que `next.config.mjs` tem `output: 'export'`
3. Verifique se `package.json` tem todas as dependências

### **Problema: 404 após deploy**
**Solução:**
1. Verifique se `Publish directory` está como `out`
2. Confirme que o build gerou a pasta `out/`

### **Problema: Imagens não aparecem**
**Solução:**
1. Verifique se estão em `public/assets/`
2. Confirme `images.unoptimized: true` no config

---

## 📝 **CHECKLIST DE DEPLOY:**

- [ ] Acesse https://app.netlify.com
- [ ] Login com GitHub
- [ ] Add new site → Import project
- [ ] Deploy with GitHub
- [ ] Selecione cortinasbresserfinal
- [ ] Configure:
  - Build: `npm run build`
  - Publish: `out`
- [ ] Deploy site
- [ ] Aguarde build
- [ ] ✅ Site no ar!
- [ ] Teste todas as funcionalidades
- [ ] Configure domínio (opcional)

---

## 🎯 **RESUMO:**

**Não precisa fazer build local!**

1. **GitHub:** Código já está lá ✅
2. **Netlify:** Conecta e faz build automático ✅
3. **Deploy:** Automático a cada push ✅

**Simples, rápido e sem erros!** 🚀

---

## 🔗 **LINKS ÚTEIS:**

- **Netlify:** https://app.netlify.com
- **Repositório:** https://github.com/cortinasbresser/cortinasbresserfinal
- **Docs Netlify:** https://docs.netlify.com

---

**Criado em:** 2025-11-22  
**Status:** ✅ PRONTO PARA DEPLOY VIA NETLIFY WEB
