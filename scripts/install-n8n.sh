#!/bin/bash

# =====================================================
# Script de Instalação Automática
# N8N + WhatsApp - Cortinas Bresser
# =====================================================

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Banner
echo -e "${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🤖 N8N + WhatsApp - Cortinas Bresser               ║
║   Instalação Automatizada                            ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Verificar se está rodando como root
if [ "$EUID" -eq 0 ]; then 
    print_warning "Não execute este script como root!"
    exit 1
fi

# =====================================================
# 1. Verificar Pré-requisitos
# =====================================================

print_info "Verificando pré-requisitos..."

# Verificar Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado!"
    echo "Instale o Docker: https://docs.docker.com/get-docker/"
    exit 1
fi
print_success "Docker instalado"

# Verificar Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não está instalado!"
    echo "Instale o Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi
print_success "Docker Compose instalado"

# Verificar se Docker está rodando
if ! docker info &> /dev/null; then
    print_error "Docker não está rodando!"
    echo "Inicie o Docker e tente novamente"
    exit 1
fi
print_success "Docker está rodando"

# =====================================================
# 2. Configurar Variáveis de Ambiente
# =====================================================

print_info "Configurando variáveis de ambiente..."

if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        print_success "Arquivo .env criado a partir do .env.example"
        
        # Gerar chave de criptografia
        print_info "Gerando chave de criptografia do N8N..."
        ENCRYPTION_KEY=$(openssl rand -base64 32 | tr -d '\n')
        
        # Atualizar .env com a chave gerada
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/gere_uma_chave_aleatoria_de_32_caracteres/$ENCRYPTION_KEY/" .env
        else
            # Linux
            sed -i "s/gere_uma_chave_aleatoria_de_32_caracteres/$ENCRYPTION_KEY/" .env
        fi
        
        print_success "Chave de criptografia gerada"
        
        print_warning "IMPORTANTE: Edite o arquivo .env e configure suas credenciais!"
        print_warning "Pressione ENTER quando terminar de editar o .env"
        read -r
    else
        print_error "Arquivo .env.example não encontrado!"
        exit 1
    fi
else
    print_success "Arquivo .env já existe"
fi

# =====================================================
# 3. Criar Diretórios Necessários
# =====================================================

print_info "Criando diretórios necessários..."

mkdir -p logs
mkdir -p quotes
mkdir -p n8n-backups
mkdir -p database

print_success "Diretórios criados"

# =====================================================
# 4. Verificar Portas Disponíveis
# =====================================================

print_info "Verificando portas disponíveis..."

check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        print_error "Porta $1 já está em uso!"
        echo "Libere a porta ou altere no docker-compose.yml"
        exit 1
    fi
}

check_port 3000  # Next.js
check_port 5678  # N8N
check_port 8080  # Evolution API

print_success "Todas as portas estão disponíveis"

# =====================================================
# 5. Baixar Imagens Docker
# =====================================================

print_info "Baixando imagens Docker (isso pode demorar)..."

docker-compose pull

print_success "Imagens baixadas"

# =====================================================
# 6. Iniciar Serviços
# =====================================================

print_info "Iniciando serviços..."

docker-compose up -d

print_success "Serviços iniciados"

# =====================================================
# 7. Aguardar Serviços Ficarem Prontos
# =====================================================

print_info "Aguardando serviços ficarem prontos..."

# Função para verificar se serviço está pronto
wait_for_service() {
    local service=$1
    local url=$2
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200\|401\|302"; then
            print_success "$service está pronto"
            return 0
        fi
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service não ficou pronto a tempo"
    return 1
}

# Aguardar PostgreSQL
print_info "Aguardando PostgreSQL..."
sleep 10
print_success "PostgreSQL iniciado"

# Aguardar N8N
print_info "Aguardando N8N..."
wait_for_service "N8N" "http://localhost:5678"

# Aguardar Evolution API
print_info "Aguardando Evolution API..."
wait_for_service "Evolution API" "http://localhost:8080"

# =====================================================
# 8. Criar Banco de Dados
# =====================================================

print_info "Criando estrutura do banco de dados..."

if [ -f database/setup-n8n.sql ]; then
    # Aguardar um pouco mais para garantir que o banco está pronto
    sleep 5
    
    # Executar script SQL
    docker exec -i cortinasbresser-postgres psql -U n8n -d postgres -c "CREATE DATABASE evolution;" 2>/dev/null || true
    docker exec -i cortinasbresser-postgres psql -U n8n -d evolution < database/setup-n8n.sql
    
    print_success "Banco de dados criado"
else
    print_warning "Script SQL não encontrado. Pule esta etapa se não for necessário."
fi

# =====================================================
# 9. Exibir Informações de Acesso
# =====================================================

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                       ║${NC}"
echo -e "${GREEN}║   ✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO!               ║${NC}"
echo -e "${GREEN}║                                                       ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

print_info "Acesse os serviços:"
echo ""
echo -e "  🌐 ${BLUE}N8N:${NC}"
echo -e "     http://localhost:5678"
echo -e "     Usuário: admin (conforme .env)"
echo -e "     Senha: (conforme .env)"
echo ""
echo -e "  📱 ${BLUE}Evolution API:${NC}"
echo -e "     http://localhost:8080"
echo ""
echo -e "  🖥️  ${BLUE}Next.js:${NC}"
echo -e "     http://localhost:3000"
echo ""

print_info "Próximos passos:"
echo ""
echo "  1. Acesse o N8N e faça login"
echo "  2. Importe o workflow: n8n-workflows/atendimento-whatsapp.json"
echo "  3. Configure as credenciais (SMTP, PostgreSQL)"
echo "  4. Acesse a Evolution API e conecte o WhatsApp (QR Code)"
echo "  5. Configure o webhook na Evolution API"
echo "  6. Ative o workflow no N8N"
echo "  7. Teste enviando uma mensagem para o WhatsApp"
echo ""

print_info "Comandos úteis:"
echo ""
echo "  Ver logs:        docker-compose logs -f"
echo "  Parar serviços:  docker-compose down"
echo "  Reiniciar:       docker-compose restart"
echo "  Status:          docker-compose ps"
echo ""

print_info "Documentação:"
echo ""
echo "  📖 Guia Completo:  cat N8N-WHATSAPP-SETUP.md"
echo "  ⚡ Guia Rápido:    cat N8N-QUICKSTART.md"
echo "  📋 README:         cat N8N-README.md"
echo ""

print_success "Boa sorte! 🚀"
echo ""

# =====================================================
# 10. Verificar Status Final
# =====================================================

print_info "Status dos containers:"
docker-compose ps

# Verificar se há erros nos logs
print_info "Verificando logs por erros..."
if docker-compose logs --tail=50 | grep -i "error\|fatal\|exception" > /dev/null; then
    print_warning "Foram encontrados alguns erros nos logs. Verifique com: docker-compose logs"
else
    print_success "Nenhum erro crítico encontrado nos logs"
fi

echo ""
print_info "Instalação finalizada em $(date)"
