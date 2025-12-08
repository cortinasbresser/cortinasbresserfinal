-- =====================================================
-- BANCO DE DADOS: Cortinas Bresser - N8N Integration
-- =====================================================
-- Este script cria as tabelas necessárias para armazenar
-- leads e interações do WhatsApp via N8N
-- =====================================================

-- Conectar ao banco 'evolution' (usado pela Evolution API)
\c evolution;

-- =====================================================
-- Tabela: leads
-- Armazena todos os leads capturados via WhatsApp
-- =====================================================
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    telefone VARCHAR(20) NOT NULL,
    nome VARCHAR(255),
    email VARCHAR(255),
    mensagem TEXT,
    intencao VARCHAR(50),
    tecido VARCHAR(50),
    instalacao VARCHAR(50),
    tamanho VARCHAR(100),
    status VARCHAR(20) DEFAULT 'novo',
    origem VARCHAR(50) DEFAULT 'whatsapp',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atendido_por VARCHAR(100),
    observacoes TEXT
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_leads_telefone ON leads(telefone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_timestamp ON leads(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_leads_intencao ON leads(intencao);

-- =====================================================
-- Tabela: mensagens
-- Histórico completo de mensagens trocadas
-- =====================================================
CREATE TABLE IF NOT EXISTS mensagens (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id),
    telefone VARCHAR(20) NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'recebida' ou 'enviada'
    conteudo TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT FALSE,
    respondida BOOLEAN DEFAULT FALSE,
    metadata JSONB
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_mensagens_lead_id ON mensagens(lead_id);
CREATE INDEX IF NOT EXISTS idx_mensagens_telefone ON mensagens(telefone);
CREATE INDEX IF NOT EXISTS idx_mensagens_timestamp ON mensagens(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_mensagens_tipo ON mensagens(tipo);

-- =====================================================
-- Tabela: orcamentos
-- Orçamentos gerados automaticamente
-- =====================================================
CREATE TABLE IF NOT EXISTS orcamentos (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id),
    numero_orcamento VARCHAR(50) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    nome VARCHAR(255),
    email VARCHAR(255),
    tecido VARCHAR(50),
    instalacao VARCHAR(50),
    tamanho VARCHAR(100),
    valor_estimado DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'pendente',
    pdf_url VARCHAR(500),
    enviado_email BOOLEAN DEFAULT FALSE,
    enviado_whatsapp BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valido_ate TIMESTAMP,
    observacoes TEXT
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_orcamentos_lead_id ON orcamentos(lead_id);
CREATE INDEX IF NOT EXISTS idx_orcamentos_numero ON orcamentos(numero_orcamento);
CREATE INDEX IF NOT EXISTS idx_orcamentos_status ON orcamentos(status);
CREATE INDEX IF NOT EXISTS idx_orcamentos_criado_em ON orcamentos(criado_em DESC);

-- =====================================================
-- Tabela: interacoes
-- Rastreamento de todas as interações
-- =====================================================
CREATE TABLE IF NOT EXISTS interacoes (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id),
    tipo VARCHAR(50) NOT NULL, -- 'mensagem', 'orcamento', 'email', etc.
    descricao TEXT,
    resultado VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_interacoes_lead_id ON interacoes(lead_id);
CREATE INDEX IF NOT EXISTS idx_interacoes_tipo ON interacoes(tipo);
CREATE INDEX IF NOT EXISTS idx_interacoes_timestamp ON interacoes(timestamp DESC);

-- =====================================================
-- Tabela: configuracoes
-- Configurações do sistema de automação
-- =====================================================
CREATE TABLE IF NOT EXISTS configuracoes (
    id SERIAL PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    tipo VARCHAR(20) DEFAULT 'string',
    descricao TEXT,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir configurações padrão
INSERT INTO configuracoes (chave, valor, tipo, descricao) VALUES
    ('horario_inicio', '09:00', 'time', 'Horário de início do atendimento'),
    ('horario_fim', '18:00', 'time', 'Horário de fim do atendimento'),
    ('dias_uteis', '1,2,3,4,5', 'string', 'Dias da semana de atendimento (1=Segunda)'),
    ('mensagem_fora_horario', 'Olá! No momento estamos fora do horário de atendimento. Retornaremos em breve!', 'text', 'Mensagem automática fora do horário'),
    ('tempo_resposta_auto', '2', 'integer', 'Tempo em segundos para resposta automática'),
    ('max_tentativas_orcamento', '3', 'integer', 'Máximo de tentativas para coletar dados do orçamento'),
    ('validade_orcamento_dias', '15', 'integer', 'Validade do orçamento em dias')
ON CONFLICT (chave) DO NOTHING;

-- =====================================================
-- Tabela: faq
-- Perguntas frequentes para respostas automáticas
-- =====================================================
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    palavras_chave TEXT[] NOT NULL,
    resposta TEXT NOT NULL,
    categoria VARCHAR(50),
    ativo BOOLEAN DEFAULT TRUE,
    prioridade INTEGER DEFAULT 0,
    contador_uso INTEGER DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir FAQs padrão
INSERT INTO faq (palavras_chave, resposta, categoria, prioridade) VALUES
    (ARRAY['preço', 'preco', 'valor', 'quanto custa'], 
     '💰 Nossos preços variam de acordo com o tipo de tecido e tamanho. Para um orçamento personalizado, digite: "Quero um orçamento"', 
     'comercial', 10),
    
    (ARRAY['prazo', 'entrega', 'demora', 'quanto tempo'], 
     '🚚 O prazo médio é de 7 a 10 dias úteis após aprovação do orçamento. A instalação é GRÁTIS!', 
     'logistica', 9),
    
    (ARRAY['instalação', 'instalacao', 'instalar'], 
     '🔧 A instalação é TOTALMENTE GRÁTIS e incluída em todos os orçamentos! Trabalhamos com trilho, varão e trilho motorizado.', 
     'servicos', 8),
    
    (ARRAY['horário', 'horario', 'funciona', 'aberto'], 
     '🕐 Atendemos de Segunda a Sexta: 9h às 18h | Sábado: 9h às 13h. Pelo WhatsApp: Segunda a Sexta, 9h às 18h.', 
     'informacoes', 7),
    
    (ARRAY['endereço', 'endereco', 'localização', 'localizacao', 'onde fica'], 
     '📍 Rua Bresser, 1084 - Brás, São Paulo - SP. Próximo ao Metrô Bresser (Linha 3 - Vermelha).', 
     'informacoes', 6),
    
    (ARRAY['tecido', 'tipo', 'modelo', 'material'], 
     '🎨 Trabalhamos com: Blackout (bloqueia 100% luz), Voil (translúcido), Linho (elegante), Veludo (luxuoso). Qual te interessa?', 
     'produtos', 5)
ON CONFLICT DO NOTHING;

-- =====================================================
-- Tabela: metricas
-- Métricas e analytics do sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS metricas (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    total_mensagens INTEGER DEFAULT 0,
    total_leads INTEGER DEFAULT 0,
    total_orcamentos INTEGER DEFAULT 0,
    taxa_conversao DECIMAL(5, 2),
    tempo_medio_resposta INTEGER, -- em segundos
    satisfacao_media DECIMAL(3, 2),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice
CREATE UNIQUE INDEX IF NOT EXISTS idx_metricas_data ON metricas(data);

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View: Leads Ativos (últimos 30 dias)
CREATE OR REPLACE VIEW leads_ativos AS
SELECT 
    l.*,
    COUNT(m.id) as total_mensagens,
    MAX(m.timestamp) as ultima_mensagem
FROM leads l
LEFT JOIN mensagens m ON l.id = m.lead_id
WHERE l.timestamp >= NOW() - INTERVAL '30 days'
GROUP BY l.id
ORDER BY l.timestamp DESC;

-- View: Dashboard de Hoje
CREATE OR REPLACE VIEW dashboard_hoje AS
SELECT 
    COUNT(DISTINCT l.id) as leads_hoje,
    COUNT(DISTINCT CASE WHEN l.intencao = 'orcamento' THEN l.id END) as orcamentos_solicitados,
    COUNT(DISTINCT o.id) as orcamentos_gerados,
    COUNT(m.id) as mensagens_recebidas,
    AVG(EXTRACT(EPOCH FROM (m.timestamp - l.timestamp))) as tempo_medio_resposta
FROM leads l
LEFT JOIN mensagens m ON l.id = m.lead_id AND m.tipo = 'recebida'
LEFT JOIN orcamentos o ON l.id = o.lead_id
WHERE DATE(l.timestamp) = CURRENT_DATE;

-- View: Top FAQs
CREATE OR REPLACE VIEW top_faqs AS
SELECT 
    categoria,
    palavras_chave,
    resposta,
    contador_uso,
    ROUND((contador_uso::DECIMAL / NULLIF((SELECT SUM(contador_uso) FROM faq), 0) * 100), 2) as percentual
FROM faq
WHERE ativo = TRUE
ORDER BY contador_uso DESC
LIMIT 10;

-- =====================================================
-- FUNÇÕES ÚTEIS
-- =====================================================

-- Função: Atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamp
CREATE TRIGGER trigger_atualizar_leads
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

CREATE TRIGGER trigger_atualizar_orcamentos
    BEFORE UPDATE ON orcamentos
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

-- Função: Gerar número de orçamento
CREATE OR REPLACE FUNCTION gerar_numero_orcamento()
RETURNS TEXT AS $$
DECLARE
    novo_numero TEXT;
BEGIN
    novo_numero := 'ORC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('orcamentos_id_seq')::TEXT, 4, '0');
    RETURN novo_numero;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- PERMISSÕES
-- =====================================================

-- Garantir que o usuário n8n tenha acesso
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO n8n;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO n8n;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO n8n;

-- =====================================================
-- DADOS DE TESTE (Opcional - comentar em produção)
-- =====================================================

-- Inserir lead de teste
-- INSERT INTO leads (telefone, nome, mensagem, intencao) VALUES
--     ('5511999999999', 'Cliente Teste', 'Quero um orçamento', 'orcamento');

-- =====================================================
-- BACKUP E MANUTENÇÃO
-- =====================================================

-- Criar função para limpar dados antigos (executar mensalmente)
CREATE OR REPLACE FUNCTION limpar_dados_antigos()
RETURNS void AS $$
BEGIN
    -- Deletar mensagens com mais de 6 meses
    DELETE FROM mensagens WHERE timestamp < NOW() - INTERVAL '6 months';
    
    -- Deletar leads não convertidos com mais de 3 meses
    DELETE FROM leads 
    WHERE status = 'novo' 
    AND timestamp < NOW() - INTERVAL '3 months'
    AND id NOT IN (SELECT lead_id FROM orcamentos);
    
    -- Arquivar orçamentos antigos (marcar como expirado)
    UPDATE orcamentos 
    SET status = 'expirado' 
    WHERE status = 'pendente' 
    AND criado_em < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================

-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Exibir estatísticas
SELECT 
    'Tabelas criadas' as tipo,
    COUNT(*) as quantidade
FROM information_schema.tables 
WHERE table_schema = 'public'
UNION ALL
SELECT 
    'Views criadas',
    COUNT(*)
FROM information_schema.views 
WHERE table_schema = 'public'
UNION ALL
SELECT 
    'Funções criadas',
    COUNT(*)
FROM information_schema.routines 
WHERE routine_schema = 'public';

COMMIT;
