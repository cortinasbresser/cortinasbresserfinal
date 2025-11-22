# 🚀 DEPLOY NA VERCEL - Guia Completo

## 📋 **INFORMAÇÕES DO PROJETO:**

- **Repositório GitHub:** https://github.com/workriar/cortinasbresser.git
- **Framework:** Next.js 14.2.33
- **Tipo:** Exportação Estática

---

## ✅ **PASSO A PASSO - DEPLOY NA VERCEL:**

### **1. Acessar Vercel**
- Acesse: https://vercel.com
- Clique em **"Sign Up"** ou **"Login"**
- Escolha **"Continue with GitHub"**

### **2. Conectar GitHub**
- Autorize a Vercel a acessar seu GitHub
- Permita acesso ao repositório `cortinasbresser`

### **3. Importar Projeto**
- Na dashboard da Vercel, clique em **"Add New..."**
- Selecione **"Project"**
- Procure por **"cortinasbresser"** na lista
- Clique em **"Import"**

### **4. Configurar Projeto**

#### **Configure as seguintes opções:**

**Framework Preset:**
```
Next.js
```

**Build Command:**
```
npm run build
```

**Output Directory:**
```
out
```

**Install Command:**
```
npm install
```

**Root Directory:**
```
./
```

#### **Environment Variables (Opcional):**
Se precisar de variáveis de ambiente, adicione:
```
# Nenhuma necessária por enquanto
```

### **5. Deploy**
- Clique em **"Deploy"**
- Aguarde 2-5 minutos
- ✅ **Pronto! Seu site está no ar!**

---

## 🌐 **APÓS O DEPLOY:**

### **URL Gerada:**
A Vercel vai gerar uma URL automática:
```
https://cortinasbresser.vercel.app
```

### **Testar o Site:**
1. ✅ Hero Carousel (5 slides)
2. ✅ Botão "Solicitar Orçamento"
3. ✅ Formulário
4. ✅ Seção de Localização
5. ✅ Responsividade (mobile/desktop)

---

## 🔧 **CONFIGURAR DOMÍNIO PERSONALIZADO:**

### **Passo 1: Adicionar Domínio**
1. No projeto na Vercel, vá em **"Settings"**
2. Clique em **"Domains"**
3. Adicione: `cortinasbresser.com.br`
4. Clique em **"Add"**

### **Passo 2: Configurar DNS**

A Vercel vai mostrar as configurações DNS. Você precisa adicionar no seu provedor de domínio:

#### **Opção A: CNAME (Recomendado)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### **Opção B: A Record**
```
Type: A
Name: @
Value: 76.76.21.21
```

### **Passo 3: Aguardar Propagação**
- DNS pode levar até 48 horas
- Geralmente funciona em 1-2 horas
- A Vercel vai verificar automaticamente

---

## 🔄 **ATUALIZAÇÕES AUTOMÁTICAS:**

### **Como funciona:**
1. Você faz alterações no código
2. Faz commit e push para GitHub:
   ```bash
   git add .
   git commit -m "atualização"
   git push origin main
   ```
3. **Vercel detecta automaticamente**
4. **Faz build e deploy automático**
5. **Site atualizado em 2-3 minutos!**

### **Branches:**
- `main` → Deploy em produção
- Outras branches → Preview deployments

---

## 📊 **RECURSOS DA VERCEL:**

### **✅ Incluído Grátis:**
- HTTPS automático (SSL)
- CDN global
- Deploy automático
- Preview deployments
- Analytics básico
- 100GB bandwidth/mês
- Domínio personalizado

### **🎯 Performance:**
- Edge Network global
- Cache automático
- Compressão Brotli
- Image optimization
- Lazy loading

---

## 🔍 **MONITORAMENTO:**

### **Dashboard Vercel:**
- **Deployments:** Histórico de deploys
- **Analytics:** Visitantes e performance
- **Logs:** Erros e avisos
- **Speed Insights:** Métricas de velocidade

