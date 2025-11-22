<?php
// index.php - Cortinas Bresser (formulário de orçamento sob medida)

// Headers anti-cache para sempre carregar versão atualizada
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
?>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  
  <!-- Anti-Cache Meta Tags -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <meta name="description" content="Cortinas sob medida em SP com tecidos premium (blackout, voil, linho). Orçamento em minutos, instalação incluída. Atendemos Brás e toda São Paulo. 📞 (11) 2692-7865">
  <meta name="keywords" content="cortinas sob medida são paulo, cortinas personalizadas, cortinas blackout, decoração cortinas, instalação profissional cortinas">
  <meta name="author" content="Cortinas Bresser">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.cortinasbresser.com.br/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.cortinasbresser.com.br/">
  <meta property="og:title" content="Cortinas Bresser - Cortinas Sob Medida Premium em São Paulo">
  <meta property="og:description" content="Transforme seu ambiente com cortinas sob medida. Tecidos premium, instalação profissional e orçamento em minutos. Atendemos toda São Paulo.">
  <meta property="og:image" content="https://www.cortinasbresser.com.br/assets/banner1.jpg">
  <meta property="og:image:width" content="1920">
  <meta property="og:image:height" content="600">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://www.cortinasbresser.com.br/">
  <meta property="twitter:title" content="Cortinas Bresser - Cortinas Sob Medida Premium">
  <meta property="twitter:description" content="Tecidos premium, instalação incluída e orçamento rápido. Especialistas em decoração com cortinas em São Paulo.">
  <meta property="twitter:image" content="https://www.cortinasbresser.com.br/assets/banner1.jpg">

  <title>Cortinas Bresser - Cortinas Sob Medida Premium em São Paulo | Orçamento Rápido</title>

  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  
  <!-- Styles -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">

  <link rel="icon" type="image/png" sizes="16x16" href="/favicons/bresser_icon.png">
  <meta name="msapplication-TileColor" content="#d4af37">
  <meta name="theme-color" content="#000000">

  <!-- Structured Data (Schema.org) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cortinas Bresser",
    "image": "https://www.cortinasbresser.com.br/assets/cortinasbresser.svg",
    "@id": "https://www.cortinasbresser.com.br",
    "url": "https://www.cortinasbresser.com.br",
    "telephone": "+55-11-2692-7865",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Bresser, 1084",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "03053-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.539637,
      "longitude": -46.610689
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/cortinasbresser/",
      "https://www.facebook.com/profile.php?id=61577555679690"
    ]
  }
  </script>

  <!-- FAQ Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como funciona o orçamento de cortinas sob medida?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Você preenche o formulário com as medidas do ambiente, escolhe o tecido desejado e recebe um orçamento personalizado via WhatsApp em minutos. Nossa equipe tira todas as dúvidas antes da compra."
        }
      },
      {
        "@type": "Question",
        "name": "Qual o prazo de entrega das cortinas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O prazo varia conforme o tipo de tecido e modelo escolhido, geralmente entre 7 a 15 dias úteis após aprovação do orçamento."
        }
      },
      {
        "@type": "Question",
        "name": "A instalação está incluída no orçamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, oferecemos serviço completo de instalação profissional com garantia de qualidade."
        }
      },
      {
        "@type": "Question",
        "name": "Quais tecidos estão disponíveis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabalhamos com ampla variedade de tecidos nobres: blackout, voil, linho, seda, cetim e tecidos importados. Consulte nosso catálogo completo."
        }
      }
    ]
  }
  </script>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YR56WHH2D4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YR56WHH2D4');
  </script>

</head>
<body class="bg-black text-white">

  <!-- Carrossel Full Width -->
<div id="carouselHero" class="carousel slide carousel-full" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="assets/banner1.jpg" class="d-block w-100" alt="Cortinas Bresser - Cortinas sob medida premium em São Paulo" width="1920" height="600" fetchpriority="high">
    </div>
  </div>
