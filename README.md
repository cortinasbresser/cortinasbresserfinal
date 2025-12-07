# 🏠 Cortinas Bresser - Site Institucional
## Sistema de Orçamentos e Marketing Digital

[![Status](https://img.shields.io/badge/status-ativo-success.svg)](https://www.cortinasbresser.com.br)
[![SEO](https://img.shields.io/badge/SEO-otimizado-blue.svg)](#)
[![Google Ads](https://img.shields.io/badge/Google%20Ads-pronto-green.svg)](#)
[![Meta Ads](https://img.shields.io/badge/Meta%20Ads-pronto-blue.svg)](#)

Site institucional da **Cortinas Bresser**, especializada em cortinas sob medida em São Paulo. Sistema completo com formulário de orçamento, integração WhatsApp, rastreamento de conversões e otimização para campanhas pagas.

🌐 **Site:** https://www.cortinasbresser.com.br  
📍 **Localização:** Rua Bresser, 1084 - Brás, São Paulo - SP  
📱 **WhatsApp:** (11) 99401-3938

---

## 🚀 Tecnologias

### Frontend (Principal)
- **Next.js 16** - Framework React com App Router
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form + Zod** - Validação de formulários

### Backend (API/Formulários)
- **Flask** - Framework Python para API
- **SQLite** - Banco de dados para leads
- **PDFKit** - Geração de PDFs
- **Nodemailer** - Envio de emails

### Marketing & Analytics
- **Google Analytics 4** - Análise de tráfego
- **Google Ads** - Campanhas de pesquisa
- **Meta Pixel** - Rastreamento Facebook/Instagram
- **Structured Data** - Schema.org (SEO)

### Deploy
- **Locaweb** - Hospedagem frontend (export estático)
- **EasyPanel** - Backend Flask (VPS Hostinger)

---

## 📋 Pré-requisitos

- **Node.js** 18.17 ou superior
- **Python** 3.8 ou superior (para Flask)
- **npm/yarn/pnpm** - Gerenciador de pacotes

---

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/cortinasbresser.git
cd cortinasbresser
```

### 2. Instale dependências do Frontend
```bash
npm install
```

### 3. Instale dependências do Backend (Flask)
```bash
cd flask_app
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 4. Configure variáveis de ambiente
```bash
# Copie o exemplo
cp .env.example .env

# Edite com suas credenciais
# - Google Analytics ID
# - Google Ads ID
# - Meta Pixel ID
# - SMTP (email)
```

---

## 🏃 Executando o Projeto

### Modo de Desenvolvimento

#### Frontend (Next.js)
```bash
npm run dev
```
Acesse: http://localhost:3000

#### Backend (Flask)
```bash
cd flask_app
python app.py
```
Acesse: http://localhost:5000

### Build de Produção

#### Export Estático (Locaweb)
```bash
npm run build:static
# Arquivos gerados em: ./out
```

#### Docker (EasyPanel)
```bash
docker-compose up -d
```

---

## 📁 Estrutura do Projeto

```
cortinasbresser/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz + Meta tags
│   ├── page.tsx                 # Página principal
│   ├── globals.css              # Estilos globais
│   └── api/                     # API Routes (não usado em export)
│
├── components/                   # Componentes React
│   ├── QuoteForm.tsx            # Formulário de orçamento
│   └── HeroCarousel.tsx         # Carrossel de imagens
│
├── lib/                         # Bibliotecas e utilitários
│   ├── seo.ts                   # Configurações de SEO
│   └── tracking.ts              # Rastreamento de eventos
│
├── flask_app/                   # Backend Flask
│   ├── app.py                   # Aplicação principal
│   ├── models.py                # Modelos do banco
│   ├── pdf_generator.py         # Geração de PDFs
│   └── templates/               # Templates HTML
│
├── public/                      # Arquivos estáticos
│   ├── robots.txt               # Configuração de rastreamento
│   ├── sitemap.xml              # Mapa do site
│   └── assets/                  # Imagens e SVGs
│
├── docs/                        # Documentação
│   ├── RESUMO-SEO.md           # Visão geral de SEO
│   ├── GUIA-RAPIDO-ADS.md      # Configuração rápida
│   ├── CONFIGURAR-GOOGLE-META-ADS.md  # Guia completo
│   └── RELATORIO-SEO.md        # Relatório detalhado
│
├── .env.example                 # Exemplo de variáveis
├── next.config.mjs              # Configuração Next.js
├── tailwind.config.js           # Configuração Tailwind
├── tsconfig.json                # Configuração TypeScript
└── package.json                 # Dependências
```

---

## 📝 Scripts Disponíveis

### Frontend
```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção (standalone)
npm run build:static     # Build estático (Locaweb)
npm run start            # Servidor de produção
npm run lint             # Linter
```

### Deploy
```bash
npm run deploy:locaweb   # Deploy automático Locaweb (FTP)
```

---

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] Landing page responsiva e otimizada
- [x] Formulário de orçamento com validação
- [x] Integração WhatsApp
- [x] Envio de email automático
- [x] Geração de PDF com orçamento
- [x] Rastreamento de conversões (Google + Meta)
- [x] SEO otimizado (40+ keywords)
- [x] Structured Data (Schema.org)
- [x] Meta tags para anúncios
- [x] Sitemap e robots.txt
- [x] Modal de confirmação
- [x] Carrossel de imagens

### 🔄 Em Desenvolvimento
- [ ] Painel administrativo (visualizar leads)
- [ ] Dashboard de métricas
- [ ] Sistema de remarketing
- [ ] Chat online

---

## 📊 SEO e Marketing

### Otimizações Aplicadas
✅ **40+ palavras-chave** estratégicas  
✅ **Meta tags** otimizadas para conversão  
✅ **Structured Data** completo (LocalBusiness, FAQ, Product)  
✅ **Rastreamento de eventos** (Google Analytics + Meta Pixel)  
✅ **Canonical URLs** e sitemap.xml  
✅ **robots.txt** configurado  

### Eventos Rastreados
1. **PageView** - Visualização de página
2. **FormStart** - Início de preenchimento
3. **FormSubmission** - Conversão (lead)
4. **FormError** - Erros no formulário
5. **WhatsAppClick** - Cliques no WhatsApp
6. **SocialClick** - Cliques em redes sociais

### Palavras-chave Principais
- cortinas sob medida são paulo
- cortinas sob medida sp
- orçamento cortinas são paulo
- cortinas blackout sob medida
- cortinas com instalação são paulo

📖 **Documentação completa:** Veja `docs/RESUMO-SEO.md`

---

## 🔐 Variáveis de Ambiente

### Obrigatórias
```env
# Google
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_ADS_ID=AW-XXXXXXXXXX

# Meta (Facebook)
META_PIXEL_ID=123456789012345

# Email (Flask)
SMTP_SERVER=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=loja@cortinasbresser.com.br
SMTP_PASSWORD=***
```

### Opcionais
```env
# Google Search Console
GOOGLE_SEARCH_CONSOLE_CODE=abc123xyz

# Facebook
FACEBOOK_DOMAIN_VERIFICATION=abc123xyz
FACEBOOK_APP_ID=123456789012345
```

---

## 🚀 Deploy

### Locaweb (Frontend)
1. Execute: `npm run build:static`
2. Faça upload da pasta `out/` via FTP
3. Configure domínio no painel

📖 **Guia detalhado:** Veja `EASYPANEL-DEPLOY.md`

### EasyPanel (Backend Flask)
1. Configure projeto no EasyPanel
2. Adicione variáveis de ambiente
3. Deploy automático via Git

📖 **Guia detalhado:** Veja `CONFIGURAR-EASYPANEL.md`

---

## 📈 Métricas e Objetivos

### KPIs
| Métrica | Meta | Status |
|---------|------|--------|
| Taxa de Conversão | > 3% | 🎯 |
| Custo por Lead (Google) | < R$ 50 | 🎯 |
| Custo por Lead (Meta) | < R$ 30 | 🎯 |
| CTR Google Ads | > 3% | 🎯 |
| CTR Meta Ads | > 1,5% | 🎯 |

---

## 🆘 Suporte e Documentação

### Documentação Disponível
1. **RESUMO-SEO.md** - Visão geral de SEO
2. **GUIA-RAPIDO-ADS.md** - Configuração em 30 min
3. **CONFIGURAR-GOOGLE-META-ADS.md** - Guia técnico completo
4. **RELATORIO-SEO.md** - Relatório detalhado
5. **EASYPANEL-DEPLOY.md** - Deploy no EasyPanel

### Links Úteis
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Google Ads](https://ads.google.com)
- [Meta Business Suite](https://business.facebook.com)
- [Meta Pixel](https://business.facebook.com/events_manager2)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📄 Licença

ISC

---

## 📞 Contato

**Cortinas Bresser**  
📍 Rua Bresser, 1084 - Brás, São Paulo - SP  
📞 (11) 2692-7865  
📱 (11) 99401-3938 | (11) 95661-6041  
📧 loja@cortinasbresser.com.br  
🌐 https://www.cortinasbresser.com.br

---

**Desenvolvido com ❤️ para Cortinas Bresser**  
**Última atualização:** 07/12/2025  
**Versão:** 1.0
