'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  image: string;
}

const slides: Slide[] = [
  { image: '/assets/hero/banner1.jpg' },
  { image: '/assets/hero/banner2.jpg' },
  { image: '/assets/hero/banner3.jpg' },
  { image: '/assets/hero/banner4.jpg' },
  { image: '/assets/hero/banner5.jpg' }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <section className="hero-minimal">
      {/* Slides */}
      <div className="hero-slides-minimal">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide-minimal ${index === currentSlide ? 'active' : ''}`}
          >
            <Image
              src={slide.image}
              alt={`Cortinas Bresser - Imagem ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
              quality={95}
              className="hero-image-minimal"
            />
          </div>
        ))}
      </div>

      {/* Overlay sutil */}
      <div className="hero-overlay-minimal"></div>

      {/* Controles minimalistas */}
      <button
        className="hero-control-minimal hero-prev-minimal"
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        className="hero-control-minimal hero-next-minimal"
        onClick={nextSlide}
        aria-label="Próximo slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Indicadores minimalistas */}
      <div className="hero-indicators-minimal">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator-minimal ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .hero-minimal {
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 500px;
          max-height: 700px;
          overflow: hidden;
          background: #000;
        }

        .hero-slides-minimal {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .hero-slide-minimal {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .hero-slide-minimal.active {
          opacity: 1;
          z-index: 1;
        }

        .hero-image-minimal {
          filter: brightness(0.9) contrast(1.05) saturate(0.95);
        }

        .hero-overlay-minimal {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        .hero-control-minimal {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .hero-minimal:hover .hero-control-minimal {
          opacity: 1;
        }

        .hero-control-minimal:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 1);
          transform: translateY(-50%) scale(1.05);
        }

        .hero-prev-minimal {
          left: 2rem;
        }

        .hero-next-minimal {
          right: 2rem;
        }

        .hero-indicators-minimal {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 3;
        }

        .hero-indicator-minimal {
          width: 32px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          border-radius: 1px;
        }

        .hero-indicator-minimal:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .hero-indicator-minimal.active {
          background: rgba(255, 255, 255, 0.9);
          width: 48px;
        }

        /* Responsivo */
        @media (max-width: 1024px) {
          .hero-minimal {
            height: 60vh;
            min-height: 450px;
          }
        }

        @media (max-width: 768px) {
          .hero-minimal {
            height: 50vh;
            min-height: 400px;
          }

          .hero-control-minimal {
            width: 36px;
            height: 36px;
            opacity: 1;
          }

          .hero-prev-minimal {
            left: 1rem;
          }

          .hero-next-minimal {
            right: 1rem;
          }

          .hero-indicators-minimal {
            bottom: 1.5rem;
          }

          .hero-indicator-minimal {
            width: 24px;
          }

          .hero-indicator-minimal.active {
            width: 36px;
          }
        }

        @media (max-width: 480px) {
          .hero-minimal {
            height: 40vh;
            min-height: 300px;
          }

          .hero-indicators-minimal {
            bottom: 1rem;
            gap: 0.375rem;
          }

          .hero-indicator-minimal {
            width: 20px;
            height: 1.5px;
          }

          .hero-indicator-minimal.active {
            width: 32px;
          }
        }
      `}</style>
    </section>
  );
}