</div>


  <!-- Logo Centralizado -->
  <header class="text-center py-3" role="banner">
    <img src="assets/cortinasbresser.svg" alt="Cortinas Bresser - Especialistas em Cortinas Sob Medida" class="logo fade-in-smooth" width="200" height="auto">
  </header>

  <!-- Breadcrumb Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.cortinasbresser.com.br/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Orçamento",
        "item": "https://www.cortinasbresser.com.br/#orcamentoForm"
      }
    ]
  }
  </script>

  <!-- Formulário -->
  <main>
  <section class="container py-4 text-center" aria-labelledby="form-heading">
    <h1 id="form-heading" class="text-gold mb-4 reveal-on-scroll">Orçamento Personalizado para Sua Cortina</h1>
    <p class="text-gold mb-4 reveal-on-scroll">Preencha o formulário e receba uma proposta exclusiva em minutos</p>

    <form id="orcamentoForm" method="POST" class="mx-auto text-start bg-dark p-4 rounded-4 shadow" style="max-width:600px;" novalidate>

      <div class="mb-3">
        <label for="nome" class="form-label text-gold">Qual seu nome? *</label>
        <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite seu primeiro nome" required minlength="2" maxlength="50" autocomplete="given-name" aria-required="true">
        <div class="invalid-feedback">Por favor, informe seu primeiro nome.</div>
      </div>

      <div class="mb-3">
        <label for="telefone" class="form-label text-gold">Telefone / WhatsApp *</label>
        <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(11) 99999-9999" required autocomplete="tel" aria-required="true">
        <div class="invalid-feedback">Informe um número de telefone válido com DDD.</div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="parede" class="form-label text-gold">Largura da parede (m) *</label>
          <input type="number" class="form-control" id="parede" name="parede" step="0.01" min="0.5" max="10" placeholder="Ex: 3.20" required>
          <div class="invalid-feedback">Informe a largura da parede em metros.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="altura_parede" class="form-label text-gold">Altura da parede (m) *</label>
          <input type="number" class="form-control" id="altura_parede" name="altura_parede" step="0.01" min="1.5" max="5" placeholder="Ex: 2.60" required>
          <div class="invalid-feedback">Informe a altura da parede em metros.</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="tecido" class="form-label text-gold">Tipo de tecido *</label>
        <select class="form-select" id="tecido" name="tecido" required>
          <option value="">Selecione...</option>
          <option value="Voil">Voil</option>
          <option value="Linho">Linho (Variedades)</option>
          <option value="Blackout">Blackout</option>
          <option value="Seda">Seda</option>
          <option value="Outros">Outros</option>
        </select>
        <div class="invalid-feedback">Selecione o tipo de tecido.</div>
      </div>

      <div class="mb-3">
        <label for="instalacao" class="form-label text-gold">Tipo de instalação *</label>
        <select class="form-select" id="instalacao" name="instalacao" required>
          <option value="">Selecione...</option>
          <option value="Trilho">Trilho</option>
          <option value="Varão">Varão</option>
          <option value="Não sei">Não sei - Preciso de ajuda</option>
        </select>
        <div class="invalid-feedback">Selecione o tipo de instalação.</div>
      </div>

      <div class="mb-3">
        <label for="observacoes" class="form-label text-gold">Observações adicionais</label>
        <textarea class="form-control" id="observacoes" name="observacoes" rows="2" placeholder="Cor preferida, tipo de ambiente, etc." maxlength="500"></textarea>
      </div>

      <div class="mb-3">
        <label for="endereco" class="form-label text-gold">Endereço para instalação (opcional)</label>
        <textarea class="form-control" id="endereco" name="endereco" rows="2" placeholder="Rua, número, bairro, cidade..." maxlength="300"></textarea>
      </div>

      <div class="d-grid mt-4">
        <button type="submit" id="btnEnviar" class="btn btn-warning btn-lg pulsante" aria-label="Solicitar Orçamento">
          <span class="btn-text"><i class="bi bi-stars me-2"></i>Solicitar Orçamento</span>
          <div class="spinner-border spinner-border-sm d-none" role="status">
            <span class="visually-hidden">Enviando...</span>
          </div>
        </button>
      </div>

    </form>
  </section>

  <!-- Section do Google Maps -->
  <section class="maps-section py-5 reveal" aria-label="Localização e contato">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center mb-5">
          <div class="location-header">
            <div class="location-icon-wrapper mb-3">
              <i class="bi bi-house-heart-fill"></i>
            </div>
            <p class="text-gold-light mb-0 fs-5">Visite nosso showroom e encontre a cortina perfeita para seu ambiente</p>
          </div>
        </div>
        <div class="col-12 col-lg-10">
          <div class="maps-container rounded-4 overflow-hidden shadow-lg position-relative">
            <div class="map-overlay"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.801603585944!2d-46.61291931297278!3d-23.53963710615595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5920adf60777%3A0xfee6ea56e12c8af7!2sR.%20Bresser%2C%201084%20-%20Br%C3%A1s%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003053-000!5e0!3m2!1spt-BR!2sbr!4v1760039486295!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="500" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title="Localização da Cortinas Bresser">
            </iframe>
          </div>
          <div class="maps-info mt-5">
            <div class="row g-4">
              <div class="col-12 col-md-4">
                <div class="info-card h-100">
                  <div class="info-icon">
                    <i class="bi bi-pin-map-fill"></i>
                  </div>
                  <h5 class="text-gold mb-3 fw-semibold">Endereço</h5>
                  <p class="text-light mb-0 lh-lg">
                    <strong>Rua Bresser, 1084</strong><br>
                    Brás - São Paulo/SP<br>
                    CEP: 03053-000
                  </p>
                  <a href="https://maps.app.goo.gl/JKtntb6Hd5RMqr8PA" target="_blank" rel="noopener noreferrer" class="btn-get-directions mt-3">
                    <i class="bi bi-signpost-2-fill"></i> Como Chegar
                  </a>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="info-card h-100">
                  <div class="info-icon">
                    <i class="bi bi-clock-history"></i>
                  </div>
                  <h5 class="text-gold mb-3 fw-semibold">Horário de Atendimento</h5>
                  <p class="text-light mb-0 lh-lg">
                    <strong>Segunda a Sexta</strong><br>
                    08:00 - 17:00<br><br>
                    <strong>Sábado</strong><br>
                    09:00 - 16:00
                  </p>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="info-card h-100">
                  <div class="info-icon">
                    <i class="bi bi-chat-heart-fill"></i>
                  </div>
                  <h5 class="text-gold mb-3 fw-semibold">Fale Conosco</h5>
                  <p class="text-light mb-2 lh-lg">
                    <strong>Telefone:</strong><br>
                    <a href="tel:+551126927865" class="contact-link">(11) 2692-7865</a>
                  </p>
                  <p class="text-light mb-2">
                    <strong>WhatsApp:</strong><br>
                    <a href="https://wa.me/5511994013938" class="contact-link" target="_blank">(11) 99401-3938</a><br>
                    <a href="https://wa.me/5511956616041" class="contact-link" target="_blank">(11) 95661-6041</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  </main>

  <!-- Rodapé Profissional -->
  <footer class="footer-professional" role="contentinfo">
    <div class="footer-elegant">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10 text-center">
            
            <!-- Logo -->
            <div class="footer-logo-wrapper mb-4">
              <img src="assets/cortinasbresser.svg" alt="Cortinas Bresser" class="footer-logo" width="120" height="auto">
            </div>
            
            <!-- Badges -->
            <div class="footer-badges-center mb-4">
              <span class="badge-quality">
                <i class="bi bi-gem"></i> Qualidade Premium
              </span>
              <span class="badge-quality">
                <i class="bi bi-star-fill"></i> +20 Anos
              </span>
            </div>
            
            <!-- Divider -->
            <div class="divider-elegant my-4"></div>
            
            <!-- Redes Sociais -->
            <div class="footer-social-center mb-4">
              <a href="https://www.instagram.com/cortinasbresser/" target="_blank" rel="noopener" title="Instagram" class="social-btn instagram" aria-label="Siga-nos no Instagram">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577555679690" target="_blank" rel="noopener" title="Facebook" class="social-btn facebook" aria-label="Curta nossa página no Facebook">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="https://wa.me/5511994013938" target="_blank" rel="noopener" title="WhatsApp" class="social-btn whatsapp" aria-label="Fale conosco pelo WhatsApp">
                <i class="bi bi-whatsapp"></i>
              </a>
            </div>
            
            <!-- CTA -->
            <div class="footer-cta-center mb-4">
              <a href="#orcamentoForm" class="btn-ghost">
                <i class="bi bi-calculator"></i> Solicitar Orçamento
              </a>
            </div>
            
            <!-- Copyright -->
            <div class="footer-copyright">
              <p class="mb-2 text-muted">
                &copy; 2025 <strong class="text-gold">Cortinas Bresser</strong>
              </p>
              <p class="mb-0 small text-muted">
                Elegância e sofisticação em cortinas sob medida
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- WhatsApp Float - Fiel à marca -->
  <a href="https://wa.me/5511994013938?text=Olá! Gostaria de solicitar um orçamento de cortinas." class="whatsapp-float" target="_blank" rel="noopener" title="Fale conosco no WhatsApp">
    <i class="bi bi-whatsapp"></i>
  </a>

  <!-- Modal de Confirmação -->
  <div class="modal fade" id="modalConfirmacao" tabindex="-1" aria-labelledby="modalConfirmacaoLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-warning">
          <h5 class="modal-title text-gold" id="modalConfirmacaoLabel">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="me-2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Orçamento Recebido!
          </h5>
        </div>
        <div class="modal-body text-center py-4">
          <div class="mb-3">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="#28a745">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h4 class="text-success mb-3">Obrigado pelo seu interesse!</h4>
          <p class="mb-2">Seus dados foram <strong>recebidos com sucesso</strong> em nosso sistema.</p>
          <p class="mb-3">Em breve entraremos em contato para confirmar as medidas e fornecer o orçamento.</p>
          
          <!-- Link para visualizar PDF -->
          <div class="text-center my-4">
            <a href="#" id="linkVisualizarPDF" target="_blank" class="btn btn-warning btn-lg shadow-lg" style="display: none;">
              <i class="bi bi-file-earmark-pdf-fill me-2"></i>
              <strong>VISUALIZAR PDF DO ORÇAMENTO</strong>
            </a>
          </div>
          
          <div class="alert alert-info mt-4">
            <small>
              <strong>📱 WhatsApp aberto!</strong> Já abrimos o WhatsApp para você.<br>
              Você pode fechar esta janela quando quiser.
            </small>
          </div>
        </div>
        <div class="modal-footer border-warning">
          <button type="button" class="btn btn-success btn-lg w-100" data-bs-dismiss="modal" id="btnContinuarWhatsApp">
            <i class="bi bi-whatsapp me-2"></i>Enviar para WhatsApp
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Efeitos UX/UI Premium -->
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      // ===== SCROLL REVEAL APRIMORADO =====
      const reveals = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('active');
            }, index * 100); // Efeito cascata
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      reveals.forEach(r => observer.observe(r));

      // ===== PARTÍCULAS DOURADAS NO HEADER =====
      criarParticulasDouradas();

      // ===== EFEITO DE BRILHO NOS INPUTS AO FOCAR =====
      const inputs = document.querySelectorAll('.form-control, .form-select');
      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)';
          this.style.transform = 'scale(1.02)';
          this.style.transition = 'all 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
          this.style.boxShadow = '';
          this.style.transform = 'scale(1)';
        });
      });

      // ===== ANIMAÇÃO DO LOGO =====
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.addEventListener('mouseenter', function() {
          this.style.filter = 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))';
          this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
          this.style.filter = '';
          this.style.transform = 'scale(1) rotate(0deg)';
        });
      }

      // ===== EFEITO RIPPLE NOS BOTÕES =====
      document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          ripple.classList.add('ripple-effect');
          
          this.appendChild(ripple);
          
          setTimeout(() => ripple.remove(), 600);
        });
      });

      // ===== CONTADOR ANIMADO PARA O MODAL =====
      let modalTimer;
      const modal = document.getElementById('modalConfirmacao');
      if (modal) {
        modal.addEventListener('show.bs.modal', function() {
          let counter = 30;
          const timerElement = document.createElement('div');
          timerElement.className = 'modal-timer';
          timerElement.textContent = counter;
          this.querySelector('.modal-content').appendChild(timerElement);
          
          modalTimer = setInterval(() => {
            counter--;
            timerElement.textContent = counter;
            if (counter <= 0) {
              clearInterval(modalTimer);
            }
          }, 1000);
        });
      }

      // ===== PARALLAX SUAVE NO CARROSSEL =====
      const carousel = document.getElementById('carouselHero');
      if (carousel) {
        window.addEventListener('scroll', function() {
          const scrolled = window.pageYOffset;
          const carouselImages = carousel.querySelectorAll('.carousel-item img');
          carouselImages.forEach(img => {
            img.style.transform = `translateY(${scrolled * 0.3}px)`;
          });
        });
      }

      // ===== ANIMAÇÃO DE DIGITAÇÃO NOS PLACEHOLDERS =====
      animarPlaceholders();

      // ===== CURSOR DOURADO PERSONALIZADO (OPCIONAL) =====
      criarCursorPersonalizado();
    });

    // ===== FUNÇÃO: PARTÍCULAS DOURADAS =====
    function criarParticulasDouradas() {
      const header = document.querySelector('header');
      if (!header) return;

      for (let i = 0; i < 15; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula-dourada';
        particula.style.left = Math.random() * 100 + '%';
        particula.style.animationDelay = Math.random() * 5 + 's';
        particula.style.animationDuration = (3 + Math.random() * 4) + 's';
        header.appendChild(particula);
      }
    }

    // ===== FUNÇÃO: ANIMAÇÃO DE PLACEHOLDERS =====
    function animarPlaceholders() {
      const inputsComPlaceholder = document.querySelectorAll('input[placeholder], textarea[placeholder]');
      
      inputsComPlaceholder.forEach(input => {
        const placeholderOriginal = input.placeholder;
        let index = 0;
        let isTyping = true;
        
        input.addEventListener('focus', function() {
          this.placeholder = '';
          index = 0;
          isTyping = true;
          
          const typeInterval = setInterval(() => {
            if (isTyping && index < placeholderOriginal.length) {
              this.placeholder += placeholderOriginal[index];
              index++;
            } else {
              clearInterval(typeInterval);
            }
          }, 50);
        });
      });
    }

    // ===== FUNÇÃO: CURSOR PERSONALIZADO =====
    function criarCursorPersonalizado() {
      const cursor = document.createElement('div');
      cursor.className = 'cursor-dourado';
      document.body.appendChild(cursor);

      const cursorTrail = document.createElement('div');
      cursorTrail.className = 'cursor-trail';
      document.body.appendChild(cursorTrail);

      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
          cursorTrail.style.left = e.clientX + 'px';
          cursorTrail.style.top = e.clientY + 'px';
        }, 50);
      });

      // Aumentar cursor em elementos clicáveis
      const clickables = document.querySelectorAll('a, button, input, select, textarea');
      clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(1.5)';
          cursor.style.borderColor = '#d4af37';
        });
        
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)';
          cursor.style.borderColor = '#d4af37';
        });
      });
    }
  </script>

  <!-- JavaScript do Formulário -->
  <script>
