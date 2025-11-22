# CRM Cortinas Bresser

Sistema de gerenciamento de relacionamento com clientes para Cortinas Bresser.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário

## 📋 Pré-requisitos

- Node.js 18.17 ou superior
- npm, yarn ou pnpm

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## 🏃 Executando o Projeto

### Modo de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Produção

```bash
npm run build
npm run start
```

## 📁 Estrutura do Projeto

```
cortinasbresser/
├── app/                  # App Router do Next.js
│   ├── layout.tsx       # Layout raiz
│   ├── page.tsx         # Página inicial
│   └── globals.css      # Estilos globais
├── public/              # Arquivos estáticos
├── next.config.mjs      # Configuração Next.js
├── tsconfig.json        # Configuração TypeScript
├── tailwind.config.js   # Configuração Tailwind
└── package.json         # Dependências do projeto
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

## 📄 Licença

ISC
