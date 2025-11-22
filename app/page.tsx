'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import QuoteForm from '@/components/QuoteForm';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  // Keep existing effects (scroll reveal, particles, etc.) but remove form-related effects
  useEffect(() => {
    // ===== SCROLL REVEAL ANIMATION =====
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach((el) => observer.observe(el));

    // ===== PARTÍCULAS DOURADAS NO HEADER =====
    const header = document.querySelector('header');
    if (header) {
      for (let i = 0; i < 15; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula-dourada';
        particula.style.left = Math.random() * 100 + '%';
        particula.style.animationDelay = Math.random() * 5 + 's';
        particula.style.animationDuration = (3 + Math.random() * 4) + 's';
        header.appendChild(particula);
      }
    }

    // ===== EFEITO DE BRILHO NOS INPUTS AO FOCAR =====
    const inputs = document.querySelectorAll('.form-control-elegant, select');
    inputs.forEach(input => {
      input.addEventListener('focus', function (this: HTMLElement) {
        this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)';
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'all 0.3s ease';
      });
      input.addEventListener('blur', function (this: HTMLElement) {
        this.style.boxShadow = '';
        this.style.transform = 'scale(1)';
      });
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Logo */}
      <header className="text-center py-3" role="banner">
        <Image
          src="/assets/cortinasbresser.svg"
          alt="Cortinas Bresser - Especialistas em Cortinas Sob Medida"
          width={200}
          height={80}
          className="logo animate-fade-in-bottom"
          style={{ margin: '0 auto', display: 'block' }}
        />
      </header>

      {/* Formulário */}
      <section className="container-elegant py-4 text-center" id="orcamentoForm">
        <h1 className="text-gold mb-4 reveal-on-scroll">Orçamento Personalizado para Sua Cortina</h1>
        <p className="text-gold mb-4 reveal-on-scroll">Preencha o formulário e receba uma proposta exclusiva em minutos</p>
        <QuoteForm onSuccess={() => setShowModal(true)} />
      </section>

      {/* Diferenciais */}
      <section className="container-elegant py-5">
        <h2 className="text-center text-gold mb-5 reveal-on-scroll">Por que escolher a Cortinas Bresser?</h2>
        <div className="grid-3">
          <div className="card-elegant hover-lift animate-fade-in-left delay-200">
            <div className="text-gold spacing-sm" style={{ fontSize: '3rem' }}>
              <i className="bi bi-scissors"></i>
            </div>
            <h3 className="text-xl text-gold spacing-sm">Confecção Própria</h3>
            <p className="text-muted">
              Controle total de qualidade em cada etapa da produção, garantindo acabamento perfeito.
            </p>
          </div>

          <div className="card-elegant hover-lift animate-fade-in-up delay-300">
            <div className="text-gold spacing-sm" style={{ fontSize: '3rem' }}>
              <i className="bi bi-clock-history"></i>
            </div>
            <h3 className="text-xl text-gold spacing-sm">Entrega Rápida</h3>
            <p className="text-muted">
              Compromisso com prazos e agilidade na instalação para sua total satisfação.
            </p>
          </div>

          <div className="card-elegant hover-lift animate-fade-in-right delay-400">
            <div className="text-gold spacing-sm" style={{ fontSize: '3rem' }}>
              <i className="bi bi-gem"></i>
            </div>
            <h3 className="text-xl text-gold spacing-sm">Materiais Premium</h3>
            <p className="text-muted">
              Tecidos e componentes de alta qualidade para durabilidade e beleza.
            </p>
          </div>
        </div>
      </section>

      {/* Localização e Contato */}
      <section className="maps-section py-5">
        <div className="container-elegant">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card-elegant p-0 overflow-hidden" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.584626736663!2d-46.60998692376327!3d-23.54743946107603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59399b18637f%3A0x637764343334658a!2sR.%20Bresser%2C%201388%20-%20Br%C3%A1s%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003017-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2 className="text-gold mb-4">Visite Nosso Showroom</h2>
              <div className="mb-4">
                <div className="d-flex align-items-start mb-3">
                  <i className="bi bi-geo-alt-fill text-gold fs-4 me-3"></i>
                  <div>
                    <h5 className="mb-1">Endereço</h5>
                    <p className="mb-0">Rua Bresser, 1388 - Brás</p>
                    <p className="mb-0">São Paulo - SP, 03017-000</p>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-3">
                  <i className="bi bi-telephone-fill text-gold fs-4 me-3"></i>
                  <div>
                    <h5 className="mb-1">Contato</h5>
                    <p className="mb-0"><strong>Telefone:</strong> (11) 2692-5666</p>
                    <p className="mb-0"><strong>WhatsApp:</strong> (11) 99401-3938</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <i className="bi bi-clock-fill text-gold fs-4 me-3"></i>
                  <div>
                    <h5 className="mb-1">Horário de Atendimento</h5>
                    <p className="mb-0">Segunda a Sexta: 09:00 - 18:00</p>
                    <p className="mb-0">Sábado: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Rua+Bresser,+1388+-+Brás,+São+Paulo+-+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <i className="bi bi-map me-2"></i>
                Como Chegar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white pt-5 pb-3">
        <div className="footer-elegant">
          <div className="container-elegant">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 text-center">
                {/* Logo */}
                <div className="footer-logo-wrapper mb-4">
                  <Image
                    src="/assets/cortinasbresser.svg"
                    alt="Cortinas Bresser"
                    width={120}
                    height={48}
                    className="footer-logo"
                  />
                </div>

                {/* Badges */}
                <div className="flex-center gap-3 mb-4" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                  <span className="badge-elegant">
                    <i className="bi bi-gem me-2"></i>
                    Qualidade Premium
                  </span>
                  <span className="badge-elegant">
                    <i className="bi bi-star-fill me-2"></i>
                    +20 Anos
                  </span>
                  <span className="badge-elegant">
                    <i className="bi bi-palette-fill me-2"></i>
                    Design Exclusivo
                  </span>
                </div>
                <div className="divider-elegant my-4"></div>

                {/* Redes Sociais */}
                <div className="flex-center gap-4 mb-4" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
                  <a
                    href="https://www.instagram.com/cortinasbresser/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Instagram"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61577555679690"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href="https://wa.me/5511994013938"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="WhatsApp"
                  >
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </div>

                {/* CTA Removido */}
                {/* <div className="mb-4">
                  <a href="#orcamentoForm" className="btn-gold">
                    <i className="bi bi-calculator me-2"></i>
                    Solicitar Orçamento
                  </a>
                </div> */}

                {/* Copyright */}
                <div className="footer-copyright">
                  <p className="mb-2 text-muted">
                    © 2025 <strong className="text-gold">Cortinas Bresser</strong>
                  </p>
                  <p className="mb-0 small text-muted">
                    Elegância e sofisticação em cortinas sob medida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/5511994013938"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="card-elegant" style={{ padding: '2rem' }}>
              <div className="text-center">
                <div className="text-gold" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <h4 className="text-gold mb-3">Orçamento Recebido!</h4>
                <p className="mb-2">Seus dados foram <strong>recebidos com sucesso</strong>.</p>
                <p className="mb-3">Em breve entraremos em contato para confirmar as medidas e fornecer o orçamento.</p>
                <button className="btn-gold" onClick={() => setShowModal(false)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}