// JavaScript do Formulário - Cortinas Bresser
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Inicializando formulário Cortinas Bresser...');
    
    const form = document.getElementById('orcamentoForm');
    const btnEnviar = document.getElementById('btnEnviar');
    
    if (!form || !btnEnviar) {
        console.error('❌ Formulário ou botão não encontrados!');
        return;
    }
    
    console.log('✅ Formulário carregado com sucesso');
    
    // Evento de submit
    form.addEventListener('submit', function(event) {
        console.log('🔄 Submit do formulário detectado');
        event.preventDefault();
        event.stopPropagation();
        
        // Validação do telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput && telefoneInput.value && !validarTelefone(telefoneInput.value)) {
            form.classList.add('was-validated');
            mostrarAlerta('Por favor, informe um número de telefone válido com DDD.', 'warning');
            telefoneInput.focus();
            return false;
        }
        
        // Validação geral do formulário
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            mostrarCamposInvalidos();
            mostrarAlerta('Por favor, preencha todos os campos obrigatórios corretamente.', 'warning');
            return false;
        }
        
        console.log('✅ Formulário válido, processando...');
        processarFormulario();
        
        return false;
    });
    
    // Configurar validação em tempo real
    configurarValidacaoTempoReal();
});

// ========== FUNÇÃO PRINCIPAL ATUALIZADA ==========

