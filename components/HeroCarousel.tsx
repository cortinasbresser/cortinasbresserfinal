'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: '/assets/hero/banner1.jpg',
    title: 'Cortinas Sob Medida',
    subtitle: 'Elegância e Sofisticação para Sua Sala',
    description: 'Transforme seu ambiente com cortinas premium de alta qualidade'
  },
  {
    image: '/assets/hero/banner2.jpg',
    title: 'Ambientes Aconchegantes',
    subtitle: 'Cortinas para Quartos e Dormitórios',
    description: 'Conforto e privacidade com design exclusivo'
  },
  {
    image: '/assets/hero/banner3.jpg',
    title: 'Design Contemporâneo',
    subtitle: 'Soluções Modernas em Decoração',
    description: 'Cortinas que combinam funcionalidade e estilo'
  },
  {
    image: '/assets/hero/banner4.jpg',
    title: 'Espaços Minimalistas',
    subtitle: 'Elegância em Cada Detalhe',
    description: 'Perfeitas para ambientes clean e sofisticados'
  },
  {
    image: '/assets/hero/banner5.jpg',
    title: 'Iluminação Perfeita',
    subtitle: 'Controle de Luz e Privacidade',
    description: 'Tecidos nobres com acabamento impecável'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  return (
    <section className="hero-carousel">
      {/* Slides */}
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
              quality={90}
            />
            <div className="hero-overlay"></div>
          </div>
        ))}
      </div>

      {/* Conteúdo Sobreposto */}
      <div className="hero-content">
        <div className="container-elegant">
          <div className="hero-text">
            <h1 className={`hero-title ${isAnimating ? 'animating' : ''}`}>
              {slides[currentSlide].title}
            </h1>
            <p className={`hero-subtitle ${isAnimating ? 'animating' : ''}`}>
              {slides[currentSlide].subtitle}
            </p>
            <p className={`hero-description ${isAnimating ? 'animating' : ''}`}>
              {slides[currentSlide].description}
            </p>
            <div className={`hero-cta ${isAnimating ? 'animating' : ''}`}>
              <a href="#orcamentoForm" className="hero-btn-primary">
                <i className="bi bi-calculator me-2"></i>
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        className="hero-control hero-prev"
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <button
        className="hero-control hero-next"
        onClick={nextSlide}
        aria-label="Próximo slide"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* Indicadores */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          background: #000;
        }

        .hero-slides {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: scale(1.1);
          transition: opacity 0.8s ease, transform 0.8s ease;
          z-index: 0;
        }

        .hero-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          text-align: center;
        }

        .hero-text {
          max-width: 800px;
          padding: 2rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          color: var(--gold-light);
          margin-bottom: 1rem;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
          animation: fadeInUp 0.8s ease;
        }

        .hero-title.animating {
          animation: fadeInUp 0.8s ease;
        }

        .hero-subtitle {
          font-size: clamp(1.25rem, 3vw, 2rem);
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 15px rgba(0, 0, 0, 0.8);
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        .hero-subtitle.animating {
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        .hero-description {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
          animation: fadeInUp 0.8s ease 0.4s both;
        }

        .hero-description.animating {
          animation: fadeInUp 0.8s ease 0.4s both;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease 0.6s both;
        }

        .hero-cta.animating {
          animation: fadeInUp 0.8s ease 0.6s both;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 2rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: #c9a961;
          background: transparent;
          border: 1.5px solid rgba(201, 169, 97, 0.6);
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .hero-btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(201, 169, 97, 0.3),
            transparent
          );
          transition: left 0.6s ease;
        }

        .hero-btn-primary:hover::before {
          left: 100%;
        }

        .hero-btn-primary::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            #c9a961,
            #d4af37,
            #c9a961,
            #8b7355
          );
          border-radius: 50px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
        }

        .hero-btn-primary:hover::after {
          opacity: 1;
        }

        .hero-btn-primary:hover {
          color: #ffffff;
          background: rgba(201, 169, 97, 0.15);
          border-color: rgba(201, 169, 97, 0.9);
          transform: translateY(-3px);
          box-shadow: 
            0 8px 25px rgba(201, 169, 97, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .hero-btn-primary:active {
          transform: translateY(-1px);
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(212, 175, 55, 0.5);
          color: var(--gold-light);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.5rem;
        }

        .hero-control:hover {
          background: rgba(212, 175, 55, 0.9);
          color: #000;
          transform: translateY(-50%) scale(1.1);
        }

        .hero-prev {
          left: 2rem;
        }

        .hero-next {
          right: 2rem;
        }

        .hero-indicators {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.75rem;
          z-index: 3;
        }

        .hero-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .hero-indicator:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }

        .hero-indicator.active {
          background: var(--gold-light);
          border-color: var(--gold-medium);
          transform: scale(1.3);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsivo */
        @media (max-width: 768px) {
          .hero-carousel {
            height: 400px;
          }

          .hero-text {
            padding: 1rem;
          }

          .hero-control {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }

          .hero-prev {
            left: 1rem;
          }

          .hero-next {
            right: 1rem;
          }

          .hero-cta {
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn-gold,
          .btn-outline {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 479px) {
          .hero-carousel {
            height: 300px;
          }

          .hero-indicators {
            bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
