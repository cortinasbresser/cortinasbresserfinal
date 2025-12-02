# ⚠️ AÇÃO NECESSÁRIA: Configuração do EasyPanel

O formulário de orçamento **NÃO FUNCIONARÁ** até que você configure as variáveis de ambiente no EasyPanel.
O código está correto, mas o servidor não tem as senhas para enviar o e-mail.

## Passo a Passo

1. Acesse o seu **EasyPanel**.
2. Vá para o seu projeto **Cortinas Bresser**.
3. Clique na aba **Environment** (Ambiente).
4. Clique em **Add Environment Variable** para cada item abaixo e preencha:

| Key (Nome) | Value (Valor) |
|------------|---------------|
| `SMTP_HOST` | `mail.cronos-painel.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `loja@cortinasbresser.com.br` (ou seu e-mail de envio) |
| `SMTP_PASS` | **(Sua senha do e-mail)** |
| `RECIPIENT_EMAIL` | `loja@cortinasbresser.com.br` (ou quem deve receber o orçamento) |

5. Clique em **Save**.
6. Clique em **Deploy** (ou Redeploy) para aplicar as mudanças.

---

## Detalhes Técnicos (Se precisar)

- **Protocolo**: SMTP Seguro (SSL/TLS)
- **Porta**: 465
- **Host**: mail.cronos-painel.com

Se após configurar isso ainda der erro, verifique se a senha está correta acessando o webmail.
