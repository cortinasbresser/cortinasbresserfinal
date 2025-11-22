<?php
// dashboard.php - Dashboard principal
require_once 'config.php';
verificarAuth();

// Função para ler logs
function lerLogs() {
    $leads = [];
    $logsDir = LOGS_DIR;
    
    if (!is_dir($logsDir)) {
        return $leads;
    }
    
    // Ler todos os arquivos de log
    $files = glob($logsDir . '/orcamentos_*.txt');
    rsort($files); // Mais recentes primeiro
    
    foreach ($files as $file) {
        $content = file_get_contents($file);
        $entries = explode("\n================================================================================\n", $content);
        
        foreach ($entries as $entry) {
            if (trim($entry)) {
                $lead = parsearLead($entry);
                if ($lead) {
                    $leads[] = $lead;
                }
            }
        }
    }
    
    return $leads;
}

function parsearLead($texto) {
    $lead = [];
    $linhas = explode("\n", $texto);
    
    foreach ($linhas as $linha) {
        if (preg_match('/^Data\/Hora:\s*(.+)$/', $linha, $matches)) {
            $lead['data_hora'] = trim($matches[1]);
        } elseif (preg_match('/^Nome:\s*(.+)$/', $linha, $matches)) {
            $lead['nome'] = trim($matches[1]);
        } elseif (preg_match('/^Telefone:\s*(.+)$/', $linha, $matches)) {
            $lead['telefone'] = trim($matches[1]);
        } elseif (preg_match('/^Largura da Parede:\s*(.+)$/', $linha, $matches)) {
            $lead['largura'] = trim($matches[1]);
        } elseif (preg_match('/^Altura da Parede:\s*(.+)$/', $linha, $matches)) {
            $lead['altura'] = trim($matches[1]);
        } elseif (preg_match('/^Tipo de Tecido:\s*(.+)$/', $linha, $matches)) {
            $lead['tecido'] = trim($matches[1]);
        } elseif (preg_match('/^Tipo de Instalação:\s*(.+)$/', $linha, $matches)) {
            $lead['instalacao'] = trim($matches[1]);
        } elseif (preg_match('/^Observações:\s*(.+)$/s', $linha, $matches)) {
            $lead['observacoes'] = trim($matches[1]);
        } elseif (preg_match('/^Endereço:\s*(.+)$/s', $linha, $matches)) {
            $lead['endereco'] = trim($matches[1]);
        }
    }
    
    return !empty($lead) ? $lead : null;
}

$leads = lerLogs();
$totalLeads = count($leads);
$leadsHoje = 0;
$leadsSemana = 0;
$leadsMes = 0;

$hoje = date('Y-m-d');
$inicioSemana = date('Y-m-d', strtotime('monday this week'));
$inicioMes = date('Y-m-01');

foreach ($leads as $lead) {
    if (isset($lead['data_hora'])) {
        $dataLead = date('Y-m-d', strtotime($lead['data_hora']));
        if ($dataLead == $hoje) $leadsHoje++;
        if ($dataLead >= $inicioSemana) $leadsSemana++;
        if ($dataLead >= $inicioMes) $leadsMes++;
    }
}