async function processarFormulario() {
    console.log('📤 Processando formulário...');
    
    const form = document.getElementById('orcamentoForm');
    const btnEnviar = document.getElementById('btnEnviar');
    
    // Mostrar estado de carregamento
    btnEnviar.disabled = true;
    const btnText = btnEnviar.querySelector('.btn-text');
    const spinner = btnEnviar.querySelector('.spinner-border');
    
    if (btnText) btnText.textContent = 'Enviando...';
    if (spinner) spinner.classList.remove('d-none');
    
    try {
        // Coletar dados do formulário
        const dadosFormulario = coletarDadosFormulario();
        
        // Validar dados essenciais
        if (!dadosFormulario.nome || !dadosFormulario.telefone) {
            throw new Error('Nome e telefone são obrigatórios');
        }
        
        // 1. Tentar enviar para o email
        let emailEnviado = false;
        try {
            emailEnviado = await enviarParaEmail(dadosFormulario);
            console.log('📨 Status do email:', emailEnviado ? 'Enviado' : 'Falhou');
        } catch (e) {
            console.warn('⚠️ Email falhou:', e);
        }
        
        // 2. Registrar no log
        let logRegistrado = false;
        try {
            logRegistrado = await registrarNoLog(dadosFormulario);
        } catch (e) {
            console.warn('⚠️ Log falhou:', e);
        }
        
        // 3. Preparar WhatsApp com PDF
        const mensagemWhatsApp = gerarMensagemWhatsApp(dadosFormulario);
        const numeroWhatsApp = '5511994013938';
        let urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemWhatsApp}`;
        
        // Adicionar link do PDF se disponível
        if (emailEnviado && emailEnviado.pdf_url) {
            const mensagemComPDF = mensagemWhatsApp + encodeURIComponent(`\n\n📎 PDF do Orçamento: ${emailEnviado.pdf_url}`);
            urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemComPDF}`;
        }
        
        // 4. Mostrar modal de confirmação (WhatsApp abre automaticamente)
        mostrarModalConfirmacao(emailEnviado, logRegistrado, urlWhatsApp);
        
        // 5. Resetar formulário
        form.reset();
        form.classList.remove('was-validated');
        limparValidacoes();
        
        // Restaurar botão
        btnEnviar.disabled = false;
        if (btnText) btnText.innerHTML = '<i class="bi bi-send-fill me-2"></i>Solicitar Orçamento';
        if (spinner) spinner.classList.add('d-none');
        
    } catch (erro) {
        console.error('❌ Erro:', erro);
        
        // Restaurar botão
        btnEnviar.disabled = false;
        if (btnText) btnText.innerHTML = '<i class="bi bi-send-fill me-2"></i>Solicitar Orçamento';
        if (spinner) spinner.classList.add('d-none');
        
        mostrarAlerta('❌ Erro: ' + erro.message, 'danger');
    }
}

