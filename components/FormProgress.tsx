'use client';

import { useEffect, useState } from 'react';

interface FormProgressProps {
    formData: {
        nome: string;
        telefone: string;
        parede: string;
        altura_parede: string;
        tecido: string;
        instalacao: string;
        observacoes?: string;
        endereco?: string;
    };
}

export default function FormProgress({ formData }: FormProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Campos obrigatórios
        const requiredFields = ['nome', 'telefone', 'parede', 'altura_parede', 'tecido', 'instalacao'];
        const filledRequired = requiredFields.filter(field => formData[field as keyof typeof formData]).length;
        const requiredProgress = (filledRequired / requiredFields.length) * 80; // 80% para campos obrigatórios

        // Campos opcionais (20% extra)
        const optionalFields = ['observacoes', 'endereco'];
        const filledOptional = optionalFields.filter(field => formData[field as keyof typeof formData]).length;
        const optionalProgress = (filledOptional / optionalFields.length) * 20;

        const totalProgress = Math.round(requiredProgress + optionalProgress);
        setProgress(totalProgress);
    }, [formData]);

    return (
        <div className="form-progress-container spacing-md">
            <div className="form-progress">
                <div
                    className="form-progress-bar"
                    style={{ width: `${progress}%` }}
                >
                    <span className="progress-glow"></span>
                </div>
            </div>
            <div className="flex-between" style={{ marginTop: '0.5rem' }}>
                <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                    {progress < 80 ? (
                        <>
                            <i className="bi bi-pencil-fill me-2"></i>
                            Preencha os campos obrigatórios
                        </>
                    ) : progress < 100 ? (
                        <>
                            <i className="bi bi-check-circle me-2"></i>
                            Quase lá! Campos opcionais restantes
                        </>
                    ) : (
                        <>
                            <i className="bi bi-check-circle-fill me-2 text-gold"></i>
                            <span className="text-gold">Formulário completo!</span>
                        </>
                    )}
                </p>
                <p className="text-gold" style={{ fontSize: '0.85rem', margin: 0, fontWeight: 600 }}>
                    {progress}%
                </p>
            </div>

            <style jsx>{`
        .form-progress-container {
          margin-bottom: 2rem;
          animation: fadeInBottom 0.6s ease;
        }
        
        .form-progress {
          height: 6px;
          background: rgba(139, 115, 85, 0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        
        .form-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--gold-dark), var(--gold-medium), var(--gold-light));
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 0 10px var(--gold-light);
        }
        
        .progress-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes fadeInBottom {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .flex-between {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .me-2 {
          margin-right: 0.5rem;
        }
      `}</style>
        </div>
    );
}
