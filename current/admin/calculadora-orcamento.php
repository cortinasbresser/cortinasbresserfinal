<?php
session_start();

// Verificar se está logado
if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    header('Location: login.php');
    exit;
}

// Configurações de preços (podem ser editadas)
$config = [
    'tecidos' => [
        'Voil' => ['preco_m2' => 45.00, 'margem' => 1.5],
        'Linho' => ['preco_m2' => 65.00, 'margem' => 1.5],
        'Blackout' => ['preco_m2' => 85.00, 'margem' => 1.5],
        'Blackout Premium' => ['preco_m2' => 120.00, 'margem' => 1.5],
        'Veludo' => ['preco_m2' => 95.00, 'margem' => 1.5],
        'Seda' => ['preco_m2' => 150.00, 'margem' => 1.5]
    ],
    'instalacao' => [
        'Cliente Instala' => ['preco_metro' => 0.00, 'instalacao' => 0.00],
        'Trilho' => ['preco_metro' => 45.00, 'instalacao' => 150.00],
        'Varão' => ['preco_metro' => 55.00, 'instalacao' => 180.00],
        'Suporte Invisível' => ['preco_metro' => 65.00, 'instalacao' => 200.00],
        'Motorizado' => ['preco_metro' => 250.00, 'instalacao' => 500.00]
    ],
    'mao_obra' => [
        'basica' => 80.00,
        'complexa' => 150.00,
        'premium' => 250.00
    ]
];

