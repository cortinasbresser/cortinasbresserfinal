# 📄 GUIA: Enviar PDF pelo WhatsApp
## Cortinas Bresser - Solução para Anexar PDF no WhatsApp

**Data:** 07/12/2025  
**Status:** Solução Técnica  
**Idioma:** PT-BR

---

## ⚠️ LIMITAÇÃO TÉCNICA

O WhatsApp Web (`wa.me`) **NÃO permite enviar arquivos anexados** diretamente pela URL.  
Só é possível enviar **texto pré-preenchido**.

---

## ✅ SOLUÇÃO IMPLEMENTADA

### Opção 1: Salvar PDF e Enviar Link (Recomendado)

O PDF será salvo em uma pasta pública e o **link de download** será enviado pelo WhatsApp.

---

## 🔧 IMPLEMENTAÇÃO

### 1. Modificar `flask_app/app.py`

Adicione após a linha 110 (após gerar o PDF):

```python
# 4. Save PDF to static folder for download
# Create pdfs directory if it doesn't exist
pdf_dir = os.path.join(app.root_path, 'static', 'pdfs')
os.makedirs(pdf_dir, exist_ok=True)

# Save PDF file
pdf_filename = f"orcamento_{lead.id}.pdf"
pdf_path = os.path.join(pdf_dir, pdf_filename)
with open(pdf_path, 'wb') as f:
    f.write(pdf_bytes)

# Generate PDF download URL
# Use environment variable for base URL or default to localhost
base_url = os.environ.get('BASE_URL', 'http://localhost:5000')
pdf_url = f"{base_url}/static/pdfs/{pdf_filename}"
```

### 2. Modificar o Email para Incluir Link

Altere a linha 116 para incluir o link do PDF:

```python
msg_store.body = f"""Novo orçamento recebido.

Cliente: {lead.nome}
Telefone: {lead.telefone}
Tecido: {lead.tecido}
Instalação: {lead.instalacao}

📄 Link do PDF: {pdf_url}
"""
```

### 3. Passar PDF URL para o Template

Altere a linha 160 para:

```python
return render_template('success.html', lead=lead, pdf_url=pdf_url)
```

### 4. Modificar Template `success.html`

Crie ou modifique `flask_app/templates/success.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orçamento Enviado - Cortinas Bresser</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .success-icon {
            font-size: 64px;
            color: #27ae60;
            margin-bottom: 20px;
        }
        .info {
            background: #ecf0f1;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: left;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s;
        }
        .btn-whatsapp {
            background: #25D366;
            color: white;
        }
        .btn-whatsapp:hover {
            background: #128C7E;
            transform: translateY(-2px);
        }
        .btn-download {
            background: #3498db;
            color: white;
        }
        .btn-download:hover {
            background: #2980b9;
            transform: translateY(-2px);
        }
        .btn-home {
            background: #95a5a6;
            color: white;
        }
        .btn-home:hover {
            background: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-icon">✅</div>
        <h1>Orçamento Enviado com Sucesso!</h1>
        <p>Obrigado, <strong>{{ lead.nome }}</strong>!</p>
        
        <div class="info">
            <p><strong>Número do Orçamento:</strong> #{{ lead.id }}</p>
            <p><strong>Tecido:</strong> {{ lead.tecido }}</p>
            <p><strong>Instalação:</strong> {{ lead.instalacao }}</p>
        </div>

        <p>Seu orçamento foi enviado por email e está disponível para download.</p>

        <!-- Botão de Download do PDF -->
        <a href="{{ pdf_url }}" class="btn btn-download" download>
            📄 Baixar PDF
        </a>

        <!-- Botão do WhatsApp com Link do PDF -->
        <a href="https://wa.me/5511994013938?text={{ whatsapp_message }}" 
           class="btn btn-whatsapp" 
           target="_blank">
            💬 Continuar no WhatsApp
        </a>

        <br><br>
        <a href="/" class="btn btn-home">Voltar ao Início</a>
    </div>

    <script>
        // Redirecionar automaticamente para WhatsApp após 3 segundos
        setTimeout(function() {
            window.open('https://wa.me/5511994013938?text={{ whatsapp_message }}', '_blank');
        }, 3000);
    </script>
</body>
</html>
```

### 5. Atualizar a Função para Gerar Mensagem WhatsApp

Adicione antes do `return render_template` (linha ~160):

```python
# Generate WhatsApp message with PDF link
from urllib.parse import quote
whatsapp_message = f"""*ORÇAMENTO CORTINAS BRESSER*

Olá! Acabei de solicitar um orçamento.

*Dados:*
Nome: {lead.nome}
Telefone: {lead.telefone}
Tecido: {lead.tecido}
Instalação: {lead.instalacao}

*📄 PDF do Orçamento:*
{pdf_url}

Orçamento #{lead.id}
"""

return render_template('success.html', 
                      lead=lead, 
                      pdf_url=pdf_url,
                      whatsapp_message=quote(whatsapp_message))
```

---

