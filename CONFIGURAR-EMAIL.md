# ⚠️ AÇÃO NECESSÁRIA: Configurar Variáveis de Ambiente

O erro "servidor de email ausente" significa que o EasyPanel (ou seu ambiente local) não tem as senhas do e-mail configuradas. Por segurança, essas senhas NÃO vão junto com o código.

## 1. Se você está no EasyPanel (VPS)

1. Acesse o EasyPanel.
2. Clique no projeto **cortinasbresser**.
3. Vá na aba **Environment**.
4. Clique em **"Edit Environment"** ou **"Add Variable"**.
5. Adicione as seguintes chaves e seus valores (copie e preencha):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu.email@gmail.com
SMTP_PASS=sua_senha_de_app_aqui
RECIPIENT_EMAIL=email_que_recebe_orcamentos@gmail.com
```

> **Nota:** Se usar Gmail, a senha deve ser uma "Senha de App" (App Password), não sua senha normal.
> Gere aqui: https://myaccount.google.com/apppasswords

6. Clique em **Save**.
7. Clique em **Deploy** (botão roxo/azul geralmente no topo) para aplicar as mudanças.

## 2. Se você está testando Localmente (Windows)

1. Crie um arquivo chamado `.env` na pasta `e:\CB\www\cortinasbresser\` (se não existir).
2. Cole o conteúdo acima dentro dele, preenchendo com seus dados reais.
3. Pare o terminal (`Ctrl + C`) e rode `npm run dev` novamente.