// Calcular orçamento
$resultado = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['calcular'])) {
    $largura = floatval($_POST['largura']);
    $altura = floatval($_POST['altura']);
    $tecido = $_POST['tecido'] ?? '';
    $instalacao_tipo = $_POST['instalacao'] ?? '';
    $complexidade = $_POST['complexidade'] ?? 'basica';
    $desconto = floatval($_POST['desconto'] ?? 0);
    
    if ($largura > 0 && $altura > 0 && isset($config['tecidos'][$tecido]) && isset($config['instalacao'][$instalacao_tipo])) {
        $area_m2 = $largura * $altura;
        
        // Calcular tecido (considerando margem)
        $margem = $config['tecidos'][$tecido]['margem'];
        $area_com_margem = $area_m2 * $margem;
        $preco_tecido = $area_com_margem * $config['tecidos'][$tecido]['preco_m2'];
        
        // Calcular instalação
        $preco_instalacao_metro = $config['instalacao'][$instalacao_tipo]['preco_metro'] * $largura;
        $preco_instalacao_servico = $config['instalacao'][$instalacao_tipo]['instalacao'];
        $preco_instalacao_total = $preco_instalacao_metro + $preco_instalacao_servico;
        
        // Mão de obra (só cobra se houver instalação)
        $preco_mao_obra = 0;
        if ($instalacao_tipo !== 'Cliente Instala') {
            $preco_mao_obra = $config['mao_obra'][$complexidade];
        }
        
        // Total antes do desconto
        $subtotal = $preco_tecido + $preco_instalacao_total + $preco_mao_obra;
        
        // Aplicar desconto
        $valor_desconto = $subtotal * ($desconto / 100);
        $total = $subtotal - $valor_desconto;
        
        $resultado = [
            'largura' => $largura,
            'altura' => $altura,
            'area_m2' => $area_m2,
            'area_com_margem' => $area_com_margem,
            'tecido' => $tecido,
            'preco_m2_tecido' => $config['tecidos'][$tecido]['preco_m2'],
            'preco_tecido' => $preco_tecido,
            'instalacao' => $instalacao_tipo,
            'preco_instalacao_metro' => $preco_instalacao_metro,
            'preco_instalacao_servico' => $preco_instalacao_servico,
            'preco_instalacao_total' => $preco_instalacao_total,
            'complexidade' => $complexidade,
            'preco_mao_obra' => $preco_mao_obra,
            'subtotal' => $subtotal,
            'desconto_percent' => $desconto,
            'valor_desconto' => $valor_desconto,
            'total' => $total
        ];
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Orçamento - Cortinas Bresser</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        :root {
            --gold-dark: #8b7355;
            --gold-medium: #c9a961;
            --gold-light: #e0c285;
            --cream: #f5f0e8;
            --dark: #0a0a0a;
            --dark-bg: #1a1a1a;
        }
        
        body {
            background: var(--cream);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            padding-top: 100px;
        }
        
        .navbar {
            background: var(--dark) !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 15px 0;
        }
        
        .navbar-brand {
            color: var(--gold-medium) !important;
            font-weight: 600;
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo-dashboard {
            height: 60px;
            width: auto;
            filter: drop-shadow(0 2px 8px rgba(201, 169, 97, 0.4));
        }
        
        .container-calc {
            max-width: 1400px;
            margin: 40px auto;
        }
        
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(139, 115, 85, 0.15);
            overflow: hidden;
            background: white;
            border: 1px solid rgba(201, 169, 97, 0.2);
        }
        
        .card-header {
            background: linear-gradient(135deg, var(--dark), var(--dark-bg));
            color: var(--gold-light);
            font-weight: 600;
            font-size: 1.3rem;
            padding: 20px 25px;
            border-bottom: 3px solid var(--gold-medium);
        }
        
        .form-label {
            color: var(--gold-dark);
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .form-control, .form-select {
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 12px;
            transition: all 0.3s;
        }
        
        .form-control:focus, .form-select:focus {
            border-color: var(--gold-medium);
            box-shadow: 0 0 0 0.2rem rgba(201, 169, 97, 0.25);
        }
        
        .btn-calcular {
            background: linear-gradient(135deg, var(--gold-medium), var(--gold-light));
            border: none;
            color: var(--dark);
            font-weight: 700;
            padding: 18px 40px;
            font-size: 1.15rem;
            border-radius: 12px;
            transition: all 0.3s ease;
            width: 100%;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(201, 169, 97, 0.3);
        }
        
        .btn-calcular:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(201, 169, 97, 0.5);
            color: var(--dark);
            background: linear-gradient(135deg, var(--gold-light), var(--gold-medium));
        }
        
        .resultado-box {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-top: 30px;
            border: 3px solid var(--gold-medium);
            position: relative;
        }
        
        .resultado-box::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 5px;
            background: linear-gradient(to bottom, var(--gold-medium), var(--gold-light));
        }
        
        .resultado-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .resultado-item:last-child {
            border-bottom: none;
        }
        
        .resultado-label {
            color: #666;
            font-weight: 500;
        }
        
        .resultado-valor {
            color: var(--dark);
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .total-final {
            background: linear-gradient(135deg, var(--dark), var(--dark-bg));
            margin: 20px -30px -30px -30px;
            padding: 30px 35px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 4px solid var(--gold-medium);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        
        .total-final .label {
            color: var(--gold-light);
            font-weight: 700;
            font-size: 1.6rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .total-final .valor {
            color: var(--gold-medium);
            font-weight: 700;
            font-size: 2.3rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .info-badge {
            background: var(--cream);
            color: var(--gold-dark);
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: inline-block;
            margin-top: 5px;
        }
        
        .config-section {
            background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            border: 1px solid rgba(201, 169, 97, 0.15);
            transition: all 0.3s ease;
        }
        
        .config-section:hover {
            border-color: rgba(201, 169, 97, 0.3);
            box-shadow: 0 2px 10px rgba(201, 169, 97, 0.1);
        }
        
        .config-title {
            color: var(--gold-dark);
            font-weight: 700;
            font-size: 1.15rem;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            gap: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .config-title i {
            font-size: 1.4rem;
            color: var(--gold-medium);
        }
        
        .btn-voltar {
            background: rgba(201, 169, 97, 0.15);
            color: var(--gold-light);
            border: 2px solid var(--gold-medium);
            padding: 10px 25px;
            border-radius: 10px;
            text-decoration: none;
            transition: all 0.3s ease;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-voltar:hover {
            background: var(--gold-medium);
            color: var(--dark);
            border-color: var(--gold-light);
            transform: translateX(-3px);
        }
        
        .desconto-input {
            position: relative;
        }
        
        .desconto-input .input-group-text {
            background: var(--gold-light);
            color: var(--dark);
            font-weight: 600;
            border: 2px solid #ddd;
            border-left: none;
        }
        
        @media print {
            .no-print {
                display: none !important;
            }
            
            .resultado-box {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark no-print">
        <div class="container-fluid px-4">
            <a class="navbar-brand" href="index.php">
                <img src="../assets/cortinasbresser.svg" alt="Cortinas Bresser" class="logo-dashboard">
                <span>Calculadora de Orçamento</span>
            </a>
            <a href="index.php" class="btn-voltar">
                <i class="bi bi-arrow-left"></i> Voltar ao Painel
            </a>
        </div>
    </nav>

    <div class="container-calc">
        <div class="row">
            <!-- Formulário -->
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-calculator-fill"></i> Dados do Orçamento
                    </div>
                    <div class="card-body">
                        <form method="POST">
                            <!-- Medidas -->
                            <div class="config-section">
                                <div class="config-title">
                                    <i class="bi bi-rulers"></i> Medidas da Parede
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Largura (metros)</label>
                                        <input type="number" step="0.01" name="largura" class="form-control" 
                                               value="<?= $_POST['largura'] ?? '' ?>" required>
                                        <small class="text-muted">Ex: 3.50</small>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Altura (metros)</label>
                                        <input type="number" step="0.01" name="altura" class="form-control" 
                                               value="<?= $_POST['altura'] ?? '' ?>" required>
                                        <small class="text-muted">Ex: 2.80</small>
                                    </div>
                                </div>
                            </div>

                            <!-- Tecido -->
                            <div class="config-section">
                                <div class="config-title">
                                    <i class="bi bi-grid-3x3-gap"></i> Tipo de Tecido
                                </div>
                                <select name="tecido" class="form-select mb-3" required>
                                    <option value="">Selecione o tecido...</option>
                                    <?php foreach ($config['tecidos'] as $nome => $dados): ?>
                                        <option value="<?= $nome ?>" <?= ($_POST['tecido'] ?? '') === $nome ? 'selected' : '' ?>>
                                            <?= $nome ?> - R$ <?= number_format($dados['preco_m2'], 2, ',', '.') ?>/m²
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>

                            <!-- Instalação -->
                            <div class="config-section">
                                <div class="config-title">
                                    <i class="bi bi-gear"></i> Tipo de Instalação
                                </div>
                                <select name="instalacao" class="form-select mb-3" required>
                                    <option value="">Selecione a instalação...</option>
                                    <?php foreach ($config['instalacao'] as $nome => $dados): ?>
                                        <option value="<?= $nome ?>" <?= ($_POST['instalacao'] ?? '') === $nome ? 'selected' : '' ?>>
                                            <?= $nome ?> - R$ <?= number_format($dados['preco_metro'], 2, ',', '.') ?>/m + R$ <?= number_format($dados['instalacao'], 2, ',', '.') ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>

                            <!-- Complexidade (só aparece se tiver instalação) -->
                            <div class="config-section" id="complexidade-section" style="display: none;">
                                <div class="config-title">
                                    <i class="bi bi-tools"></i> Complexidade da Instalação
                                </div>
                                <select name="complexidade" class="form-select mb-3" id="complexidade-select">
                                    <option value="basica" <?= ($_POST['complexidade'] ?? 'basica') === 'basica' ? 'selected' : '' ?>>
                                        Básica - R$ <?= number_format($config['mao_obra']['basica'], 2, ',', '.') ?>
                                    </option>
                                    <option value="complexa" <?= ($_POST['complexidade'] ?? '') === 'complexa' ? 'selected' : '' ?>>
                                        Complexa - R$ <?= number_format($config['mao_obra']['complexa'], 2, ',', '.') ?>
                                    </option>
                                    <option value="premium" <?= ($_POST['complexidade'] ?? '') === 'premium' ? 'selected' : '' ?>>
                                        Premium - R$ <?= number_format($config['mao_obra']['premium'], 2, ',', '.') ?>
                                    </option>
                                </select>
                            </div>

                            <!-- Desconto -->
                            <div class="config-section">
                                <div class="config-title">
                                    <i class="bi bi-percent"></i> Desconto
                                </div>
                                <div class="input-group desconto-input">
                                    <input type="number" step="0.01" name="desconto" class="form-control" 
                                           value="<?= $_POST['desconto'] ?? '0' ?>" min="0" max="100">
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>

                            <button type="submit" name="calcular" class="btn-calcular">
                                <i class="bi bi-calculator"></i> Calcular Orçamento
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Resultado -->
            <div class="col-lg-6">
                <?php if ($resultado): ?>
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-file-earmark-text"></i> Resultado do Orçamento
                    </div>
                    <div class="card-body">
                        <div class="resultado-box">
                            <h5 style="color: var(--gold-dark); margin-bottom: 20px;">
                                <i class="bi bi-info-circle"></i> Detalhamento
                            </h5>
                            
                            <!-- Medidas -->
                            <div class="resultado-item">
                                <span class="resultado-label">
                                    <i class="bi bi-arrows-angle-expand"></i> Área
                                </span>
                                <span class="resultado-valor">
                                    <?= number_format($resultado['largura'], 2, ',', '.') ?> x <?= number_format($resultado['altura'], 2, ',', '.') ?>m 
                                    = <?= number_format($resultado['area_m2'], 2, ',', '.') ?>m²
                                </span>
                            </div>
                            
                            <div class="resultado-item">
                                <span class="resultado-label">
                                    <i class="bi bi-plus-circle"></i> Área c/ Margem (50%)
                                </span>
                                <span class="resultado-valor">
                                    <?= number_format($resultado['area_com_margem'], 2, ',', '.') ?>m²
                                </span>
                            </div>
                            
                            <hr style="margin: 20px 0; border-color: var(--gold-light);">
                            
                            <!-- Tecido -->
                            <div class="resultado-item">
                                <span class="resultado-label">
                                    <i class="bi bi-grid-3x3"></i> Tecido: <?= $resultado['tecido'] ?>
                                </span>
                                <span class="resultado-valor text-primary">
                                    R$ <?= number_format($resultado['preco_tecido'], 2, ',', '.') ?>
                                </span>
                            </div>
                            <div class="info-badge">
                                R$ <?= number_format($resultado['preco_m2_tecido'], 2, ',', '.') ?>/m² × <?= number_format($resultado['area_com_margem'], 2, ',', '.') ?>m²
                            </div>
                            
                            <hr style="margin: 20px 0; border-color: var(--gold-light);">
                            
                            <!-- Instalação -->
                            <div class="resultado-item">
                                <span class="resultado-label">
                                    <i class="bi bi-gear-fill"></i> <?= $resultado['instalacao'] ?>
                                </span>
                                <span class="resultado-valor text-success">
                                    R$ <?= number_format($resultado['preco_instalacao_total'], 2, ',', '.') ?>
                                </span>
                            </div>
                            <div class="info-badge">
                                Material: R$ <?= number_format($resultado['preco_instalacao_metro'], 2, ',', '.') ?> + 
                                Instalação: R$ <?= number_format($resultado['preco_instalacao_servico'], 2, ',', '.') ?>
                            </div>
                            
                            <?php if ($resultado['preco_mao_obra'] > 0): ?>
                            <hr style="margin: 20px 0; border-color: var(--gold-light);">
                            
                            <!-- Mão de Obra -->
                            <div class="resultado-item">
                                <span class="resultado-label">
                                    <i class="bi bi-tools"></i> Mão de Obra (<?= ucfirst($resultado['complexidade']) ?>)
                                </span>
                                <span class="resultado-valor text-warning">
                                    R$ <?= number_format($resultado['preco_mao_obra'], 2, ',', '.') ?>
                                </span>
                            </div>
                            
                            <hr style="margin: 20px 0; border-color: var(--gold-light);">
                            <?php endif; ?>
                            
                            <!-- Subtotal -->
                            <div class="resultado-item">
                                <span class="resultado-label" style="font-size: 1.2rem;">
                                    <i class="bi bi-calculator"></i> Subtotal
                                </span>
                                <span class="resultado-valor" style="font-size: 1.3rem;">
                                    R$ <?= number_format($resultado['subtotal'], 2, ',', '.') ?>
                                </span>
                            </div>
                            
                            <?php if ($resultado['desconto_percent'] > 0): ?>
                            <div class="resultado-item">
                                <span class="resultado-label text-danger">
                                    <i class="bi bi-tag"></i> Desconto (<?= number_format($resultado['desconto_percent'], 1, ',', '.') ?>%)
                                </span>
                                <span class="resultado-valor text-danger">
                                    - R$ <?= number_format($resultado['valor_desconto'], 2, ',', '.') ?>
                                </span>
                            </div>
                            <?php endif; ?>
                            
                            <!-- Total Final -->
                            <div class="total-final">
                                <span class="label">
                                    <i class="bi bi-cash-stack"></i> VALOR FINAL
                                </span>
                                <span class="valor">
                                    R$ <?= number_format($resultado['total'], 2, ',', '.') ?>
                                </span>
                            </div>
                        </div>
                        
                        <div class="mt-4 d-grid gap-2 no-print">
                            <form method="POST" action="gerar-pdf-orcamento-action.php" target="_blank">
                                <input type="hidden" name="resultado" value='<?= json_encode($resultado) ?>'>
                                <button type="submit" class="btn btn-dark w-100">
                                    <i class="bi bi-file-earmark-pdf"></i> Gerar PDF do Orçamento
                                </button>
                            </form>
                            <button onclick="window.print()" class="btn btn-outline-dark">
                                <i class="bi bi-printer"></i> Imprimir Orçamento
                            </button>
                            <button onclick="copiarOrcamento()" class="btn btn-outline-secondary">
                                <i class="bi bi-clipboard"></i> Copiar para Área de Transferência
                            </button>
                        </div>
                    </div>
                </div>
                <?php else: ?>
                <div class="card">
                    <div class="card-body text-center py-5">
                        <i class="bi bi-calculator" style="font-size: 4rem; color: var(--gold-medium);"></i>
                        <h4 class="mt-3" style="color: var(--gold-dark);">Aguardando Dados</h4>
                        <p class="text-muted">Preencha o formulário ao lado para calcular o orçamento</p>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script>
        // Mostrar/esconder complexidade baseado na instalação
        document.addEventListener('DOMContentLoaded', function() {
            const instalacaoSelect = document.querySelector('select[name="instalacao"]');
            const complexidadeSection = document.getElementById('complexidade-section');
            const complexidadeSelect = document.getElementById('complexidade-select');
            
            function toggleComplexidade() {
                const instalacao = instalacaoSelect.value;
                if (instalacao && instalacao !== 'Cliente Instala') {
                    complexidadeSection.style.display = 'block';
                    complexidadeSelect.required = true;
                } else {
                    complexidadeSection.style.display = 'none';
                    complexidadeSelect.required = false;
                }
            }
            
            if (instalacaoSelect) {
                instalacaoSelect.addEventListener('change', toggleComplexidade);
                toggleComplexidade(); // Executar na carga
            }
        });
        
        function copiarOrcamento() {
            <?php if ($resultado): ?>
            const texto = `
ORÇAMENTO CORTINAS BRESSER
==========================

MEDIDAS:
- Largura: <?= number_format($resultado['largura'], 2, ',', '.') ?>m
- Altura: <?= number_format($resultado['altura'], 2, ',', '.') ?>m
- Área: <?= number_format($resultado['area_m2'], 2, ',', '.') ?>m²

ESPECIFICAÇÕES:
- Tecido: <?= $resultado['tecido'] ?>
- Instalação: <?= $resultado['instalacao'] ?>
- Complexidade: <?= ucfirst($resultado['complexidade']) ?>

VALORES:
- Tecido: R$ <?= number_format($resultado['preco_tecido'], 2, ',', '.') ?>
- Instalação: R$ <?= number_format($resultado['preco_instalacao_total'], 2, ',', '.') ?>
- Mão de Obra: R$ <?= number_format($resultado['preco_mao_obra'], 2, ',', '.') ?>
- Subtotal: R$ <?= number_format($resultado['subtotal'], 2, ',', '.') ?>
<?php if ($resultado['desconto_percent'] > 0): ?>
- Desconto (<?= number_format($resultado['desconto_percent'], 1, ',', '.') ?>%): -R$ <?= number_format($resultado['valor_desconto'], 2, ',', '.') ?>
<?php endif; ?>

TOTAL: R$ <?= number_format($resultado['total'], 2, ',', '.') ?>

Data: <?= date('d/m/Y H:i') ?>
            `.trim();
            
            navigator.clipboard.writeText(texto).then(() => {
                alert('✅ Orçamento copiado para área de transferência!');
            });
            <?php endif; ?>
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
