# 🔧 Solução de Problemas: Formulário de Orçamento

Identificamos que o formulário de orçamento pode não estar funcionando devido à falta de configuração das variáveis de ambiente necessárias para o envio de e-mails.

## 🚨 O Problema

O formulário envia os dados para uma API interna (`/api/send-quote`). Esta API utiliza o `nodemailer` para enviar um e-mail com os detalhes do orçamento. Para que isso funcione, o servidor precisa saber as credenciais do seu provedor de e-mail (SMTP).

Se essas credenciais não estiverem configuradas no ambiente onde o site está rodando (VPS, Docker, EasyPanel, ou Local), a API falhará com erro 500.

## ✅ A Solução

Você precisa definir as seguintes variáveis de ambiente no seu servidor ou arquivo `.env`:

```env
SMTP_HOST=smtp.seuprovedor.com      # Ex: smtp.gmail.com ou smtp.titan.email
SMTP_PORT=587                       # Geralmente 587 ou 465
SMTP_USER=seu_email@dominio.com     # Seu e-mail de envio
SMTP_PASS=sua_senha_secreta         # Sua senha (ou App Password)
RECIPIENT_EMAIL=destino@dominio.com # Para onde o orçamento deve ser enviado
```

### 1. Se estiver usando Docker (VPS)

Atualizamos o arquivo `docker-compose.yml` para aceitar essas variáveis. Agora você precisa garantir que elas estejam no arquivo `.env` na sua VPS, no mesmo diretório do `docker-compose.yml`.

1. Acesse a VPS via SSH.
2. Edite o arquivo `.env`:
   ```bash
   nano .env
   ```
3. Adicione as variáveis acima com seus dados reais.
4. Reinicie o container:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

### 2. Se estiver usando EasyPanel

1. Acesse o painel do seu projeto.
2. Vá na aba **Environment**.
3. Adicione cada uma das variáveis listadas acima.
4. Clique em **Save** e depois faça um **Redeploy**.

### 3. Se estiver rodando Localmente (`npm run dev`)

Certifique-se de que o arquivo `.env` na raiz do projeto contém essas variáveis preenchidas corretamente.

### 4. Se estiver usando Hospedagem Estática (FTP/Locaweb)

**Atenção:** Se você está apenas copiando a pasta `out` para um servidor FTP, **o formulário NÃO funcionará**.
A exportação estática do Next.js não suporta API Routes (`/api/...`).
Para usar o formulário em hospedagem estática, você precisará de uma solução externa como Formspree, EmailJS, ou migrar para uma hospedagem que suporte Node.js (como a VPS que você configurou).

## 🧪 Como Testar

1. Preencha o formulário no site.
2. Abra o Console do Navegador (F12) e veja a aba "Network" ou "Console".
3. Se der erro 500, verifique os logs do servidor (`docker logs cortinasbresser` ou logs do EasyPanel).
4. Se der erro 404, você está em um ambiente estático que não suporta a API.

### 5. Problemas com o PDF

Se o e-mail chegar sem anexo ou der erro ao gerar o PDF:
- Verifique se a pasta `quotes` tem permissão de escrita (no Docker isso é automático com o volume).
- Se estiver rodando localmente no Windows, certifique-se de que não há antivírus bloqueando a criação de arquivos.
- O PDF é salvo localmente na pasta `quotes` na raiz do projeto como backup.