## 🌐 CONFIGURAR VARIÁVEL DE AMBIENTE

Adicione no arquivo `.env`:

```env
# URL base do site (produção)
BASE_URL=https://www.cortinasbresser.com.br

# Para desenvolvimento local
# BASE_URL=http://localhost:5000
```

---

## 📁 ESTRUTURA DE PASTAS

Após implementação:

```
flask_app/
├── static/
│   └── pdfs/              # ✅ NOVA PASTA (criada automaticamente)
│       ├── orcamento_1.pdf
│       ├── orcamento_2.pdf
│       └── ...
├── templates/
│   ├── index.html
│   └── success.html       # ✅ MODIFICAR
├── app.py                 # ✅ MODIFICAR
└── pdf_generator.py
```

---

## ✅ COMO FUNCIONA

### Fluxo Completo:

1. **Cliente preenche formulário** → Dados salvos no banco
2. **PDF é gerado** → Salvo em `static/pdfs/`
3. **Email enviado** → Com PDF anexado + link de download
4. **Página de sucesso** → Mostra botão de download + WhatsApp
5. **WhatsApp abre** → Com mensagem pré-preenchida incluindo link do PDF
6. **Cliente envia** → Vendedor recebe mensagem com link do PDF

### Mensagem no WhatsApp:

```
*ORÇAMENTO CORTINAS BRESSER*

Olá! Acabei de solicitar um orçamento.

*Dados:*
Nome: João Silva
Telefone: (11) 99999-9999
Tecido: Blackout
Instalação: Trilho

*📄 PDF do Orçamento:*
https://www.cortinasbresser.com.br/static/pdfs/orcamento_123.pdf

Orçamento #123
```

---

## 🔐 SEGURANÇA

### Considerações:

1. **PDFs públicos:** Os PDFs estarão acessíveis publicamente via URL
2. **Nome do arquivo:** Inclui ID do orçamento (dificulta adivinhação)
3. **Limpeza:** Considere limpar PDFs antigos periodicamente

### Melhorias de Segurança (Opcional):

```python
# Adicionar token único ao nome do arquivo
import secrets

pdf_filename = f"orcamento_{lead.id}_{secrets.token_urlsafe(16)}.pdf"
```

---

## 🧹 LIMPEZA AUTOMÁTICA DE PDFs ANTIGOS

Adicione uma rota para limpar PDFs com mais de 30 dias:

```python
@app.route('/admin/cleanup_pdfs')
@requires_auth
def cleanup_pdfs():
    import time
    pdf_dir = os.path.join(app.root_path, 'static', 'pdfs')
    now = time.time()
    deleted = 0
    
    for filename in os.listdir(pdf_dir):
        filepath = os.path.join(pdf_dir, filename)
        # Delete files older than 30 days
        if os.path.isfile(filepath):
            if os.stat(filepath).st_mtime < now - 30 * 86400:
                os.remove(filepath)
                deleted += 1
    
    return f"Limpeza concluída. {deleted} arquivos removidos."
```

---

## 🚀 ALTERNATIVA: API do WhatsApp Business

Para enviar PDFs **diretamente** pelo WhatsApp (sem link), você precisaria:

1. **WhatsApp Business API** (pago)
2. **Integração com provedor** (Twilio, MessageBird, etc.)
3. **Webhook configurado**

**Custo aproximado:** R$ 0,10 - R$ 0,50 por mensagem

---

## 📝 CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Modificar `flask_app/app.py` (salvar PDF)
- [ ] Atualizar template `success.html`
- [ ] Adicionar `BASE_URL` no `.env`
- [ ] Testar localmente
- [ ] Fazer deploy
- [ ] Testar em produção
- [ ] Verificar se PDF é baixável
- [ ] Testar mensagem WhatsApp

---

## 🆘 TROUBLESHOOTING

### PDF não está sendo salvo
```python
# Verificar permissões da pasta
import os
pdf_dir = os.path.join(app.root_path, 'static', 'pdfs')
print(f"PDF Directory: {pdf_dir}")
print(f"Exists: {os.path.exists(pdf_dir)}")
print(f"Writable: {os.access(pdf_dir, os.W_OK)}")
```

### Link do PDF não funciona
- Verifique se `BASE_URL` está correto no `.env`
- Confirme que a pasta `static/pdfs/` existe
- Teste o link diretamente no navegador

### WhatsApp não abre
- Verifique se a mensagem está sendo codificada corretamente (`quote()`)
- Teste o link manualmente

---

## ✅ RESULTADO FINAL

**Antes:**
- PDF enviado apenas por email
- Cliente não tinha acesso fácil ao PDF

**Depois:**
- ✅ PDF salvo e acessível via link
- ✅ Link enviado por email
- ✅ Link incluído na mensagem do WhatsApp
- ✅ Cliente pode baixar PDF a qualquer momento
- ✅ Vendedor recebe link do PDF pelo WhatsApp

---

**Preparado por:** Antigravity AI  
**Data:** 07/12/2025  
**Versão:** 1.0  
**Idioma:** PT-BR
