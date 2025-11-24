# 🧹 Limpeza e Otimização do Projeto

## Arquivos a Remover

### Documentação Redundante (32 arquivos)
- ✅ CHECKLIST-DEPLOY.md (Locaweb - não usado mais)
- ✅ CONFIGURAR-DOMINIO.md (duplicado)
- ✅ CORRECTIONS.md (temporário)
- ✅ CSS-MIGRATION.md (histórico)
- ✅ DEPLOY-GUIDE.md (antigo)
- ✅ DEPLOY-WEB.md (antigo)
- ✅ DEPLOY.md (antigo)
- ✅ DOCKER-FIXES.md (temporário)
- ✅ DOMAIN-SETUP.md (duplicado)
- ✅ EASYPANEL-FIX-GUIDE.md (temporário)
- ✅ ELEGANT-UPDATE.md (histórico)
- ✅ FINAL-SUMMARY.md (histórico)
- ✅ FORM-EFFECTS.md (histórico)
- ✅ GITHUB-AUTH.md (setup único)
- ✅ IMAGE-SPECS.md (specs antigas)
- ✅ IMPLEMENTATION-SUMMARY.md (histórico)
- ✅ LEIA-ME-PRIMEIRO.txt (Locaweb)
- ✅ LOCAWEB-DEPLOY.md (não usado)
- ✅ LOCAWEB-QUICKSTART.md (não usado)
- ✅ MIGRATION-COMPLETE.md (histórico)
- ✅ NETLIFY-DEPLOY.md (não usado)
- ✅ PREMIUM-IMPROVEMENTS.md (histórico)
- ✅ PROJECT-STRUCTURE.txt (antigo)
- ✅ PROJECT_SUMMARY.md (histórico)
- ✅ PRONTO-PARA-LOCAWEB.md (não usado)
- ✅ QUICKSTART.md (antigo)
- ✅ RESPONSIVE.md (specs antigas)
- ✅ SETUP-SUMMARY.md (histórico)
- ✅ VERCEL-DEPLOY.md (não usado)

### Scripts Desnecessários (5 arquivos)
- ✅ scripts/deploy-ftp-sync.js (Locaweb)
- ✅ scripts/deploy-ftp.js (Locaweb)
- ✅ scripts/deploy-ftp.ps1 (Locaweb)
- ✅ scripts/deploy-locaweb.js (Locaweb)
- ✅ scripts/test-ftp.js (Locaweb)

### Arquivos de Config Antigos (5 arquivos)
- ✅ .env.locaweb (não usado)
- ✅ .htaccess (para Apache/Locaweb)
- ✅ netlify.toml (não usado)
- ✅ next.config.docker.mjs (duplicado)
- ✅ ecosystem.config.js (PM2 - não usado no EasyPanel)

### Diretórios Vazios/Antigos
- ✅ .netlify
- ✅ out (build estático antigo)
- ✅ crm-system (se vazio)
- ✅ frontend (se vazio)
- ✅ current (se antigo)

## Manter (Essenciais)

### Documentação Mínima
- ✅ README.md (principal)
- ✅ VPS-README.md (guia VPS)
- ✅ EASYPANEL-DEPLOY.md (deploy atual)
- ✅ EASYPANEL-QUICKSTART.md (início rápido)
- ✅ DOCKER-DEPLOY.md (Docker)
- ✅ VPS-FAQ.md (FAQ)
- ✅ VPS-ROADMAP.md (roadmap)
- ✅ CHECKLIST-VPS.md (checklist)
- ✅ IMPORTANTE-API-LIMITACAO.md (importante!)

### Código Fonte
- ✅ app/
- ✅ components/
- ✅ lib/
- ✅ public/

### Configurações
- ✅ package.json
- ✅ next.config.mjs
- ✅ tsconfig.json
- ✅ tailwind.config.js
- ✅ postcss.config.js
- ✅ .eslintrc.json
- ✅ .gitignore
- ✅ .env.example
- ✅ Dockerfile
- ✅ docker-compose.yml

### Scripts Úteis
- ✅ scripts/clean-install.ps1
- ✅ scripts/vps-install.sh

## Economia Esperada

- **Antes**: ~57 arquivos na raiz
- **Depois**: ~25 arquivos na raiz
- **Economia**: ~32 arquivos removidos
- **Tamanho**: ~150KB+ economizados

## Executar Limpeza

```bash
# PowerShell
.\scripts\cleanup.ps1
```

Ou manualmente seguir a lista acima.
