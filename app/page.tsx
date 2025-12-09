'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import QuoteForm from '@/components/QuoteForm';
import WhatsAppChat from '@/components/WhatsAppChat';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

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
    <main className="min-h-screen bg-black text-white">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Logo - Reduzido em 50% (200 -> 100) */}
      <header className="text-center py-3" role="banner">
        <Image
          src="/assets/cortinasbresser.svg"
          alt="Cortinas Bresser - Especialistas em Cortinas Sob Medida"
          width={100}
          height={40}
          className="logo animate-fade-in-bottom mx-auto block"
        />
      </header>

      {/* Formulário */}
      <section className="container-elegant py-12 text-center" id="orcamentoForm">
        <h1 className="text-gold mb-4 reveal-on-scroll text-3xl md:text-4xl font-semibold">Descubra sua cortina!</h1>
        <p className="text-gold mb-8 reveal-on-scroll text-lg">Preencha o formulário e receba uma proposta exclusiva em minutos</p>
        <QuoteForm onSuccess={() => setShowModal(true)} />
      </section>

      {/* Diferenciais */}
      <section className="container-elegant py-16">
        <h2 className="text-center text-gold mb-12 reveal-on-scroll text-2xl md:text-3xl font-semibold">Por que escolher a Cortinas Bresser?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-justify md:text-center">
          <div className="card-elegant hover-lift animate-fade-in-left delay-200 p-8">
            <div className="text-gold mb-4 text-center" style={{ fontSize: '3rem' }}>
              <i className="bi bi-scissors"></i>
            </div>
            <h3 className="text-xl text-gold mb-4 font-medium text-center">Confecção Própria</h3>
            <p className="text-muted font-light">
              Controle total de qualidade em cada etapa da produção, garantindo acabamento perfeito.
            </p>
          </div>

          <div className="card-elegant hover-lift animate-fade-in-up delay-300 p-8">
            <div className="text-gold mb-4 text-center" style={{ fontSize: '3rem' }}>
              <i className="bi bi-clock-history"></i>
            </div>
            <h3 className="text-xl text-gold mb-4 font-medium text-center">Entrega Rápida</h3>
            <p className="text-muted font-light">
              Compromisso com prazos e agilidade para sua total satisfação.
            </p>
          </div>

          <div className="card-elegant hover-lift animate-fade-in-right delay-400 p-8">
            <div className="text-gold mb-4 text-center" style={{ fontSize: '3rem' }}>
              <i className="bi bi-gem"></i>
            </div>
            <h3 className="text-xl text-gold mb-4 font-medium text-center">Materiais Premium</h3>
            <p className="text-muted font-light">
              Tecidos e componentes de alta qualidade para durabilidade e beleza.
            </p>
          </div>
        </div>
      </section>

      {/* Localização e Contato */}
      <section className="py-16 bg-gradient-to-br from-[#f5f0e8] to-[#e6dcc8] border-y border-[#8b7355]/20">
        <div className="container-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mapa */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-[#8b7355]/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8008784723734!2d-46.61059012467059!3d-23.539663178814713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5920ad7e2385%3A0xf691ca24cd35848b!2sCortinas%20Bresser!5e0!3m2!1spt-BR!2sbr!4v1763942963357!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Informações */}
            <div className="text-[#1a1a1a]">
              <h2 className="text-[#1a1a1a] mb-8 text-3xl font-semibold">Visite nossa loja</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <i className="bi bi-geo-alt-fill text-[#c9a961] text-2xl mr-4 mt-1"></i>
                  <div>
                    <h5 className="text-xl font-medium mb-1 text-[#1a1a1a]">Endereço</h5>
                    <p className="mb-0 text-[#1a1a1a]">Rua Bresser, 1084 - Brás</p>
                    <p className="mb-0 text-[#1a1a1a]">São Paulo - SP, 03053-000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="bi bi-telephone-fill text-[#c9a961] text-2xl mr-4 mt-1"></i>
                  <div>
                    <h5 className="text-xl font-medium mb-1 text-[#1a1a1a]">Contato</h5>
                    <p className="mb-0 text-[#1a1a1a]"><strong>Telefone:</strong> (11) 2692-7865</p>
                    <p className="mb-0 text-[#1a1a1a]"><strong>WhatsApp:</strong> (11) 95661-6041</p>
                    <p className="mb-0 text-[#1a1a1a]"><strong>WhatsApp:</strong> (11) 99401-3938</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="bi bi-clock-fill text-[#c9a961] text-2xl mr-4 mt-1"></i>
                  <div>
                    <h5 className="text-xl font-medium mb-1 text-[#1a1a1a]">Horário de Atendimento</h5>
                    <p className="mb-0 text-[#1a1a1a]">Segunda a Sexta: 08:00 - 17:00</p>
                    <p className="mb-0 text-[#1a1a1a]">Sábado: 09:00 - 15:30</p>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/KLNdV7r5LaXRRdpY6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center"
              >
                <i className="bi bi-map mr-2"></i>
                Como Chegar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-[#8b7355]/20">
        <div className="container-elegant">
          <div className="flex flex-col items-center text-center">
            {/* Logo - Reduzido em 30% (120 -> 84) */}
            <div className="mb-8">
              <Image
                src="/assets/cortinasbresser.svg"
                alt="Cortinas Bresser"
                width={84}
                height={34}
                className="mx-auto"
              />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="badge-elegant">
                <i className="bi bi-gem mr-2"></i>
                Qualidade Premium
              </span>
              <span className="badge-elegant">
                <i className="bi bi-star-fill mr-2"></i>
                +20 Anos
              </span>
              <span className="badge-elegant">
                <i className="bi bi-palette-fill mr-2"></i>
                Design Exclusivo
              </span>
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4b56f] to-transparent opacity-30 my-8"></div>

            {/* Redes Sociais - Apenas Instagram e Facebook */}
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://www.instagram.com/cortinasbresser/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#8b7355] to-[#d4b56f] text-white text-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577555679690"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#8b7355] to-[#d4b56f] text-white text-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="mb-2 text-gray-400">
                © 2025 <strong className="text-gold">Cortinas Bresser</strong>
              </p>
              <p className="mb-2 text-sm text-gray-500">
                Elegância e sofisticação em cortinas sob medida
              </p>
              <p className="mb-0 text-sm">
                <a
                  href="/privacidade"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 underline"
                >
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Chat Widget */}
      <WhatsAppChat
        phoneNumber="5511994013938"
        agentName="Atendimento Cortinas Bresser"
        welcomeMessage="Olá! 👋&#10;&#10;Sou da equipe Cortinas Bresser. Como posso ajudá-lo hoje?"
        position="right"
      />

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-gold mb-4" style={{ fontSize: '4rem' }}>
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h4 className="text-gold text-2xl mb-4 font-semibold">Orçamento Enviado!</h4>
              <p className="mb-2 text-white">Seus dados foram recebidos com sucesso.</p>
              <p className="mb-6 text-gray-300">Você será redirecionado para o WhatsApp para finalizar seu atendimento com um de nossos especialistas.</p>
              <button className="btn-gold w-full" onClick={() => setShowModal(false)}>Entendi</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}