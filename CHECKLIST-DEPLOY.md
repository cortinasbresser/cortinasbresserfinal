# ✅ Checklist de Deploy - Locaweb

Use este checklist para garantir que tudo está pronto para o deploy.

## 📋 Antes do Deploy

### Preparação Local
- [ ] Projeto testado localmente (`npm run dev`)
- [ ] Todas as alterações commitadas no Git
- [ ] Build executado com sucesso (`npm run build:static`)
- [ ] Pasta `out` criada e populada
- [ ] Arquivo `.htaccess` presente na raiz do projeto

### Configuração Locaweb
- [ ] Conta de hospedagem ativa na Locaweb
- [ ] Credenciais FTP em mãos (host, usuário, senha)
- [ ] Domínio registrado e configurado
- [ ] DNS apontando para os servidores da Locaweb

### Credenciais FTP
- [ ] Arquivo `.env` criado (copiar de `.env.locaweb`)
- [ ] `FTP_HOST` configurado (ex: ftp.seudominio.com.br)
- [ ] `FTP_USER` configurado
- [ ] `FTP_PASSWORD` configurado
- [ ] `FTP_REMOTE_PATH` configurado (geralmente `/public_html`)

## 🚀 Durante o Deploy

### Opção A: Deploy Automático
- [ ] Executar: `npm run deploy:locaweb`
- [ ] Aguardar conclusão (pode levar alguns minutos)
- [ ] Verificar mensagem de sucesso

### Opção B: Upload Manual (FileZilla)
- [ ] FileZilla instalado
- [ ] Conexão FTP estabelecida
- [ ] Navegado até `/public_html` no servidor
- [ ] Todo conteúdo da pasta `out` enviado
- [ ] Arquivo `.htaccess` enviado para a raiz
- [ ] Permissões corretas (644 arquivos, 755 pastas)

## 🧪 Após o Deploy

### Testes Básicos
- [ ] Site acessível pelo domínio
- [ ] Página inicial carrega corretamente
- [ ] Imagens aparecem
- [ ] CSS está aplicado
- [ ] Animações funcionando
- [ ] Scroll suave funciona

### Testes de Navegação
- [ ] Todos os links internos funcionam
- [ ] Menu de navegação funciona
- [ ] Âncoras (#sections) funcionam corretamente
- [ ] Botão WhatsApp funciona

### Testes do Formulário
- [ ] Formulário de orçamento aparece
- [ ] Campos validam corretamente
- [ ] Modal de confirmação aparece
- [ ] Redirecionamento para WhatsApp funciona
- [ ] Mensagem do WhatsApp está formatada corretamente

### Testes Responsivos
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile (360x640)

### Performance
- [ ] Tempo de carregamento < 3 segundos
- [ ] Imagens otimizadas
- [ ] CSS e JS comprimidos
- [ ] GZIP habilitado

### SEO e Segurança
- [ ] SSL/HTTPS configurado
- [ ] Redirecionamento HTTP → HTTPS funciona
- [ ] Meta tags presentes
- [ ] Título da página correto
- [ ] Favicon aparece
- [ ] robots.txt configurado (se necessário)

### Navegadores
Testar em:
- [ ] Google Chrome
- [ ] Mozilla Firefox
- [ ] Safari (iOS)
- [ ] Microsoft Edge
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

## 🔧 Configurações Adicionais

### Painel Locaweb
- [ ] SSL Let's Encrypt ativado (gratuito)
- [ ] Redirecionamento www ↔ não-www configurado
- [ ] Email configurado (contato@seudominio.com.br)
- [ ] Backup automático ativado

### Analytics (Opcional)
- [ ] Google Analytics instalado
- [ ] Google Search Console configurado
- [ ] Facebook Pixel (se usar)
- [ ] Hotjar ou similar (se usar)

### Monitoramento
- [ ] Uptime monitoring configurado
- [ ] Alertas de downtime
- [ ] Monitoramento de performance

## 📱 Marketing e Divulgação

### Antes de Divulgar
- [ ] Informações de contato corretas
- [ ] Telefone/WhatsApp correto
- [ ] Endereço correto
- [ ] Horário de funcionamento atualizado
- [ ] Portfolio/galeria atualizada

### Google Business
- [ ] Perfil do Google Meu Negócio criado
- [ ] Localização configurada
- [ ] Fotos dos produtos adicionadas
- [ ] Horário de funcionamento correto

### Redes Sociais
- [ ] Link do site no Instagram
- [ ] Link do site no Facebook
- [ ] Post de lançamento preparado

## 🔄 Manutenção

### Atualizações Futuras
Para atualizar o site:
1. [ ] Fazer alterações no código local
2. [ ] Testar localmente
3. [ ] Executar `npm run deploy:locaweb`
4. [ ] Testar no ar
5. [ ] Limpar cache do navegador

### Backup Regular
- [ ] Backup semanal dos arquivos
- [ ] Backup do banco de dados (se houver)
- [ ] Backup das configurações

## ✅ Lista de Verificação Final

Antes de considerar o deploy completo:

- [ ] ✅ Site 100% funcional
- [ ] ✅ Testado em todos os dispositivos
- [ ] ✅ Performance excelente
- [ ] ✅ SSL configurado
- [ ] ✅ Sem erros no console
- [ ] ✅ SEO básico implementado
- [ ] ✅ Formulário funcionando
- [ ] ✅ WhatsApp integrado
- [ ] ✅ Analytics configurado (opcional)
- [ ] ✅ Backup configurado

## 📞 Suporte

### Problemas Técnicos
- **Locaweb**: 0800 777 4000
- **Chat**: Painel da Locaweb

### Problemas com o Código
- Verifique os logs de erro
- Console do navegador (F12)
- Arquivo de log do servidor (painel Locaweb)

---

**Data do Deploy**: ___/___/______

**Responsável**: _________________

**Domínio**: _____________________

**Status**: [ ] Em andamento  [ ] Concluído  [ ] Com pendências