// Função atualizada para mostrar o modal de confirmação
function mostrarModalConfirmacao(emailEnviado, logRegistrado, urlWhatsApp) {
    const modal = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
    
    // Debug: ver o que está chegando
    console.log('📄 Dados do email recebido:', emailEnviado);
    console.log('📄 PDF URL:', emailEnviado?.pdf_url);
    
    // Configurar link do PDF se disponível
    const linkPDF = document.getElementById('linkVisualizarPDF');
    if (linkPDF) {
        if (emailEnviado && emailEnviado.pdf_url) {
            console.log('✅ Configurando link do PDF:', emailEnviado.pdf_url);
            linkPDF.href = emailEnviado.pdf_url;
            linkPDF.style.display = 'inline-block';
            linkPDF.classList.remove('d-none');
            
            // Garantir que o link seja clicável
            linkPDF.onclick = function(e) {
                e.preventDefault();
                window.open(emailEnviado.pdf_url, '_blank');
                return false;
            };
        } else {
            console.log('⚠️ PDF URL não disponível');
            linkPDF.style.display = 'none';
            linkPDF.classList.add('d-none');
        }
    } else {
        console.error('❌ Elemento linkVisualizarPDF não encontrado');
    }
    
    // Abrir WhatsApp IMEDIATAMENTE em uma nova aba
    setTimeout(() => {
        window.open(urlWhatsApp, '_blank');
    }, 500); // Pequeno delay para garantir que o modal abra primeiro
    
    // Configurar o botão do modal para reabrir o WhatsApp
    const btnContinuar = document.getElementById('btnContinuarWhatsApp');
    btnContinuar.onclick = function() {
        window.open(urlWhatsApp, '_blank');
        modal.hide();
    };
    
    // Mostrar o modal
    modal.show();
    
    // Modal permanece aberto até o cliente fechar manualmente
    // Removido fechamento automático conforme solicitado
}

