import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { trackFormSubmission, trackFormStart, trackFormError, trackWhatsAppClick } from '@/lib/tracking';

// Schema de validação usando Zod
const schema = z.object({
    nome: z.string().min(2, 'Nome muito curto').max(50),
    telefone: z.string().regex(/^[0-9\s()+-]{10,15}$/, 'Telefone inválido'),
    parede: z.string().min(1, 'Largura obrigatória'),
    altura_parede: z.string().min(1, 'Altura obrigatória'),
    tecido: z.enum(['Voil', 'Linho', 'Blackout', 'Outros']),
    instalacao: z.enum(['Trilho', 'Varão', 'Não sei']),
    observacoes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface QuoteFormProps {
    onSuccess: () => void;
}

export default function QuoteForm({ onSuccess }: QuoteFormProps) {
    const [formStarted, setFormStarted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const gerarMensagemWhatsApp = (data: FormData) => {
        let mensagem = `*SOLICITAÇÃO DE ORÇAMENTO*%0A*Cortinas Bresser*%0A%0A`;
        mensagem += `*Dados do Cliente:*%0A`;
        mensagem += `Nome: ${data.nome}%0A`;
        mensagem += `Telefone: ${data.telefone}%0A%0A`;
        mensagem += `*Medidas Solicitadas:*%0A`;
        mensagem += `Parede: ${data.parede}m (largura) x ${data.altura_parede}m (altura)%0A%0A`;
        mensagem += `*Especificações:*%0A`;
        mensagem += `Tecido: ${data.tecido}%0A`;
        mensagem += `Instalação: ${data.instalacao}%0A%0A`;
        if (data.observacoes) mensagem += `*Observações:*%0A${data.observacoes}%0A%0A`;
        mensagem += `_Enviado via site Cortinas Bresser_`;
        return mensagem;
    };

    const onSubmit = async (data: FormData) => {
        let emailSuccess = false;
        try {
            console.log('Iniciando envio do formulário...', data);

            // Envia para API (email)
            const response = await fetch('/api/send-quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log('Resposta da API:', result);

            if (!result.success) {
                throw new Error(result.error || 'Falha desconhecida ao enviar e-mail');
            }

            emailSuccess = true;

            // 🎯 RASTREAMENTO: Conversão bem-sucedida
            trackFormSubmission({
                nome: data.nome,
                telefone: data.telefone,
                tecido: data.tecido
            });

            // Notifica sucesso (o modal será aberto pelo pai via onSuccess)
            onSuccess();
            reset();
            setFormStarted(false);

        } catch (err: any) {
            console.error('Erro detalhado no envio:', err);
            let errorMsg = err.message || 'Erro de conexão';
            if (errorMsg.includes('JSON')) errorMsg = 'Erro ao processar resposta do servidor (provável erro 500 ou 404).';

            // 🎯 RASTREAMENTO: Erro no formulário
            trackFormError(errorMsg);

            // Mesmo com erro no email, vamos permitir ir para o WhatsApp
            alert(`Atenção: Houve um problema ao enviar o e-mail automático (${errorMsg}).\n\nMas não se preocupe! Você será redirecionado para o WhatsApp para enviar seu orçamento diretamente.`);
        } finally {
            // Abre WhatsApp sempre (seja sucesso ou erro no email)
            // Pequeno delay para garantir que o usuário veja o modal ou o alert antes
            setTimeout(() => {
                // 🎯 RASTREAMENTO: Clique no WhatsApp
                trackWhatsAppClick('form');

                const whatsappNumber = '5511994013938';
                const url = `https://wa.me/${whatsappNumber}?text=${gerarMensagemWhatsApp(data)}`;
                window.open(url, '_blank');
            }, emailSuccess ? 2000 : 500);
        }
    };

    // Efeito de foco nos inputs (brilho)
    useEffect(() => {
        const inputs = document.querySelectorAll('.form-control-elegant, select');
        inputs.forEach((input) => {
            const el = input as HTMLElement;
            const focus = () => {
                el.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)';
                el.style.transform = 'scale(1.02)';
                el.style.transition = 'all 0.3s ease';
            };
            const blur = () => {
                el.style.boxShadow = '';
                el.style.transform = 'scale(1)';
            };
            el.addEventListener('focus', focus);
            el.addEventListener('blur', blur);
            return () => {
                el.removeEventListener('focus', focus);
                el.removeEventListener('blur', blur);
            };
        });
    }, []);

    // Rastreia quando usuário começa a preencher o formulário
    const handleFormFocus = () => {
        if (!formStarted) {
            setFormStarted(true);
            trackFormStart();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onFocus={handleFormFocus}
            className="mx-auto text-start card-elegant p-4"
            style={{ maxWidth: '600px' }}
        >
            {/* Nome */}
            <div className="mb-3">
                <label htmlFor="nome" className="form-label-elegant">Qual seu nome? *</label>
                <input type="text" className={`form-control-elegant ${errors.nome ? 'is-invalid' : ''}`} id="nome" {...register('nome')} placeholder="Digite seu primeiro nome" required />
                {errors.nome && <p className="text-danger small mt-1">{errors.nome.message}</p>}
            </div>

            {/* Telefone */}
            <div className="mb-3">
                <label htmlFor="telefone" className="form-label-elegant">Telefone / WhatsApp *</label>
                <input type="tel" className={`form-control-elegant ${errors.telefone ? 'is-invalid' : ''}`} id="telefone" {...register('telefone')} placeholder="(11) 99999-9999" required />
                {errors.telefone && <p className="text-danger small mt-1">{errors.telefone.message}</p>}
            </div>

            {/* Medidas */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="parede" className="form-label-elegant">Largura da parede (m) *</label>
                    <input type="number" step="0.01" min="0.5" max="10" className={`form-control-elegant ${errors.parede ? 'is-invalid' : ''}`} id="parede" {...register('parede')} placeholder="Ex: 3.20" required />
                    {errors.parede && <p className="text-danger small mt-1">{errors.parede.message}</p>}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="altura_parede" className="form-label-elegant">Altura da parede (m) *</label>
                    <input type="number" step="0.01" min="1.5" max="5" className={`form-control-elegant ${errors.altura_parede ? 'is-invalid' : ''}`} id="altura_parede" {...register('altura_parede')} placeholder="Ex: 2.60" required />
                    {errors.altura_parede && <p className="text-danger small mt-1">{errors.altura_parede.message}</p>}
                </div>
            </div>

            {/* Tecido */}
            <div className="mb-3">
                <label htmlFor="tecido" className="form-label-elegant">Tipo de tecido *</label>
                <select className={`form-control-elegant ${errors.tecido ? 'is-invalid' : ''}`} id="tecido" {...register('tecido')} required>
                    <option value="">Selecione...</option>
                    <option value="Voil">Voil</option>
                    <option value="Linho">Linho (Variedades)</option>
                    <option value="Blackout">Blackout</option>
                    <option value="Outros">Outros</option>
                </select>
                {errors.tecido && <p className="text-danger small mt-1">{errors.tecido.message}</p>}
            </div>

            {/* Instalação */}
            <div className="mb-3">
                <label htmlFor="instalacao" className="form-label-elegant">Tipo de instalação *</label>
                <select className={`form-control-elegant ${errors.instalacao ? 'is-invalid' : ''}`} id="instalacao" {...register('instalacao')} required>
                    <option value="">Selecione...</option>
                    <option value="Trilho">Trilho</option>
                    <option value="Varão">Varão</option>
                    <option value="Não sei">Não sei - Preciso de ajuda</option>
                </select>
                {errors.instalacao && <p className="text-danger small mt-1">{errors.instalacao.message}</p>}
            </div>

            {/* Observações */}
            <div className="mb-3">
                <label htmlFor="observacoes" className="form-label-elegant">Observações adicionais</label>
                <textarea className="form-control-elegant" id="observacoes" {...register('observacoes')} rows={2} placeholder="Cor preferida, tipo de ambiente, etc." maxLength={500} />
            </div>

            {/* Botão Submit */}
            <div className="d-grid mt-4">
                <button type="submit" className="btn-gold hover-shine" disabled={isSubmitting} style={{ width: '100%', padding: '1rem' }}>
                    {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-stars me-2" />
                            Solicitar Orçamento
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
