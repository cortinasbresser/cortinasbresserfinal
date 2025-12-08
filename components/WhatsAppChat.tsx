'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { trackChatWidgetOpen, trackChatWidgetClose, trackQuickMessageClick, trackCustomMessageSend } from '@/lib/tracking';

interface WhatsAppChatProps {
    phoneNumber?: string;
    agentName?: string;
    agentAvatar?: string;
    welcomeMessage?: string;
    position?: 'left' | 'right';
}

export default function WhatsAppChat({
    phoneNumber = '5511994013938',
    agentName = 'Atendimento Cortinas Bresser',
    agentAvatar = '/assets/agent-avatar.jpg',
    welcomeMessage = 'Olá! 👋\n\nSou da equipe Cortinas Bresser. Como posso ajudá-lo hoje?',
    position = 'right'
}: WhatsAppChatProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Simula que o agente está digitando quando abre o chat
    useEffect(() => {
        if (isOpen) {
            setIsTyping(true);
            const timer = setTimeout(() => {
                setIsTyping(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSendMessage = () => {
        if (message.trim()) {
            trackCustomMessageSend(message.length);
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
            setMessage('');
        }
    };

    const handleQuickMessage = (quickMsg: string) => {
        trackQuickMessageClick(quickMsg);
        const encodedMessage = encodeURIComponent(quickMsg);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    const quickMessages = [
        '🛍️ Quero fazer um orçamento',
        '📏 Preciso de medidas',
        '💰 Quais são os preços?',
        '🚚 Qual o prazo de entrega?'
    ];

    const positionClasses = position === 'right'
        ? 'right-4 md:right-6'
        : 'left-4 md:left-6';

    return (
        <>
            {/* Chat Widget */}
            <div className={`fixed bottom-4 md:bottom-6 ${positionClasses} z-50`}>
                {/* Chat Box */}
                {isOpen && (
                    <div className="mb-4 w-[320px] md:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                                    <i className="bi bi-person-circle text-white text-3xl"></i>
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-sm">{agentName}</h3>
                                <p className="text-white/80 text-xs">Online - Responde rápido</p>
                            </div>
                            <button
                                onClick={() => {
                                    trackChatWidgetClose();
                                    setIsOpen(false);
                                }}
                                className="text-white/80 hover:text-white transition-colors"
                                aria-label="Fechar chat"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="bg-[#ECE5DD] p-4 h-[320px] overflow-y-auto">
                            {/* Welcome Message */}
                            <div className="mb-4 animate-fade-in">
                                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%]">
                                    <p className="text-gray-800 text-sm whitespace-pre-line">{welcomeMessage}</p>
                                    <span className="text-xs text-gray-400 mt-1 block">
                                        {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="mb-4 animate-fade-in">
                                    <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85px]">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Quick Messages */}
                            {!isTyping && (
                                <div className="space-y-2">
                                    <p className="text-gray-600 text-xs text-center mb-3">Mensagens rápidas:</p>
                                    {quickMessages.map((quickMsg, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickMessage(quickMsg)}
                                            className="w-full bg-white hover:bg-gray-50 text-left p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md text-sm text-gray-700 border border-gray-100"
                                        >
                                            {quickMsg}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="bg-white p-3 border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Digite sua mensagem..."
                                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="bg-[#25D366] hover:bg-[#128C7E] disabled:bg-gray-300 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                                    aria-label="Enviar mensagem"
                                >
                                    <i className="bi bi-send-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Float Button */}
                <button
                    onClick={() => {
                        if (!isOpen) {
                            trackChatWidgetOpen();
                        } else {
                            trackChatWidgetClose();
                        }
                        setIsOpen(!isOpen);
                    }}
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group relative"
                    aria-label={isOpen ? 'Fechar chat' : 'Abrir chat do WhatsApp'}
                >
                    {isOpen ? (
                        <i className="bi bi-x-lg text-3xl"></i>
                    ) : (
                        <>
                            <i className="bi bi-whatsapp text-4xl"></i>
                            {/* Notification Badge */}
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                                1
                            </span>
                            {/* Pulse Animation */}
                            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
                        </>
                    )}
                </button>

                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute bottom-20 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap animate-bounce-slow hidden md:block">
                        Fale conosco! 💬
                        <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white transform rotate-45"></div>
                    </div>
                )}
            </div>

            {/* Custom Animations */}
            <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
        </>
    );
}