// ========== FUNÇÃO PARA ENVIAR EMAIL ==========

async function enviarParaEmail(dados) {
    try {
        console.log('📨 Enviando dados para email...');
        
        const response = await fetch('enviar-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });
        
        const resultado = await response.json();
        console.log('📨 Resposta do email:', resultado);
        
        if (resultado.status === 'success') {
            return resultado; // Retorna objeto completo com pdf_url
        }
        return false;
        
    } catch (erro) {
        console.warn('⚠️ Erro no email:', erro);
        return false;
    }
}

// ========== FUNÇÃO PARA REGISTRAR NO LOG ==========

async function registrarNoLog(dados) {
    try {
        console.log('📝 Registrando dados no log...');
        
        const response = await fetch('registrar-log.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(dados)
        });
        
        const resultado = await response.text();
        console.log('📝 Resposta do log:', resultado);
        
        return resultado.includes('sucesso');
        
    } catch (erro) {
        console.warn('⚠️ Erro no log:', erro);
        return false;
    }
}

// ========== FUNÇÕES AUXILIARES ==========

function coletarDadosFormulario() {
    const form = document.getElementById('orcamentoForm');
    
    return {
        nome: form.nome.value.trim(),
        telefone: form.telefone.value.trim(),
        paredeLargura: form.parede.value.trim(),
        paredeAltura: form.altura_parede.value.trim(),
        tecido: form.tecido.value.trim(),
        instalacao: form.instalacao.value.trim(),
        endereco: form.endereco.value.trim(),
        observacoes: form.observacoes.value.trim()
    };
}