### **Métricas Importantes:**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)

---

## 🆘 **TROUBLESHOOTING:**

### **Problema: Build falha**
**Solução:**
1. Verifique os logs na Vercel
2. Teste localmente: `npm run build`
3. Verifique `next.config.mjs`

### **Problema: 404 em páginas**
**Solução:**
1. Verifique `output: 'export'` no config
2. Certifique-se que `out/` foi gerado

### **Problema: Imagens não carregam**
**Solução:**
1. Verifique `images.unoptimized: true`
2. Confirme que imagens estão em `public/`

### **Problema: Domínio não funciona**
**Solução:**
1. Aguarde propagação DNS (até 48h)
2. Verifique configurações DNS
3. Use `dig` ou `nslookup` para testar

---

## 📝 **CHECKLIST PÓS-DEPLOY:**

### **Funcionalidades:**
- [ ] Hero Carousel funcionando
- [ ] 5 slides aparecendo
- [ ] Botão "Solicitar Orçamento" funciona
- [ ] Formulário envia para WhatsApp
- [ ] Mapa do Google Maps carrega
- [ ] Cards de localização aparecem
- [ ] Responsivo em mobile
- [ ] Responsivo em tablet
- [ ] Responsivo em desktop

### **Performance:**
- [ ] Lighthouse Score > 90
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

### **SEO:**
- [ ] Meta tags corretas
- [ ] Open Graph funcionando
- [ ] Structured data presente
- [ ] Sitemap gerado

---

## 🎯 **PRÓXIMOS PASSOS:**

### **1. Fazer Deploy:**
1. Acesse https://vercel.com
2. Login com GitHub
3. Import projeto `cortinasbresser`
4. Deploy!

### **2. Testar:**
1. Acesse a URL gerada
2. Teste todas as funcionalidades
3. Verifique em mobile

### **3. Configurar Domínio:**
1. Adicione `cortinasbresser.com.br`
2. Configure DNS
3. Aguarde propagação

### **4. Monitorar:**
1. Verifique Analytics
2. Monitore Performance
3. Acompanhe Logs

---

## 🎉 **VANTAGENS DA VERCEL:**

### **✅ Por que Vercel é melhor:**
1. **Build automático** - Sem erro de symlink
2. **Deploy em 2 minutos** - Super rápido
3. **HTTPS grátis** - SSL automático
4. **CDN global** - Site rápido em todo mundo
5. **Preview deployments** - Teste antes de publicar
6. **Analytics grátis** - Veja visitantes
7. **Suporte a Next.js** - Otimizado para Next
8. **Zero configuração** - Funciona out-of-the-box

### **💰 Custo:**
- **Grátis** para projetos pessoais
- **Sem limite** de projetos
- **100GB** bandwidth/mês grátis
- **Upgrade** só se precisar mais

---

## 📞 **SUPORTE:**

### **Documentação:**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

### **Comunidade:**
- Discord Vercel: https://vercel.com/discord
- GitHub Issues: https://github.com/vercel/next.js/issues

---

## ✅ **RESUMO RÁPIDO:**

```bash
# 1. Acesse
https://vercel.com

# 2. Login com GitHub

# 3. Import
https://github.com/workriar/cortinasbresser.git

# 4. Configure
Framework: Next.js
Build: npm run build
Output: out

# 5. Deploy
Clique em "Deploy"

# 6. Aguarde 2-3 minutos

# 7. Pronto! ✅
```

---

## 🎊 **CONCLUSÃO:**

**Deploy na Vercel é a melhor escolha!**

✅ Rápido e fácil  
✅ Grátis  
✅ HTTPS automático  
✅ CDN global  
✅ Deploy automático  
✅ Perfeito para Next.js  

**Seu site estará no ar em menos de 5 minutos!** 🚀

---

**Criado em:** 2025-11-22  
**Repositório:** https://github.com/workriar/cortinasbresser.git  
**Status:** ✅ PRONTO PARA DEPLOY NA VERCEL
