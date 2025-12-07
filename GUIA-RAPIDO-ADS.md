# 🚀 GUIA RÁPIDO - Configuração Google Ads e Meta Ads
## Cortinas Bresser - Passo a Passo Simplificado

---

## ⚡ CONFIGURAÇÃO RÁPIDA (30 minutos)

### 1️⃣ GOOGLE SEARCH CONSOLE (5 min)

**O que é:** Ferramenta gratuita do Google para monitorar seu site nas buscas

**Como fazer:**
1. Acesse: https://search.google.com/search-console
2. Clique em "Adicionar propriedade"
3. Digite: `https://www.cortinasbresser.com.br`
4. Escolha: "Tag HTML"
5. Copie o código que aparece (exemplo: `google-site-verification=ABC123XYZ`)
6. Abra o arquivo: `app/layout.tsx`
7. Encontre a linha:
   ```tsx
   <meta name="google-site-verification" content="ADICIONE_SEU_CODIGO_AQUI" />
   ```
8. Substitua `ADICIONE_SEU_CODIGO_AQUI` pelo código copiado
9. Salve o arquivo e faça deploy
10. Volte ao Search Console e clique em "Verificar"

✅ **Pronto!** Agora o Google pode rastrear seu site.

---

### 2️⃣ GOOGLE ANALYTICS 4 (5 min)

**O que é:** Ferramenta para acompanhar visitantes e conversões

**Como fazer:**
1. Acesse: https://analytics.google.com
2. Clique em "Criar propriedade"
3. Nome: "Cortinas Bresser"
4. Fuso horário: "Brasil/São Paulo"
5. Moeda: "Real Brasileiro (BRL)"
6. Clique em "Criar"
7. Escolha: "Web"
8. URL: `https://www.cortinasbresser.com.br`
9. Copie o **ID de medição** (formato: `G-XXXXXXXXXX`)
10. Abra o arquivo: `app/layout.tsx`
11. Encontre o bloco comentado:
    ```tsx
    {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-YR56WHH2D4"></script>
    ```
12. **Descomente** (remova `{/*` e `*/}`)
13. Substitua `G-YR56WHH2D4` pelo seu ID copiado
14. Salve e faça deploy

✅ **Pronto!** Agora você pode acompanhar visitantes em tempo real.

---

### 3️⃣ META PIXEL (Facebook/Instagram) (10 min)

**O que é:** Código de rastreamento para anúncios no Facebook e Instagram

