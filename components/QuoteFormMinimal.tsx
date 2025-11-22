'use client';

import { useState } from 'react';

interface FormData {
    nome: string;
    telefone: string;
    parede: string;
    altura_parede: string;
    tecido: string;
    instalacao: string;
    observacoes: string;
    endereco: string;
}

export default function QuoteFormMinimal() {
    const [formData, setFormData] = useState<FormData>({
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            const mensagemWhatsApp = gerarMensagemWhatsApp();
            const numeroWhatsApp = '5511994013938';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemWhatsApp}`;

            window.open(urlWhatsApp, '_blank');
            setShowModal(true);

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
        <>
            <section className="section-minimal" id="orcamentoForm">
                <div className="container-tight">
                    <div className="center-content" style={{ marginBottom: 'var(--space-xl)' }}>
                        <h2 style={{ marginBottom: 'var(--space-sm)', fontWeight: 'var(--font-light)' }}>
                            Solicite um Orçamento
                        </h2>
                        <div className="divider-minimal"></div>
                        <p className="text-delicate" style={{ maxWidth: '500px' }}>
                            Preencha o formulário abaixo e receba uma proposta personalizada
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="form-minimal">
                        {/* Nome */}
                        <div className="form-group-minimal">
                            <label htmlFor="nome" className="label-minimal">
                                Nome
                            </label>
                            <input
                                type="text"
                                className="input-minimal"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                                placeholder="Seu nome completo"
                                required
                                minLength={2}
                                maxLength={50}
                            />
                        </div>

                        {/* Telefone */}
                        <div className="form-group-minimal">
                            <label htmlFor="telefone" className="label-minimal">
                                Telefone / WhatsApp
                            </label>
                            <input
                                type="tel"
                                className="input-minimal"
                                id="telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                                placeholder="(11) 99999-9999"
                                required
                            />
                        </div>

                        {/* Medidas */}
                        <div className="grid-minimal grid-minimal-2">
                            <div className="form-group-minimal">
                                <label htmlFor="parede" className="label-minimal">
                                    Largura (metros)
                                </label>
                                <input
                                    type="number"
                                    className="input-minimal"
                                    id="parede"
                                    name="parede"
                                    value={formData.parede}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0.5"
                                    max="10"
                                    placeholder="3.20"
                                    required
                                />
                            </div>
                            <div className="form-group-minimal">
                                <label htmlFor="altura_parede" className="label-minimal">
                                    Altura (metros)
                                </label>
                                <input
                                    type="number"
                                    className="input-minimal"
                                    id="altura_parede"
                                    name="altura_parede"
                                    value={formData.altura_parede}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="1.5"
                                    max="5"
                                    placeholder="2.60"
                                    required
                                />
                            </div>
                        </div>

                        {/* Tecido */}
                        <div className="form-group-minimal">
                            <label htmlFor="tecido" className="label-minimal">
                                Tipo de Tecido
                            </label>
                            <select
                                className="input-minimal"
                                id="tecido"
                                name="tecido"
                                value={formData.tecido}
                                onChange={handleInputChange}
                                required
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
                        <div className="form-group-minimal">
                            <label htmlFor="instalacao" className="label-minimal">
                                Tipo de Instalação
                            </label>
                            <select
                                className="input-minimal"
                                id="instalacao"
                                name="instalacao"
                                value={formData.instalacao}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="Trilho">Trilho</option>
                                <option value="Varão">Varão</option>
                                <option value="Não sei">Não sei - Preciso de ajuda</option>
                            </select>
                        </div>

                        {/* Endereço */}
                        <div className="form-group-minimal">
                            <label htmlFor="endereco" className="label-minimal">
                                Endereço (Opcional)
                            </label>
                            <textarea
                                className="input-minimal"
                                id="endereco"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleInputChange}
                                rows={2}
                                placeholder="Rua, número, bairro, cidade..."
                                maxLength={300}
                            />
                        </div>

                        {/* Observações */}
                        <div className="form-group-minimal">
                            <label htmlFor="observacoes" className="label-minimal">
                                Observações (Opcional)
                            </label>
                            <textarea
                                className="input-minimal"
                                id="observacoes"
                                name="observacoes"
                                value={formData.observacoes}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Cor preferida, tipo de ambiente, etc."
                                maxLength={500}
                            />
                        </div>

                        {/* Botão Submit */}
                        <div style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
                            <button
                                type="submit"
                                className="btn-minimal-primary"
                                disabled={isSubmitting}
                                style={{ minWidth: '200px' }}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Modal de Confirmação */}
            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: 'var(--space-md)' }}>
                                ✓
                            </div>
                            <h3 style={{ marginBottom: 'var(--space-sm)' }}>Solicitação Enviada</h3>
                            <p className="text-delicate" style={{ marginBottom: 'var(--space-md)' }}>
                                Seus dados foram recebidos com sucesso. Em breve entraremos em contato.
                            </p>
                            <button
                                className="btn-minimal"
                                onClick={() => setShowModal(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: var(--space-md);
        }

        .modal-content {
          background: white;
          padding: var(--space-xl);
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
      `}</style>
        </>
    );
}
