# 🧠 INFORMAÇÕES DO PROJETO - MEMORIZAR
## Cortinas Bresser - Configurações e Preferências

---

## 🌐 IDIOMA
**SEMPRE responder em:** PT-BR (Português do Brasil)

---

## 📋 INFORMAÇÕES DO PROJETO

### Empresa
- **Nome:** Cortinas Bresser
- **Segmento:** Cortinas sob medida
- **Localização:** Rua Bresser, 1084 - Brás, São Paulo - SP
- **Site:** https://www.cortinasbresser.com.br

### Contatos
- **Telefone:** (11) 2692-7865
- **WhatsApp 1:** (11) 99401-3938
- **WhatsApp 2:** (11) 95661-6041
- **Email:** loja@cortinasbresser.com.br

### Redes Sociais
- **Instagram:** https://www.instagram.com/cortinasbresser/
- **Facebook:** https://www.facebook.com/profile.php?id=61577555679690

---

## 🎯 CAMPANHAS ATIVAS

### Google Ads
- **Status:** ⚠️ Pendente configuração
- **Objetivo:** Gerar leads qualificados
- **Orçamento sugerido:** R$ 20-30/dia inicial
- **Palavras-chave principais:**
  - cortinas sob medida são paulo
  - cortinas sob medida sp
  - orçamento cortinas são paulo
  - cortinas blackout sob medida

### Meta Ads (Facebook/Instagram)
- **Status:** ⚠️ Pendente configuração
- **Objetivo:** Gerar leads e awareness
- **Orçamento sugerido:** R$ 15-25/dia inicial
- **Público-alvo:**
  - Localização: São Paulo e região metropolitana
  - Idade: 25-65 anos
  - Interesses: Decoração, design de interiores

---

## 🛠️ STACK TECNOLÓGICO

### Frontend (Principal)
- **Framework:** Next.js 16
- **Linguagem:** TypeScript
- **Styling:** Tailwind CSS + CSS customizado
- **Hospedagem:** Locaweb (export estático)

### Backend (Formulários)
- **Framework:** Flask (Python)
- **Banco:** SQLite
- **Hospedagem:** EasyPanel (VPS Hostinger)

### Ferramentas de Marketing
- **Google Analytics:** Pendente configuração
- **Google Ads:** Pendente configuração
- **Meta Pixel:** Pendente configuração
- **Google Search Console:** Pendente configuração

---

## 📊 MÉTRICAS E OBJETIVOS

### KPIs Principais
- **Taxa de Conversão:** > 3%
- **Custo por Lead (Google Ads):** < R$ 50,00
- **Custo por Lead (Meta Ads):** < R$ 30,00
- **CTR (Google Ads):** > 3%
- **CTR (Meta Ads):** > 1,5%

### Conversões Definidas
1. **Lead Principal:** Envio do formulário de orçamento
2. **Micro-conversão:** Clique no WhatsApp
3. **Engajamento:** Início de preenchimento do formulário

---

## 🎨 IDENTIDADE VISUAL

### Cores Principais
- **Dourado:** #d4af37 (gold)
- **Preto:** #000000
- **Cinza escuro:** #1a1a1a
- **Bege claro:** #f5f0e8