**Como fazer:**
1. Acesse: https://business.facebook.com/events_manager2
2. Clique em "Conectar fontes de dados"
3. Escolha: "Web"
4. Selecione: "Meta Pixel"
5. Nome: "Cortinas Bresser - Site"
6. URL: `https://www.cortinasbresser.com.br`
7. Clique em "Continuar"
8. Escolha: "Instalar código manualmente"
9. Copie o **Pixel ID** (número de 15 dígitos)
10. Abra o arquivo: `app/layout.tsx`
11. Encontre o bloco comentado:
    ```tsx
    {/* <script dangerouslySetInnerHTML={{
        __html: `
            ...
            fbq('init', 'SEU_PIXEL_ID_AQUI');
    ```
12. **Descomente** (remova `{/*` e `*/}`)
13. Substitua `SEU_PIXEL_ID_AQUI` pelo Pixel ID copiado (2 lugares)
14. Salve e faça deploy

✅ **Pronto!** Agora você pode rastrear conversões do Facebook/Instagram.

---

### 4️⃣ VERIFICAÇÃO DE DOMÍNIO FACEBOOK (5 min)

**O que é:** Confirma que você é dono do domínio

**Como fazer:**
1. Acesse: https://business.facebook.com
2. Vá em: **Configurações da Empresa** > **Segurança da Marca** > **Domínios**
3. Clique em "Adicionar"
4. Digite: `cortinasbresser.com.br`
5. Escolha: "Meta tag"
6. Copie o código (exemplo: `facebook-domain-verification=abc123xyz`)
7. Abra o arquivo: `app/layout.tsx`
8. Encontre a linha:
   ```tsx
   <meta name="facebook-domain-verification" content="ADICIONE_SEU_CODIGO_AQUI" />
   ```
9. Substitua `ADICIONE_SEU_CODIGO_AQUI` pelo código copiado
10. Salve, faça deploy e clique em "Verificar"

✅ **Pronto!** Domínio verificado no Facebook.

---

### 5️⃣ GOOGLE ADS (5 min - Opcional por enquanto)

**O que é:** Plataforma para criar anúncios no Google

**Como fazer:**
1. Acesse: https://ads.google.com
2. Clique em "Começar agora"
3. Siga o assistente de criação de conta
4. **NÃO CRIE CAMPANHA AINDA** (você pode pular)
5. Após criar a conta, vá em: **Ferramentas** > **Medição** > **Conversões**
6. Clique em "+ Nova conversão"
7. Escolha: "Site"
8. Categoria: "Envio de formulário"
9. Nome: "Orçamento Cortinas"
10. Copie o **ID de conversão** (formato: `AW-XXXXXXXXXX`)
11. Abra o arquivo: `app/layout.tsx`
12. Encontre:
    ```tsx
    // Google Ads Conversion Tracking
    gtag('config', 'AW-XXXXXXXXXX');
    ```
13. Substitua `AW-XXXXXXXXXX` pelo ID copiado
14. Salve e faça deploy

✅ **Pronto!** Google Ads configurado para rastrear conversões.

---

## 🎯 COMO TESTAR SE ESTÁ FUNCIONANDO

### Teste do Google Analytics
1. Abra seu site: https://www.cortinasbresser.com.br
2. Abra o Google Analytics
3. Vá em: **Relatórios** > **Tempo real**
4. Você deve ver **1 usuário ativo** (você!)

### Teste do Meta Pixel
1. Instale a extensão: [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Abra seu site
3. Clique no ícone da extensão
4. Deve aparecer: "Pixel encontrado" com seu Pixel ID

### Teste de Conversão (Formulário)
1. Preencha o formulário no seu site
2. Envie
3. Aguarde 24-48 horas
4. Verifique no Google Analytics: **Relatórios** > **Eventos** > "form_submission"
5. Verifique no Meta: **Gerenciador de Eventos** > Seu Pixel > "Lead"

---

## 📊 ONDE VER OS RESULTADOS

### Google Analytics
- **Visitantes em tempo real:** Relatórios > Tempo real
- **Total de visitantes:** Relatórios > Aquisição > Visão geral
- **Conversões:** Relatórios > Eventos > form_submission

### Meta Pixel
- **Eventos:** Gerenciador de Eventos > Seu Pixel > Atividade de eventos
- **Conversões:** Gerenciador de Eventos > Seu Pixel > Teste de eventos

### Google Ads (quando criar campanhas)
- **Conversões:** Campanhas > Conversões
- **Performance:** Campanhas > Visão geral

---

## ⚠️ PROBLEMAS COMUNS

### "Pixel não encontrado"
**Solução:** Verifique se você descomentou o código e fez deploy

### "Código de verificação inválido"
**Solução:** Certifique-se de copiar APENAS o código, sem espaços extras

### "Eventos não aparecem"
**Solução:** Aguarde 24-48 horas. Eventos podem demorar para processar.

### "Site não aparece no Google"
**Solução:** Pode levar 1-2 semanas. Envie o sitemap manualmente no Search Console.

---

## 🎓 PRÓXIMOS PASSOS (Depois da Configuração)

### 1. Criar Primeira Campanha Google Ads
- Tipo: Pesquisa
- Orçamento inicial: R$ 20-30/dia
- Palavras-chave: "cortinas sob medida são paulo"

### 2. Criar Primeira Campanha Meta Ads
- Tipo: Conversões
- Objetivo: Leads
- Orçamento inicial: R$ 15-25/dia
- Público: São Paulo, 25-65 anos, interessados em decoração

### 3. Acompanhar Métricas
- Verificar diariamente: Google Analytics
- Ajustar campanhas: Semanalmente
- Otimizar orçamento: Mensalmente

---

## 📞 PRECISA DE AJUDA?

### Suporte Google
- Search Console: https://support.google.com/webmasters
- Analytics: https://support.google.com/analytics
- Ads: https://support.google.com/google-ads

### Suporte Meta
- Pixel: https://www.facebook.com/business/help/742478679120153
- Ads: https://www.facebook.com/business/help

### Documentação Completa
- Veja: `CONFIGURAR-GOOGLE-META-ADS.md` (guia detalhado)
- Veja: `RELATORIO-SEO.md` (relatório completo)

---

## ✅ CHECKLIST FINAL

Antes de criar campanhas, certifique-se:

- [ ] Google Search Console verificado
- [ ] Google Analytics instalado e funcionando
- [ ] Meta Pixel instalado e funcionando
- [ ] Domínio verificado no Facebook
- [ ] Testei o formulário e vi os eventos
- [ ] Li o guia completo de campanhas

---

**Tempo total:** ~30 minutos  
**Dificuldade:** ⭐⭐ (Fácil)  
**Resultado:** Site 100% rastreável e pronto para anúncios

**Boa sorte com suas campanhas! 🚀**