// Logout
if (isset($_GET['logout'])) {
    logout();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin - Cortinas Bresser</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        :root {
            --gold-primary: #d4af37;
            --gold-secondary: #b8941f;
        }
        body {
            background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
            color: #fff;
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
        }
        .navbar {
            background: rgba(26, 26, 26, 0.95) !important;
            border-bottom: 2px solid rgba(212, 175, 55, 0.3);
            backdrop-filter: blur(10px);
        }
        .navbar-brand img {
            max-width: 120px;
            filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3));
        }
        .stat-card {
            background: rgba(26, 26, 26, 0.8);
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .stat-card:hover {
            border-color: var(--gold-primary);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
        }
        .stat-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--gold-primary), var(--gold-secondary));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            color: #000;
        }
        .stat-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--gold-primary);
        }
        .stat-label {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .table-container {
            background: rgba(26, 26, 26, 0.8);
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            padding: 1.5rem;
            backdrop-filter: blur(10px);
        }
        .table {
            color: #fff;
            margin-bottom: 0;
        }
        .table thead {
            background: rgba(212, 175, 55, 0.1);
            border-bottom: 2px solid var(--gold-primary);
        }
        .table thead th {
            color: var(--gold-primary);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 1px;
            padding: 1rem;
            border: none;
        }
        .table tbody tr {
            border-bottom: 1px solid rgba(212, 175, 55, 0.1);
            transition: all 0.3s ease;
        }
        .table tbody tr:hover {
            background: rgba(212, 175, 55, 0.05);
        }
        .table tbody td {
            padding: 1rem;
            vertical-align: middle;
            border: none;
        }
        .badge-gold {
            background: linear-gradient(135deg, var(--gold-primary), var(--gold-secondary));
            color: #000;
            font-weight: 600;
            padding: 0.5em 1em;
        }
        .btn-gold {
            background: linear-gradient(135deg, var(--gold-primary), var(--gold-secondary));
            border: none;
            color: #000;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-gold:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
            color: #000;
        }
        .btn-outline-gold {
            border: 2px solid var(--gold-primary);
            color: var(--gold-primary);
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-outline-gold:hover {
            background: var(--gold-primary);
            color: #000;
        }
        .text-gold {
            color: var(--gold-primary) !important;
        }
        .modal-content {
            background: rgba(26, 26, 26, 0.98);
            border: 2px solid rgba(212, 175, 55, 0.3);
            color: #fff;
        }
        .modal-header {
            border-bottom: 2px solid rgba(212, 175, 55, 0.3);
        }
        .modal-footer {
            border-top: 2px solid rgba(212, 175, 55, 0.3);
        }
        .lead-detail-label {
            color: var(--gold-primary);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .lead-detail-value {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 1rem;
            padding: 0.75rem;
            background: rgba(42, 42, 42, 0.5);
            border-radius: 8px;
            border-left: 3px solid var(--gold-primary);
        }
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: rgba(255, 255, 255, 0.5);
        }
        .empty-state i {
            font-size: 5rem;
            margin-bottom: 1rem;
            opacity: 0.3;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
        <div class="container-fluid px-4">
            <a class="navbar-brand" href="dashboard.php">
                <img src="../assets/cortinasbresser.svg" alt="Cortinas Bresser">
            </a>
            <span class="navbar-text text-white-50 me-3 d-none d-md-block">
                <i class="bi bi-person-circle me-2"></i><?php echo $_SESSION['admin_user']; ?>
            </span>
            <a href="?logout=1" class="btn btn-outline-gold btn-sm">
                <i class="bi bi-box-arrow-right me-2"></i>Sair
            </a>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container-fluid px-4 py-4">
        <!-- Header -->
        <div class="row mb-4">
            <div class="col-12">
                <h2 class="text-gold mb-2">
                    <i class="bi bi-speedometer2 me-2"></i>Dashboard de Leads
                </h2>
                <p class="text-white-50">Gestão e acompanhamento de solicitações de orçamento</p>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="row g-4 mb-4">
            <div class="col-lg-3 col-md-6">
                <div class="stat-card">
                    <div class="d-flex align-items-center mb-3">
                        <div class="stat-icon me-3">
                            <i class="bi bi-people-fill"></i>
                        </div>
                        <div>
                            <div class="stat-value"><?php echo $totalLeads; ?></div>
                            <div class="stat-label">Total de Leads</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="stat-card">
                    <div class="d-flex align-items-center mb-3">
                        <div class="stat-icon me-3">
                            <i class="bi bi-calendar-day"></i>
                        </div>
                        <div>
                            <div class="stat-value"><?php echo $leadsHoje; ?></div>
                            <div class="stat-label">Hoje</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="stat-card">
                    <div class="d-flex align-items-center mb-3">
                        <div class="stat-icon me-3">
                            <i class="bi bi-calendar-week"></i>
                        </div>
                        <div>
                            <div class="stat-value"><?php echo $leadsSemana; ?></div>
                            <div class="stat-label">Esta Semana</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="stat-card">
                    <div class="d-flex align-items-center mb-3">
                        <div class="stat-icon me-3">
                            <i class="bi bi-calendar-month"></i>
                        </div>
                        <div>
                            <div class="stat-value"><?php echo $leadsMes; ?></div>
                            <div class="stat-label">Este Mês</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Leads Table -->
        <div class="table-container">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-gold mb-0">
                    <i class="bi bi-list-ul me-2"></i>Últimos Leads
                </h4>
                <button class="btn btn-gold btn-sm" onclick="location.reload()">
                    <i class="bi bi-arrow-clockwise me-2"></i>Atualizar
                </button>
            </div>

            <?php if (empty($leads)): ?>
                <div class="empty-state">
                    <i class="bi bi-inbox"></i>
                    <h5 class="text-white-50">Nenhum lead encontrado</h5>
                    <p>Os leads aparecerão aqui assim que forem recebidos.</p>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Data/Hora</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Tecido</th>
                                <th>Instalação</th>
                                <th class="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach (array_slice($leads, 0, 50) as $index => $lead): ?>
                                <tr>
                                    <td>
                                        <i class="bi bi-clock me-2 text-gold"></i>
                                        <?php echo isset($lead['data_hora']) ? date('d/m/Y H:i', strtotime($lead['data_hora'])) : 'N/A'; ?>
                                    </td>
                                    <td>
                                        <i class="bi bi-person me-2 text-gold"></i>
                                        <strong><?php echo htmlspecialchars($lead['nome'] ?? 'N/A'); ?></strong>
                                    </td>
                                    <td>
                                        <i class="bi bi-telephone me-2 text-gold"></i>
                                        <?php echo htmlspecialchars($lead['telefone'] ?? 'N/A'); ?>
                                    </td>
                                    <td>
                                        <span class="badge-gold badge"><?php echo htmlspecialchars($lead['tecido'] ?? 'N/A'); ?></span>
                                    </td>
                                    <td><?php echo htmlspecialchars($lead['instalacao'] ?? 'N/A'); ?></td>
                                    <td class="text-center">
                                        <button class="btn btn-outline-gold btn-sm" onclick='verDetalhes(<?php echo json_encode($lead); ?>)'>
                                            <i class="bi bi-eye"></i> Ver
                                        </button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                <?php if ($totalLeads > 50): ?>
                    <div class="alert alert-info mt-3">
                        Mostrando 50 de <?php echo $totalLeads; ?> leads. Total disponível nos arquivos de log.
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>

    <!-- Modal Detalhes -->
    <div class="modal fade" id="modalDetalhes" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-gold">
                        <i class="bi bi-info-circle me-2"></i>Detalhes do Lead
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Conteúdo dinâmico -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-gold" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function verDetalhes(lead) {
            const modal = new bootstrap.Modal(document.getElementById('modalDetalhes'));
            const modalBody = document.getElementById('modalBody');
            
            let html = '<div class="row g-3">';
            
            // Informações do Cliente
            html += '<div class="col-12"><h6 class="text-gold border-bottom pb-2"><i class="bi bi-person-badge me-2"></i>Informações do Cliente</h6></div>';
            html += '<div class="col-md-6"><div class="lead-detail-label"><i class="bi bi-person me-2"></i>Nome</div><div class="lead-detail-value">' + (lead.nome || 'N/A') + '</div></div>';
            html += '<div class="col-md-6"><div class="lead-detail-label"><i class="bi bi-telephone me-2"></i>Telefone</div><div class="lead-detail-value">' + (lead.telefone || 'N/A') + '</div></div>';
            html += '<div class="col-12"><div class="lead-detail-label"><i class="bi bi-clock me-2"></i>Data/Hora</div><div class="lead-detail-value">' + (lead.data_hora || 'N/A') + '</div></div>';
            
            // Especificações
            html += '<div class="col-12 mt-3"><h6 class="text-gold border-bottom pb-2"><i class="bi bi-rulers me-2"></i>Especificações</h6></div>';
            html += '<div class="col-md-6"><div class="lead-detail-label">Largura da Parede</div><div class="lead-detail-value">' + (lead.largura || 'N/A') + '</div></div>';
            html += '<div class="col-md-6"><div class="lead-detail-label">Altura da Parede</div><div class="lead-detail-value">' + (lead.altura || 'N/A') + '</div></div>';
            html += '<div class="col-md-6"><div class="lead-detail-label">Tipo de Tecido</div><div class="lead-detail-value"><span class="badge-gold badge">' + (lead.tecido || 'N/A') + '</span></div></div>';
            html += '<div class="col-md-6"><div class="lead-detail-label">Tipo de Instalação</div><div class="lead-detail-value">' + (lead.instalacao || 'N/A') + '</div></div>';
            
            // Observações e Endereço
            if (lead.observacoes || lead.endereco) {
                html += '<div class="col-12 mt-3"><h6 class="text-gold border-bottom pb-2"><i class="bi bi-chat-left-text me-2"></i>Informações Adicionais</h6></div>';
                if (lead.observacoes) {
                    html += '<div class="col-12"><div class="lead-detail-label">Observações</div><div class="lead-detail-value">' + (lead.observacoes || 'Nenhuma') + '</div></div>';
                }
                if (lead.endereco) {
                    html += '<div class="col-12"><div class="lead-detail-label">Endereço para Instalação</div><div class="lead-detail-value">' + (lead.endereco || 'Não informado') + '</div></div>';
                }
            }
            
            html += '</div>';
            
            modalBody.innerHTML = html;
            modal.show();
        }
    </script>
</body>
</html>
