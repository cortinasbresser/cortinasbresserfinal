# 🎯 Guia de Configuração - Google Ads e Meta Ads
## Cortinas Bresser - Otimização para Campanhas Pagas

---

## 📋 ÍNDICE
1. [Configuração Google Ads](#google-ads)
2. [Configuração Meta Ads (Facebook/Instagram)](#meta-ads)
3. [Pixels e Rastreamento](#pixels-rastreamento)
4. [Checklist de SEO](#checklist-seo)
5. [Palavras-chave Recomendadas](#palavras-chave)

---

## 🔍 GOOGLE ADS

### 1. Google Search Console
**Status:** ⚠️ PENDENTE - Necessário adicionar código de verificação

**Passos:**
1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade: `https://www.cortinasbresser.com.br`
3. Escolha método de verificação: **Tag HTML**
4. Copie o código de verificação
5. Substitua em `app/layout.tsx` na linha:
   ```tsx
   <meta name="google-site-verification" content="ADICIONE_SEU_CODIGO_AQUI" />
   ```
6. Faça deploy e clique em "Verificar"

### 2. Google Analytics 4 (GA4)
**Status:** ⚠️ PENDENTE - Necessário adicionar ID de medição

**Passos:**
1. Acesse [Google Analytics](https://analytics.google.com)
2. Crie uma propriedade GA4
3. Copie o ID de medição (formato: `G-XXXXXXXXXX`)
4. Descomente e atualize em `app/layout.tsx`:
   ```tsx
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_AQUI"></script>
   <script dangerouslySetInnerHTML={{
       __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-SEU_ID_AQUI');
       `
   }} />
   ```

### 3. Google Ads Conversion Tracking
**Status:** ⚠️ PENDENTE - Necessário criar conta Google Ads

**Passos:**
1. Acesse [Google Ads](https://ads.google.com)
2. Crie uma conta (se ainda não tiver)
3. Vá em: **Ferramentas e Configurações** > **Medição** > **Conversões**
4. Clique em **+ Nova conversão**
5. Escolha: **Site**
6. Configure a conversão:
   - **Categoria:** Envio de formulário de contato
   - **Nome:** Orçamento Cortinas
   - **Valor:** Use valores de transação específicos
7. Copie o ID da conversão (formato: `AW-XXXXXXXXXX`)
8. Adicione em `app/layout.tsx`:
   ```tsx
   gtag('config', 'AW-SEU_ID_AQUI');
   ```

### 4. Evento de Conversão (Formulário)
**Status:** ✅ PRONTO - Código preparado, necessário apenas adicionar IDs

**Localização:** Quando o formulário for enviado com sucesso

**Implementação sugerida em `components/QuoteForm.tsx`:**
```typescript
// Após envio bem-sucedido do formulário
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXXX/SEU_LABEL_AQUI',
    'value': 1.0,
    'currency': 'BRL'
  });
}
```

---

## 📱 META ADS (Facebook/Instagram)

### 1. Facebook Domain Verification
**Status:** ⚠️ PENDENTE - Necessário verificar domínio

**Passos:**
1. Acesse [Meta Business Suite](https://business.facebook.com)
2. Vá em: **Configurações da Empresa** > **Segurança da Marca** > **Domínios**
3. Clique em **Adicionar**
4. Digite: `cortinasbresser.com.br`
5. Escolha método: **Meta tag**
6. Copie o código de verificação
7. Substitua em `app/layout.tsx`:
   ```tsx
   <meta name="facebook-domain-verification" content="SEU_CODIGO_AQUI" />
   ```
8. Clique em **Verificar**

### 2. Facebook Pixel (Meta Pixel)
**Status:** ⚠️ PENDENTE - Necessário criar Pixel

**Passos:**
1. Acesse [Gerenciador de Eventos](https://business.facebook.com/events_manager2)
2. Clique em **Conectar fontes de dados** > **Web** > **Meta Pixel**
3. Dê um nome: "Cortinas Bresser - Site"
4. Digite a URL: `https://www.cortinasbresser.com.br`
5. Copie o Pixel ID (número de 15 dígitos)
6. Descomente e atualize em `app/layout.tsx`:
   ```tsx
   fbq('init', 'SEU_PIXEL_ID_AQUI');
   ```
7. Também atualize na tag noscript:
   ```tsx
   src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1"
   ```

### 3. Facebook App ID (Opcional mas Recomendado)
**Status:** ⚠️ PENDENTE

**Passos:**
1. Acesse [Facebook Developers](https://developers.facebook.com)
2. Crie um app: **Meus Apps** > **Criar App**
3. Escolha tipo: **Empresa**
4. Preencha informações do app
5. Copie o App ID
6. Atualize em `app/layout.tsx`:
   ```tsx
   <meta property="fb:app_id" content="SEU_APP_ID_AQUI" />
   ```

### 4. Eventos do Meta Pixel
**Status:** ✅ PRONTO - Código preparado

**Eventos Recomendados:**

#### PageView (já configurado)
```javascript
fbq('track', 'PageView');
```

#### Lead (quando formulário for enviado)
```javascript
fbq('track', 'Lead', {
  content_name: 'Orçamento Cortinas',
  content_category: 'Formulário',
  value: 1.00,
  currency: 'BRL'
});
```

**Implementação sugerida em `components/QuoteForm.tsx`:**
```typescript
// Após envio bem-sucedido do formulário
if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('track', 'Lead', {
    content_name: 'Orçamento Cortinas',
    content_category: 'Formulário',
    value: 1.00,
    currency: 'BRL'
  });
}
```

---

## 🎯 PIXELS E RASTREAMENTO

### Eventos de Conversão Implementados

| Evento | Plataforma | Status | Localização |
|--------|-----------|--------|-------------|
| PageView | Google Analytics | ⚠️ Pendente ID | `app/layout.tsx` |
| PageView | Meta Pixel | ⚠️ Pendente ID | `app/layout.tsx` |
| Conversion (Form) | Google Ads | ⚠️ Pendente implementação | `components/QuoteForm.tsx` |
| Lead | Meta Pixel | ⚠️ Pendente implementação | `components/QuoteForm.tsx` |

### Arquivo para Adicionar Eventos de Conversão

Crie o arquivo `lib/tracking.ts`:

```typescript
// lib/tracking.ts
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export const trackFormSubmission = () => {
  // Google Ads Conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXXXX/SEU_LABEL_AQUI',
      'value': 1.0,
      'currency': 'BRL'
    });
  }

  // Meta Pixel Lead Event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Orçamento Cortinas',
      content_category: 'Formulário',
      value: 1.00,
      currency: 'BRL'
    });
  }
};

export const trackWhatsAppClick = () => {
  // Google Analytics Event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      'event_category': 'engagement',
      'event_label': 'WhatsApp Button'
    });
  }

  // Meta Pixel Custom Event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'WhatsAppClick');
  }
};
```

---

## ✅ CHECKLIST DE SEO

### Arquivos Criados
- [x] `robots.txt` - Configurado para permitir rastreamento
- [x] `sitemap.xml` - Mapa do site para indexação
- [x] Meta tags Open Graph - Para compartilhamento em redes sociais
- [x] Structured Data (Schema.org) - LocalBusiness, FAQ, Product
- [x] Canonical URLs - Evita conteúdo duplicado

### Otimizações Implementadas
- [x] Título otimizado para SEO e conversão
- [x] Meta description com call-to-action
- [x] 40+ palavras-chave relevantes
- [x] Alt text em imagens (verificar em `page.tsx`)
- [x] Heading hierarchy (H1, H2, H3)
- [x] URLs amigáveis
- [x] Velocidade de carregamento (Next.js otimizado)
- [x] Mobile-friendly (Tailwind CSS responsivo)

### Pendente Configuração
- [ ] Google Search Console - Adicionar código de verificação
- [ ] Google Analytics 4 - Adicionar ID de medição
- [ ] Google Ads - Criar conta e configurar conversões
- [ ] Meta Pixel - Criar pixel e adicionar ID
- [ ] Facebook Domain Verification - Verificar domínio
- [ ] Implementar eventos de conversão no formulário

---

## 🔑 PALAVRAS-CHAVE RECOMENDADAS

### Google Ads - Campanhas de Pesquisa

#### Palavras-chave de Alta Intenção (Correspondência Exata)
```
[cortinas sob medida são paulo]
[cortinas sob medida sp]
[orçamento cortinas são paulo]
[cortinas blackout sob medida]
[cortinas com instalação são paulo]
```

#### Palavras-chave de Correspondência de Frase
```
"cortinas sob medida"
"cortinas personalizadas"
"cortinas blackout"
"instalação de cortinas"
"cortinas voil"
```

#### Palavras-chave Amplas Modificadas
```
+cortinas +sob +medida +são +paulo
+orçamento +cortinas +grátis
+cortinas +instalação +grátis
```

#### Palavras-chave Negativas (Adicionar)
```
-diy
-faça você mesmo
-tutorial
-curso
-grátis (exceto em "orçamento grátis")
-barato demais
-usado
```

### Meta Ads - Segmentação

#### Interesses
- Decoração de interiores
- Design de interiores
- Móveis e decoração
- Reforma residencial
- Arquitetura

#### Comportamentos
- Proprietários de imóveis
- Mudança recente
- Reforma de casa

#### Dados Demográficos
- Idade: 25-65 anos
- Localização: São Paulo (cidade e região metropolitana)
- Renda: Classe B e A

---

## 📊 MÉTRICAS PARA ACOMPANHAR

### Google Ads
- CTR (Taxa de Cliques): Meta > 3%
- CPC (Custo por Clique): Benchmark R$ 1,50 - R$ 3,00
- Taxa de Conversão: Meta > 5%
- Custo por Conversão: Meta < R$ 50,00

### Meta Ads
- CTR: Meta > 1,5%
- CPC: Benchmark R$ 0,80 - R$ 2,00
- CPL (Custo por Lead): Meta < R$ 30,00
- Frequência: Manter < 3

### Google Analytics
- Taxa de Rejeição: Meta < 60%
- Tempo na Página: Meta > 1:30
- Páginas por Sessão: Meta > 2
- Taxa de Conversão: Meta > 3%

---

## 🚀 PRÓXIMOS PASSOS

### Prioridade ALTA (Fazer Agora)
1. ✅ Criar conta Google Search Console
2. ✅ Adicionar código de verificação do Google
3. ✅ Criar propriedade Google Analytics 4
4. ✅ Adicionar GA4 ao site
5. ✅ Criar Meta Pixel
6. ✅ Adicionar Meta Pixel ao site
7. ✅ Verificar domínio no Facebook

### Prioridade MÉDIA (Próxima Semana)
1. ⏳ Criar conta Google Ads
2. ⏳ Configurar primeira campanha de pesquisa
3. ⏳ Configurar conversões no Google Ads
4. ⏳ Criar primeira campanha no Meta Ads
5. ⏳ Implementar eventos de conversão no formulário

### Prioridade BAIXA (Próximo Mês)
1. 📅 Criar campanhas de remarketing
2. 📅 Testar diferentes criativos
3. 📅 Otimizar lances e orçamentos
4. 📅 Expandir para Google Display Network
5. 📅 Testar Instagram Stories Ads

---

## 📞 SUPORTE

Se precisar de ajuda para configurar qualquer item acima:
- Google Ads: [Suporte Google Ads](https://support.google.com/google-ads)
- Meta Ads: [Central de Ajuda Meta](https://www.facebook.com/business/help)
- Google Analytics: [Ajuda Analytics](https://support.google.com/analytics)

---

**Última atualização:** 07/12/2025
**Versão:** 1.0
**Responsável:** Equipe Cortinas Bresser
