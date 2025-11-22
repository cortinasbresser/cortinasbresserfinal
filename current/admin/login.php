<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin - Cortinas Bresser</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: system-ui, -apple-system, sans-serif;
        }
        .login-container {
            background: rgba(26, 26, 26, 0.95);
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 10px 40px rgba(212, 175, 55, 0.2);
            backdrop-filter: blur(10px);
            max-width: 420px;
            width: 100%;
        }
        .logo {
            max-width: 180px;
            margin-bottom: 2rem;
            filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.3));
        }
        .form-control {
            background: rgba(42, 42, 42, 0.7);
            border: 1px solid rgba(212, 175, 55, 0.3);
            color: #fff;
            padding: 12px 15px;
            border-radius: 10px;
        }
        .form-control:focus {
            background: rgba(42, 42, 42, 0.9);
            border-color: #d4af37;
            box-shadow: 0 0 0 0.2rem rgba(212, 175, 55, 0.25);
            color: #fff;
        }
        .form-control::placeholder {
            color: rgba(212, 175, 55, 0.5);
        }
        .btn-gold {
            background: linear-gradient(135deg, #d4af37, #b8941f);
            border: none;
            color: #000;
            font-weight: 600;
            padding: 12px;
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        .btn-gold:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
            background: linear-gradient(135deg, #b8941f, #d4af37);
            color: #000;
        }
        .text-gold {
            color: #d4af37;
        }
        .alert {
            border-radius: 10px;
            border: 1px solid rgba(212, 175, 55, 0.3);
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="text-center">
            <img src="../assets/cortinasbresser.svg" alt="Cortinas Bresser" class="logo">
            <h2 class="text-gold mb-1">Painel Admin</h2>
            <p class="text-white-50 mb-4">Gestão de Leads</p>
        </div>

        <?php if (isset($_GET['erro'])): ?>
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <?php 
                    if ($_GET['erro'] == 'credenciais') {
                        echo 'Usuário ou senha incorretos.';
                    } else {
                        echo 'Erro ao fazer login.';
                    }
                ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="auth.php">
            <div class="mb-3">
                <label for="username" class="form-label text-gold">
                    <i class="bi bi-person-fill me-2"></i>Usuário
                </label>
                <input type="text" class="form-control" id="username" name="username" placeholder="Digite seu usuário" required autofocus>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label text-gold">
                    <i class="bi bi-lock-fill me-2"></i>Senha
                </label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Digite sua senha" required>
            </div>

            <div class="d-grid">
                <button type="submit" class="btn btn-gold">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Entrar
                </button>
            </div>
        </form>

        <div class="text-center mt-4">
            <a href="../index.php" class="text-white-50 text-decoration-none">
                <i class="bi bi-arrow-left me-2"></i>Voltar ao site
            </a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
