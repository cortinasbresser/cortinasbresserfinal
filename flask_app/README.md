# Sistema de Orçamentos - Cortinas Bresser (Flask)

Este projeto foi implementado utilizando Python e Flask, conforme solicitado.

## Estrutura
- `app.py`: Aplicação principal e rotas.
- `models.py`: Modelo de dados (Lead).
- `pdf_generator.py`: Geração de PDF com ReportLab.
- `templates/`: Arquivos HTML (Jinja2).
- `static/`: Arquivos CSS e imagens.

## Como Rodar

1. **Crie um ambiente virtual:**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

2. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env`.
   - Edite o arquivo `.env` com suas credenciais de e-mail e senha de admin.
   - **Nota:** O arquivo `.env` não é versionado por segurança.

4. **Execute a aplicação:**
   ```bash
   python app.py
   ```
   Acesse `http://localhost:5000` no navegador.

## Funcionalidades
- **Formulário de Orçamento:** Captura dados e envia e-mails.
- **Admin:** Acesse `/admin/leads` (Login: admin/senha123 por padrão).
- **PDF:** Geração automática de PDF de orçamento.
- **WhatsApp:** Link direto para contato no painel admin.
