'use client';

import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import QuoteFormMinimal from '@/components/QuoteFormMinimal';

export default function Home() {
  return (
    <main style={{ background: '#ffffff' }}>
      {/* Hero Carousel Minimalista */}
      <HeroCarousel />

      {/* Logo */}
      <section className="section-minimal-sm">
        <div className="container-minimal center-content">
          <Image
            src="/assets/cortinasbresser.svg"
            alt="Cortinas Bresser"
            width={180}
            height={72}
            style={{ opacity: 0.9 }}
            priority
          />
        </div>
      </section>

      {/* Introdução */}
      <section className="section-minimal-sm" style={{ background: 'var(--color-bg-subtle)' }}>
        <div className="container-narrow center-content">
          <h1 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-light)',
            marginBottom: 'var(--space-md)',
            color: 'var(--color-text)'
          }}>
            Cortinas Sob Medida
          </h1>
          <div className="divider-minimal"></div>
          <p className="text-delicate" style={{
            maxWidth: '600px',
            lineHeight: '1.8',
            textAlign: 'center'
          }}>
            Transforme seus ambientes com elegância e sofisticação.
            Oferecemos cortinas personalizadas com tecidos premium,
            instalação profissional e acabamento impecável.
          </p>
        </div>
      </section>

      {/* Formulário de Orçamento */}
      <QuoteFormMinimal />

      {/* Diferenciais */}
      <section className="section-minimal" style={{ background: 'var(--color-bg-subtle)' }}>
        <div className="container-minimal">
          <div className="center-content" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-light)',
              marginBottom: 'var(--space-sm)'
            }}>
              Por Que Escolher a Bresser
            </h2>
            <div className="divider-minimal"></div>
          </div>

          <div className="grid-minimal grid-minimal-3">
            <div className="card-minimal center-content">
              <div style={{
                fontSize: '2rem',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-md)'
              }}>
                ◆
              </div>
              <h3 style={{
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--font-medium)',
                marginBottom: 'var(--space-sm)'
              }}>
                Atendimento Personalizado
              </h3>
              <p className="text-delicate" style={{ textAlign: 'center' }}>
                Consultoria especializada para encontrar a solução perfeita para seu ambiente
              </p>
            </div>

            <div className="card-minimal center-content">
              <div style={{
                fontSize: '2rem',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-md)'
              }}>
                ◆
              </div>
              <h3 style={{
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--font-medium)',
                marginBottom: 'var(--space-sm)'
              }}>
                Instalação Profissional
              </h3>
              <p className="text-delicate" style={{ textAlign: 'center' }}>
                Equipe qualificada e ágil para instalação sem complicações
              </p>
            </div>

            <div className="card-minimal center-content">
              <div style={{
                fontSize: '2rem',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-md)'
              }}>
                ◆
              </div>
              <h3 style={{
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--font-medium)',
                marginBottom: 'var(--space-sm)'
              }}>
                Materiais Premium
              </h3>
              <p className="text-delicate" style={{ textAlign: 'center' }}>
                Tecidos e componentes de alta qualidade para durabilidade e beleza
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="section-minimal">
        <div className="container-minimal">
          <div className="center-content" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-light)',
              marginBottom: 'var(--space-sm)'
            }}>
              Nossa Localização
            </h2>
            <div className="divider-minimal"></div>
            <p className="text-delicate" style={{ maxWidth: '500px', textAlign: 'center' }}>
              Visite nossa loja no coração do Brás
            </p>
          </div>

          <div className="grid-minimal grid-minimal-2" style={{ alignItems: 'start' }}>
            {/* Mapa */}
            <div style={{
              width: '100%',
              height: '400px',
              border: '1px solid var(--color-border)',
              overflow: 'hidden'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8!2d-46.6107!3d-23.5396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzIyLjciUyA0NsKwMzYnMzguNSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Cortinas Bresser"
              ></iframe>
            </div>

            {/* Informações */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div>
                <h3 className="label-minimal" style={{ marginBottom: 'var(--space-xs)' }}>
                  Endereço
                </h3>
                <p className="text-delicate">
                  Rua Bresser, 1084<br />
                  Brás, São Paulo - SP<br />
                  CEP: 03053-000
                </p>
              </div>

              <div>
                <h3 className="label-minimal" style={{ marginBottom: 'var(--space-xs)' }}>
                  Horário de Funcionamento
                </h3>
                <p className="text-delicate">
                  Segunda a Sexta: 08:00 - 17:00<br />
                  Sábado: 09:00 - 16:00<br />
                  Domingo: Fechado
                </p>
              </div>

              <div>
                <h3 className="label-minimal" style={{ marginBottom: 'var(--space-xs)' }}>
                  Contato
                </h3>
                <p className="text-delicate">
                  Telefone: (11) 2692-7865<br />
                  WhatsApp: (11) 99401-3938<br />
                  WhatsApp: (11) 95661-6041
                </p>
              </div>

              <div>
                <h3 className="label-minimal" style={{ marginBottom: 'var(--space-xs)' }}>
                  Como Chegar
                </h3>
                <p className="text-delicate">
                  Metrô: Estação Bresser (Linha 3-Vermelha)<br />
                  Ônibus: Diversas linhas<br />
                  Carro: Estacionamento próximo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-xl) 0'
      }}>
        <div className="container-minimal center-content">
          <Image
            src="/assets/cortinasbresser.svg"
            alt="Cortinas Bresser"
            width={140}
            height={56}
            style={{ opacity: 0.7, marginBottom: 'var(--space-md)' }}
          />

          <div style={{
            display: 'flex',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-md)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <a
              href="https://www.instagram.com/cortinasbresser/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-delicate"
              style={{
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
            >
              Instagram
            </a>
            <span className="text-delicate">·</span>
            <a
              href="https://www.facebook.com/profile.php?id=61577555679690"
              target="_blank"
              rel="noopener noreferrer"
              className="text-delicate"
              style={{
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
            >
              Facebook
            </a>
            <span className="text-delicate">·</span>
            <a
              href="https://wa.me/5511994013938"
              target="_blank"
              rel="noopener noreferrer"
              className="text-delicate"
              style={{
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
            >
              WhatsApp
            </a>
          </div>

          <div className="divider-minimal" style={{ opacity: 0.3 }}></div>

          <p className="text-delicate" style={{ marginTop: 'var(--space-md)', fontSize: 'var(--text-xs)' }}>
            © 2025 Cortinas Bresser. Elegância e sofisticação em cortinas sob medida.
          </p>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/5511994013938?text=Olá! Gostaria de solicitar um orçamento de cortinas."
        target="_blank"
        rel="noopener noreferrer"
        title="Fale conosco no WhatsApp"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          textDecoration: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      <style jsx>{`
        a:hover {
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .grid-minimal-2,
          .grid-minimal-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}