function gerarMensagemWhatsApp(dados) {
    let mensagem = `*SOLICITAÇÃO DE ORÇAMENTO*%0A*Cortinas Bresser*%0A%0A`;
    
    mensagem += `*Dados do Cliente:*%0A`;
    mensagem += `Nome: ${dados.nome}%0A`;
    mensagem += `Telefone: ${dados.telefone}%0A%0A`;
    
    mensagem += `*Medidas Solicitadas:*%0A`;
    mensagem += `Parede: ${dados.paredeLargura}m (largura) x ${dados.paredeAltura}m (altura)%0A%0A`;
    
    mensagem += `*Especificações:*%0A`;
    mensagem += `Tecido: ${dados.tecido}%0A`;
    mensagem += `Instalação: ${dados.instalacao}%0A%0A`;
    
    if (dados.endereco && dados.endereco.trim() !== '') {
        mensagem += `*Endereço para Instalação:*%0A`;
        mensagem += `${dados.endereco}%0A%0A`;
    }
    
    if (dados.observacoes && dados.observacoes.trim() !== '') {
        mensagem += `*Observações:*%0A`;
        mensagem += `${dados.observacoes}%0A%0A`;
    }
    
    mensagem += `_Enviado via site Cortinas Bresser_`;
    
    return mensagem;
}

function limparValidacoes() {
    const form = document.getElementById('orcamentoForm');
    const campos = form.querySelectorAll('.is-valid, .is-invalid');
    campos.forEach(campo => {
        campo.classList.remove('is-valid', 'is-invalid');
    });
}

function validarTelefone(telefone) {
    if (!telefone) return false;
    const numeroLimpo = telefone.replace(/\D/g, '');
    return numeroLimpo.length >= 10 && numeroLimpo.length <= 11;
}

function formatarTelefone(telefone) {
    if (!telefone) return '';
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    if (numeroLimpo.length === 11) {
        return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeroLimpo.length === 10) {
        return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
}

function mostrarCamposInvalidos() {
    const camposInvalidos = document.querySelectorAll('#orcamentoForm :invalid');
    if (camposInvalidos.length > 0) {
        camposInvalidos[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        camposInvalidos[0].focus();
    }
}

function validarCampo(campo) {
    if (campo.id === 'telefone' && campo.value) {
        if (validarTelefone(campo.value)) {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
        } else {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');
        }
        return;
    }
    
    if (campo.checkValidity()) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
    } else {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
    }
}

function configurarValidacaoTempoReal() {
    const form = document.getElementById('orcamentoForm');
    const campos = form.querySelectorAll('input, select, textarea');
    
    campos.forEach(campo => {
        // Efeito de foco dourado aprimorado
        campo.addEventListener('focus', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
            this.style.borderColor = '#d4af37';
            this.style.transform = 'scale(1.02)';
            
            // Label fica dourada ao focar
            const label = form.querySelector(`label[for="${this.id}"]`);
            if (label) {
                label.style.color = '#f5d76e';
                label.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
            }
        });
        
        campo.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            
            const label = form.querySelector(`label[for="${this.id}"]`);
            if (label) {
                label.style.color = '';
                label.style.textShadow = '';
            }
        });
        
        if (campo.id === 'telefone') {
            campo.addEventListener('input', function() {
                const valorFormatado = formatarTelefone(this.value);
                if (valorFormatado !== this.value) {
                    this.value = valorFormatado;
                }
                validarCampoComAnimacao(this);
            });
            
            campo.addEventListener('blur', function() {
                validarCampoComAnimacao(this);
            });
        } else {
            campo.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validarCampoComAnimacao(this);
                }
            });
            
            campo.addEventListener('blur', function() {
                validarCampoComAnimacao(this);
            });
        }
    });
}