### Tipografia
- **Fonte principal:** Inter (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700

---

## 📝 PRODUTOS E SERVIÇOS

### Tipos de Tecido
1. Voil
2. Linho (variedades)
3. Blackout
4. Veludo
5. Seda (removido do formulário principal)
6. Outros

### Tipos de Instalação
1. Trilho
2. Varão
3. Trilho Motorizado (mencionado em docs)
4. Não sei - Preciso de ajuda

### Diferenciais
1. **Confecção Própria** - Controle total de qualidade
2. **Entrega Rápida** - Compromisso com prazos
3. **Materiais Premium** - Alta qualidade e durabilidade
4. **Instalação Grátis** - Incluída no orçamento

---

## 🔧 CONFIGURAÇÕES TÉCNICAS

### Variáveis de Ambiente Necessárias
```env
# Google
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_ADS_ID=AW-XXXXXXXXXX
GOOGLE_SEARCH_CONSOLE_CODE=abc123xyz

# Meta (Facebook)
META_PIXEL_ID=123456789012345
FACEBOOK_DOMAIN_VERIFICATION=abc123xyz
FACEBOOK_APP_ID=123456789012345

# Email (Flask)
SMTP_SERVER=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=loja@cortinasbresser.com.br
SMTP_PASSWORD=***

# WhatsApp
WHATSAPP_NUMBER=5511994013938
WHATSAPP_NUMBER_2=5511956616041
```

---

## 📂 ARQUIVOS IMPORTANTES

### Documentação de SEO/Marketing
1. **RESUMO-SEO.md** - Visão geral (este arquivo)
2. **GUIA-RAPIDO-ADS.md** - Configuração rápida (30 min)
3. **CONFIGURAR-GOOGLE-META-ADS.md** - Guia técnico completo
4. **RELATORIO-SEO.md** - Relatório detalhado

### Arquivos de Deploy
1. **EASYPANEL-DEPLOY.md** - Deploy no EasyPanel
2. **CONFIGURAR-EASYPANEL.md** - Configuração EasyPanel
3. **CONFIGURAR-EMAIL.md** - Configuração de email

### Código Principal
1. **app/layout.tsx** - Layout e meta tags
2. **lib/seo.ts** - Configurações de SEO
3. **lib/tracking.ts** - Rastreamento de eventos
4. **components/QuoteForm.tsx** - Formulário principal

---

## ⚠️ PONTOS DE ATENÇÃO

### Limitações Conhecidas
1. **API Routes:** Não funciona em export estático (usar Flask)
2. **Email:** Configurado via Flask, não Next.js
3. **PDF:** Gerado pelo Flask backend
4. **Formulário:** Envia para Flask API, depois redireciona WhatsApp

### Problemas Resolvidos
1. ✅ Campo "endereço" removido do formulário
2. ✅ Opção "Seda" removida dos tecidos
3. ✅ Modal de confirmação antes do WhatsApp
4. ✅ Rastreamento de conversões implementado

---

## 🚀 PRÓXIMAS AÇÕES PRIORITÁRIAS

### Imediato (Esta Semana)
1. [ ] Configurar Google Search Console
2. [ ] Configurar Google Analytics 4
3. [ ] Configurar Meta Pixel
4. [ ] Verificar domínio no Facebook
5. [ ] Testar todos os eventos de rastreamento

### Curto Prazo (Próximas 2 Semanas)
1. [ ] Criar primeira campanha Google Ads
2. [ ] Criar primeira campanha Meta Ads
3. [ ] Configurar conversões no Google Ads
4. [ ] Configurar públicos de remarketing
5. [ ] Otimizar orçamentos baseado em dados

### Médio Prazo (Próximo Mês)
1. [ ] Expandir campanhas para Display Network
2. [ ] Testar Instagram Stories Ads
3. [ ] Criar campanhas de remarketing
4. [ ] A/B testing de criativos
5. [ ] Otimização contínua de lances

---

## 📞 CONTATOS E SUPORTE

### Suporte Técnico
- **Hospedagem (Locaweb):** suporte@locaweb.com.br
- **VPS (Hostinger):** suporte via painel
- **EasyPanel:** Documentação própria

### Suporte Marketing
- **Google Ads:** https://support.google.com/google-ads
- **Meta Ads:** https://www.facebook.com/business/help
- **Google Analytics:** https://support.google.com/analytics

---

## 🎯 MENSAGENS-CHAVE (Para Anúncios)

### Headlines (Títulos)
1. "Cortinas Sob Medida com Instalação Grátis"
2. "Orçamento Grátis em Minutos"
3. "Confecção Própria | Entrega Rápida"
4. "Cortinas Premium em São Paulo"
5. "Blackout, Voil, Linho e Mais"

### Descriptions (Descrições)
1. "Solicite orçamento grátis pelo WhatsApp. Resposta em minutos!"
2. "Confecção própria, instalação grátis e entrega rápida em SP"
3. "Tecidos premium com preço justo. Atendemos toda São Paulo"
4. "Mais de 20 anos transformando ambientes com elegância"

### Call-to-Actions
1. "Solicitar Orçamento Grátis"
2. "Falar no WhatsApp"
3. "Ver Opções de Tecidos"
4. "Calcular Meu Orçamento"

---

## 🔐 INFORMAÇÕES SENSÍVEIS

### NÃO compartilhar publicamente:
- Senhas de email
- Chaves de API
- Credenciais de hospedagem
- Dados de clientes
- Informações financeiras

### Arquivos protegidos (.gitignore):
- `.env`
- `.env.local`
- `instance/` (banco de dados)
- `__pycache__/`

---

## ✅ CHECKLIST DE MEMÓRIA

Sempre lembrar de:
- [x] Responder em PT-BR
- [x] Projeto: Cortinas Bresser
- [x] Campanhas: Google Ads + Meta Ads ativas
- [x] Objetivo: Maximizar conversões e leads
- [x] Stack: Next.js + Flask
- [x] Localização: São Paulo - Brás
- [x] Diferenciais: Confecção própria, instalação grátis, entrega rápida

---

**Última atualização:** 07/12/2025  
**Versão:** 1.0  
**Mantido por:** Equipe Cortinas Bresser
