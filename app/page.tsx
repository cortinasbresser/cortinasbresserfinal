'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    parede: '',
    altura_parede: '',
    tecido: '',
    instalacao: '',
    observacoes: '',
    endereco: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // ===== ANIMAÇÃO DO LOGO =====
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('mouseenter', function (this: HTMLElement) {
        this.style.filter = 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))';
        this.style.transform = 'scale(1.05) rotate(2deg)';
      });

      logo.addEventListener('mouseleave', function (this: HTMLElement) {
        this.style.filter = '';
        this.style.transform = 'scale(1) rotate(0deg)';
      });
    }

    // ===== EFEITO RIPPLE NOS BOTÕES =====
    const buttons = document.querySelectorAll('.btn-gold');
    buttons.forEach(button => {
      button.addEventListener('click', function (this: HTMLElement, e: MouseEvent) {
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

    // ===== PARALLAX SUAVE NO HERO =====
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroImage = document.querySelector('.carousel-full img') as HTMLElement;
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    // ===== CURSOR DOURADO PERSONALIZADO =====
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dourado';
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
      }, 50);
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Aumentar cursor em elementos clicáveis
    const clickables = document.querySelectorAll('a, button, input, select, textarea');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
      });

      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
      });
    });

    // ===== ANIMAÇÃO DE DIGITAÇÃO NOS PLACEHOLDERS =====
    const inputsComPlaceholder = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    const typingIntervals = new Map<Element, NodeJS.Timeout>();

    inputsComPlaceholder.forEach(input => {
      const placeholderOriginal = input.getAttribute('placeholder') || '';

      input.addEventListener('focus', function (this: HTMLInputElement) {
        // Cancelar qualquer animação anterior
        const existingInterval = typingIntervals.get(this);
        if (existingInterval) {
          clearInterval(existingInterval);
        }

        // Limpar placeholder completamente
        this.setAttribute('placeholder', '');
        let index = 0;

        const typingInterval = setInterval(() => {
          if (index < placeholderOriginal.length) {
            // Construir placeholder do zero a cada iteração
            const currentText = placeholderOriginal.substring(0, index + 1);
            this.setAttribute('placeholder', currentText);
            index++;
          } else {
            clearInterval(typingInterval);
            typingIntervals.delete(this);
          }
        }, 50);

        typingIntervals.set(this, typingInterval);
      });

      input.addEventListener('blur', function (this: HTMLInputElement) {
        // Cancelar animação ao perder foco
        const existingInterval = typingIntervals.get(this);
        if (existingInterval) {
          clearInterval(existingInterval);
          typingIntervals.delete(this);
        }
        // Restaurar placeholder original
        this.setAttribute('placeholder', placeholderOriginal);
      });
    });

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      cursor.remove();
      cursorTrail.remove();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validação em tempo real
    const element = e.target as HTMLInputElement;

    // Remover classes anteriores
    element.classList.remove('is-valid', 'is-invalid');

    // Validar telefone
    if (name === 'telefone' && value) {
      if (validarTelefone(value)) {
        element.classList.add('is-valid');
      } else if (value.length > 5) {
        element.classList.add('is-invalid');
      }
    }

    // Validar outros campos obrigatórios
    if (element.required && value) {
      if (element.checkValidity()) {
        element.classList.add('is-valid');
      } else {
        element.classList.add('is-invalid');
      }
    }
  };

  const validarTelefone = (telefone: string) => {
    const numeroLimpo = telefone.replace(/\D/g, '');
    return numeroLimpo.length >= 10 && numeroLimpo.length <= 11;
  };

  const gerarMensagemWhatsApp = () => {
    let mensagem = `*SOLICITAÇÃO DE ORÇAMENTO*%0A*Cortinas Bresser*%0A%0A`;

    mensagem += `*Dados do Cliente:*%0A`;
    mensagem += `Nome: ${formData.nome}%0A`;
    mensagem += `Telefone: ${formData.telefone}%0A%0A`;

    mensagem += `*Medidas Solicitadas:*%0A`;
    mensagem += `Parede: ${formData.parede}m (largura) x ${formData.altura_parede}m (altura)%0A%0A`;

    mensagem += `*Especificações:*%0A`;
    mensagem += `Tecido: ${formData.tecido}%0A`;
    mensagem += `Instalação: ${formData.instalacao}%0A%0A`;

    if (formData.endereco && formData.endereco.trim() !== '') {
      mensagem += `*Endereço para Instalação:*%0A`;
      mensagem += `${formData.endereco}%0A%0A`;
    }

    if (formData.observacoes && formData.observacoes.trim() !== '') {
      mensagem += `*Observações:*%0A`;
      mensagem += `${formData.observacoes}%0A%0A`;
    }

    mensagem += `_Enviado via site Cortinas Bresser_`;

    return mensagem;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    if (!formData.nome || !formData.telefone || !formData.parede || !formData.altura_parede || !formData.tecido || !formData.instalacao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!validarTelefone(formData.telefone)) {
      alert('Por favor, informe um número de telefone válido com DDD.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar para API route (vamos criar depois)
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Gerar mensagem WhatsApp
      const mensagemWhatsApp = gerarMensagemWhatsApp();
      const numeroWhatsApp = '5511994013938';
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemWhatsApp}`;

      // Abrir WhatsApp
      window.open(urlWhatsApp, '_blank');

      // Mostrar modal de confirmação
      setShowModal(true);

      // Resetar formulário
      setFormData({
        nome: '',
        telefone: '',
        parede: '',
        altura_parede: '',
        tecido: '',
        instalacao: '',
        observacoes: '',
        endereco: ''
      });

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Carousel Elaborado */}
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
        <h1 className="text-gold mb-4 reveal-on-scroll">
          Orçamento Personalizado para Sua Cortina
        </h1>
        <p className="text-gold mb-4 reveal-on-scroll">
          Preencha o formulário e receba uma proposta exclusiva em minutos
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto text-start card-elegant p-4"
          style={{ maxWidth: '600px' }}
        >
          {/* Nome */}
          <div className="mb-3">
            <label htmlFor="nome" className="form-label-elegant">
              Qual seu nome? *
            </label>
            <input
              type="text"
              className="form-control-elegant"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite seu primeiro nome"
              required
              minLength={2}
              maxLength={50}
            />
          </div>

          {/* Telefone */}
          <div className="mb-3">
            <label htmlFor="telefone" className="form-label-elegant">
              Telefone / WhatsApp *
            </label>
            <input
              type="tel"
              className="form-control-elegant"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          {/* Medidas */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="parede" className="form-label-elegant">
                Largura da parede (m) *
              </label>
              <input
                type="number"
                className="form-control-elegant"
                id="parede"
                name="parede"
                value={formData.parede}
                onChange={handleInputChange}
                step="0.01"
                min="0.5"
                max="10"
                placeholder="Ex: 3.20"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="altura_parede" className="form-label-elegant">
                Altura da parede (m) *
              </label>
              <input
                type="number"
                className="form-control-elegant"
                id="altura_parede"
                name="altura_parede"
                value={formData.altura_parede}
                onChange={handleInputChange}
                step="0.01"
                min="1.5"
                max="5"
                placeholder="Ex: 2.60"
                required
              />
            </div>
          </div>

          {/* Tecido */}
          <div className="mb-3">
            <label htmlFor="tecido" className="form-label-elegant">
              Tipo de tecido *
            </label>
            <select
              className="form-control-elegant"
              id="tecido"
              name="tecido"
              value={formData.tecido}
              onChange={handleInputChange}
              required
              style={{ cursor: 'pointer' }}
            >
              <option value="">Selecione...</option>
              <option value="Voil">Voil</option>
              <option value="Linho">Linho (Variedades)</option>
              <option value="Blackout">Blackout</option>
              <option value="Seda">Seda</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          {/* Instalação */}
          <div className="mb-3">
            <label htmlFor="instalacao" className="form-label-elegant">
              Tipo de instalação *
            </label>
            <select
              className="form-control-elegant"
              id="instalacao"
              name="instalacao"
              value={formData.instalacao}
              onChange={handleInputChange}
              required
              style={{ cursor: 'pointer' }}
            >
              <option value="">Selecione...</option>
              <option value="Trilho">Trilho</option>
              <option value="Varão">Varão</option>
              <option value="Não sei">Não sei - Preciso de ajuda</option>
            </select>
          </div>

          {/* Observações */}
          <div className="mb-3">
            <label htmlFor="observacoes" className="form-label-elegant">
              Observações adicionais
            </label>
            <textarea
              className="form-control-elegant"
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              rows={2}
              placeholder="Cor preferida, tipo de ambiente, etc."
              maxLength={500}
            />
          </div>

          {/* Endereço */}
          <div className="mb-3">
            <label htmlFor="endereco" className="form-label-elegant">
              Endereço para instalação (opcional)
            </label>
            <textarea
              className="form-control-elegant"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              rows={2}
              placeholder="Rua, número, bairro, cidade..."
              maxLength={300}
            />
          </div>

          {/* Botão Submit */}
          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn-gold hover-shine"
              disabled={isSubmitting}
              style={{ width: '100%', padding: '1rem' }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="bi bi-stars me-2"></i>
                  Solicitar Orçamento
                </>
              )}
            </button>
          </div>
        </form>
      </section>



      {/* Seção de Localização */}
      <section className="location-section section-elegant">
        <div className="container-elegant">
          <div className="text-center spacing-xl">
            <h2 className="text-3xl text-gold spacing-sm">
              <i className="bi bi-geo-alt-fill me-3"></i>
              Nossa Localização
            </h2>
            <div className="divider-elegant"></div>
            <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Visite nossa loja no coração do Brás e conheça nossa coleção completa de cortinas
            </p>
          </div>

          <div className="row spacing-xl" style={{ alignItems: 'stretch' }}>
            {/* Mapa */}
            <div className="col-12 col-md-6 mb-4">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8!2d-46.6107!3d-23.5396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzIyLjciUyA0NsKwMzYnMzguNSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Cortinas Bresser"
                ></iframe>
              </div>
            </div>

            {/* Cards de Informação */}
            <div className="col-12 col-md-6">
              <div className="location-cards">
                {/* Card Endereço */}
                <div className="location-card">
                  <div className="location-card-icon">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div className="location-card-content">
                    <h5>Endereço</h5>
                    <p>Rua Bresser, 1084<br />Brás, São Paulo - SP<br />CEP: 03053-000</p>
                  </div>
                </div>

                {/* Card Horário */}
                <div className="location-card">
                  <div className="location-card-icon">
                    <i className="bi bi-clock-fill"></i>
                  </div>
                  <div className="location-card-content">
                    <h5>Horário de Funcionamento</h5>
                    <p>
                      <strong>Segunda a Sexta:</strong> 08:00 - 17:00<br />
                      <strong>Sábado:</strong> 09:00 - 16:00<br />
                      <strong>Domingo:</strong> Fechado
                    </p>
                  </div>
                </div>

                {/* Card Contato */}
                <div className="location-card">
                  <div className="location-card-icon">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div className="location-card-content">
                    <h5>Contato</h5>
                    <p>
                      <strong>Telefone:</strong> (11) 2692-7865<br />
                      <strong>WhatsApp:</strong> (11) 99401-3938<br />
                      <strong>WhatsApp:</strong> (11) 95661-6041
                    </p>
                  </div>
                </div>

                {/* Card Como Chegar */}
                <div className="location-card">
                  <div className="location-card-icon">
                    <i className="bi bi-signpost-fill"></i>
                  </div>
                  <div className="location-card-content">
                    <h5>Como Chegar</h5>
                    <p>
                      <strong>Metrô:</strong> Estação Bresser (Linha 3-Vermelha)<br />
                      <strong>Ônibus:</strong> Diversas linhas<br />
                      <strong>Carro:</strong> Estacionamento próximo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-professional" role="contentinfo">
        <div className="grid-elegant spacing-xl">
          <div className="card-elegant hover-lift animate-fade-in-left delay-200">
            <div className="text-gold spacing-sm" style={{ fontSize: '3rem' }}>
              <i className="bi bi-bullseye"></i>
            </div>
            <h3 className="text-xl text-gold spacing-sm">Atendimento Personalizado</h3>
            <p className="text-muted">
              Consultoria especializada para encontrar a solução perfeita para seu ambiente.
            </p>
          </div>

          <div className="card-elegant hover-lift animate-fade-in-bottom delay-300">
            <div className="text-gold spacing-sm" style={{ fontSize: '3rem' }}>
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
            <h3 className="text-xl text-gold spacing-sm">Instalação Rápida</h3>
            <p className="text-muted">
              Equipe profissional e ágil para instalação sem complicações.
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

                {/* CTA */}
                <div className="mb-4">
                  <a href="#orcamentoForm" className="btn-gold">
                    <i className="bi bi-calculator me-2"></i>
                    Solicitar Orçamento
                  </a>
                </div>

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
        href="https://wa.me/5511994013938?text=Olá! Gostaria de solicitar um orçamento de cortinas."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        title="Fale conosco no WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Modal de Confirmação */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.8)'
          }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="card-elegant" style={{ padding: '2rem' }}>
              <div className="text-center">
                <div className="text-gold" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <h4 className="text-gold mb-3">Orçamento Recebido!</h4>
                <p className="mb-2">Seus dados foram <strong>recebidos com sucesso</strong>.</p>
                <p className="mb-3">Em breve entraremos em contato para confirmar as medidas e fornecer o orçamento.</p>

                <div className="alert" style={{
                  background: 'rgba(139, 115, 85, 0.1)',
                  border: '1px solid var(--gold-medium)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '1.5rem'
                }}>
                  <small>
                    <i className="bi bi-whatsapp me-2"></i>
                    <strong>WhatsApp aberto!</strong> Já abrimos o WhatsApp para você.<br />
                    Você pode fechar esta janela quando quiser.
                  </small>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="btn-gold mt-4"
                  style={{ width: '100%' }}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -0.75rem;
        }
        .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
          padding: 0 0.75rem;
        }
        .col-12 {
          flex: 0 0 100%;
          max-width: 100%;
          padding: 0 0.75rem;
        }
        .col-md-4 {
          flex: 0 0 33.333%;
          max-width: 33.333%;
          padding: 0 0.75rem;
        }
        .col-lg-8 {
          flex: 0 0 66.666%;
          max-width: 66.666%;
          padding: 0 0.75rem;
        }
        .col-lg-10 {
          flex: 0 0 83.333%;
          max-width: 83.333%;
          padding: 0 0.75rem;
        }
        .col-md-10 {
          flex: 0 0 83.333%;
          max-width: 83.333%;
          padding: 0 0.75rem;
        }
        .d-grid {
          display: grid;
        }
        .h-100 {
          height: 100%;
        }
        .g-4 {
          gap: 1.5rem;
        }
        .fw-semibold {
          font-weight: 600;
        }
        .small {
          font-size: 0.875rem;
        }
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .reveal-on-scroll.active {
          opacity: 1;
          transform: translateY(0);
        }
        .maps-section {
          background: linear-gradient(135deg, var(--cream-light), var(--beige-soft));
          border-top: 1px solid rgba(139, 115, 85, 0.2);
          border-bottom: 1px solid rgba(139, 115, 85, 0.2);
        }
        .maps-section h5,
        .maps-section p,
        .maps-section strong {
          color: #1a1a1a !important;
        }
        .maps-section .text-gold {
          color: #1a1a1a !important;
          font-weight: 600;
        }
        .social-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.5rem;
          transition: var(--transition-smooth);
          text-decoration: none;
          background: linear-gradient(135deg, var(--gold-dark), var(--gold-medium));
          box-shadow: var(--shadow-subtle);
        }
        .social-btn:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: var(--shadow-strong);
        }
        @media (max-width: 768px) {
          .col-md-6, .col-md-4, .col-md-10 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .col-lg-8, .col-lg-10 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}