// Validação com animação
function validarCampoComAnimacao(campo) {
    const isValid = campo.checkValidity();
    
    // Animação de shake se inválido
    if (!isValid && campo.value) {
        campo.style.animation = 'shake 0.5s';
        setTimeout(() => {
            campo.style.animation = '';
        }, 500);
    }
    
    // Ícone de validação
    if (isValid && campo.value) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
        
        // Efeito de sucesso
        criarEfeitoSucesso(campo);
    } else if (!isValid && campo.value) {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
    }
}

// Efeito visual de sucesso
function criarEfeitoSucesso(elemento) {
    const particulas = 5;
    const rect = elemento.getBoundingClientRect();
    
    for (let i = 0; i < particulas; i++) {
        const particula = document.createElement('div');
        particula.style.position = 'fixed';
        particula.style.left = rect.right - 30 + 'px';
        particula.style.top = rect.top + rect.height / 2 + 'px';
        particula.style.width = '4px';
        particula.style.height = '4px';
        particula.style.background = '#d4af37';
        particula.style.borderRadius = '50%';
        particula.style.pointerEvents = 'none';
        particula.style.zIndex = '9999';
        particula.style.animation = `particula-sucesso 0.8s ease-out forwards`;
        particula.style.animationDelay = (i * 0.1) + 's';
        
        document.body.appendChild(particula);
        
        setTimeout(() => particula.remove(), 1000);
    }
}

function mostrarAlerta(mensagem, tipo) {
    // Remover alertas existentes
    const alertasExistentes = document.querySelectorAll('.alert-floating');
    alertasExistentes.forEach(alerta => {
        if (alerta.parentElement) {
            alerta.remove();
        }
    });
    
    // Criar novo alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show alert-floating`;
    alerta.innerHTML = `
        <div class="d-flex align-items-center justify-content-center">
            <span class="me-2">${mensagem}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        </div>
    `;
    
    document.body.appendChild(alerta);
    
    // Animação de entrada
    setTimeout(() => {
        alerta.classList.add('show');
    }, 10);
    
    // Auto-remover após 8 segundos
    setTimeout(() => {
        if (alerta.parentElement) {
            alerta.remove();
        }
    }, 8000);
    
    // Remover ao clicar no X
    const closeBtn = alerta.querySelector('.btn-close');
    closeBtn.addEventListener('click', function() {
        if (alerta.parentElement) {
            alerta.remove();
        }
    });
}

console.log('✅ JavaScript do formulário carregado!');

// ===== ANIMAÇÕES MODERNAS COM INTERSECTION OBSERVER =====
// Inicializar Intersection Observer para animações ao scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Opcionalmente desconectar após animar
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todos os elementos com classe reveal-on-scroll
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => observer.observe(el));
  
  // Aplicar stagger animation aos info-cards
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach((card, index) => {
    card.classList.add('stagger-item');
    card.style.animationDelay = `${index * 0.15}s`;
  });
  
  // Adicionar hover-lift aos cards
  infoCards.forEach(card => {
    card.classList.add('hover-lift');
  });
  
  // Micro-interactions nos botões
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.classList.add('micro-bounce');
  });
  
  // Parallax suave no banner
  let ticking = false;
  const banner = document.querySelector('.carousel-item img');
  
  if (banner) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.3;
          if (banner) {
            banner.style.transform = `translateY(${rate}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  console.log('✨ Animações modernas ativadas!');
});
  </script>

</body>
</html>