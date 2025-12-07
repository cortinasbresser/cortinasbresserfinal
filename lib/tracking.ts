// lib/tracking.ts
// Funções de rastreamento para Google Ads e Meta Ads

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        fbq?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

/**
 * Rastreia o envio do formulário de orçamento
 * Dispara eventos para Google Ads e Meta Pixel
 */
export const trackFormSubmission = (formData?: {
    nome?: string;
    telefone?: string;
    tecido?: string;
}) => {
    // Google Ads Conversion Tracking
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXXX/SEU_LABEL_AQUI', // Substituir com seu código real
            'value': 1.0,
            'currency': 'BRL',
            'transaction_id': Date.now().toString()
        });

        // Evento personalizado no Google Analytics
        window.gtag('event', 'form_submission', {
            'event_category': 'engagement',
            'event_label': 'Orçamento Cortinas',
            'value': 1
        });
    }

    // Meta Pixel Lead Event
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
            content_name: 'Orçamento Cortinas',
            content_category: 'Formulário',
            value: 1.00,
            currency: 'BRL',
            ...(formData && {
                content_type: formData.tecido || 'Não especificado'
            })
        });
    }

    console.log('✅ Evento de conversão disparado');
};

/**
 * Rastreia cliques no botão do WhatsApp
 */
export const trackWhatsAppClick = (source: 'float' | 'form' | 'header' = 'float') => {
    // Google Analytics Event
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'whatsapp_click', {
            'event_category': 'engagement',
            'event_label': `WhatsApp - ${source}`,
            'value': 1
        });
    }

    // Meta Pixel Custom Event
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'WhatsAppClick', {
            source: source
        });
    }

    console.log(`✅ Clique WhatsApp rastreado: ${source}`);
};

/**
 * Rastreia visualização de página
 * Útil para SPAs e navegação client-side
 */
export const trackPageView = (url: string, title?: string) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-XXXXXXXXXX', { // Substituir com seu ID real
            page_path: url,
            page_title: title || document.title
        });
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
    }

    console.log(`✅ PageView rastreado: ${url}`);
};

/**
 * Rastreia cliques em links de redes sociais
 */
export const trackSocialClick = (platform: 'instagram' | 'facebook') => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'social_click', {
            'event_category': 'engagement',
            'event_label': platform,
            'value': 1
        });
    }

    console.log(`✅ Clique em rede social rastreado: ${platform}`);
};

/**
 * Rastreia scroll na página (engajamento)
 */
export const trackScroll = (percentage: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'scroll', {
            'event_category': 'engagement',
            'event_label': `${percentage}%`,
            'value': percentage
        });
    }
};

/**
 * Rastreia tempo na página
 */
export const trackTimeOnPage = (seconds: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'time_on_page', {
            'event_category': 'engagement',
            'event_label': `${seconds} segundos`,
            'value': seconds
        });
    }
};

/**
 * Rastreia erros no formulário
 */
export const trackFormError = (errorType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_error', {
            'event_category': 'error',
            'event_label': errorType,
            'value': 1
        });
    }
};

/**
 * Rastreia início de preenchimento do formulário
 */
export const trackFormStart = () => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_start', {
            'event_category': 'engagement',
            'event_label': 'Início Formulário',
            'value': 1
        });
    }

    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'FormStart');
    }

    console.log('✅ Início de formulário rastreado');
};

/**
 * Rastreia cliques no botão de orçamento
 */
export const trackQuoteButtonClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'quote_button_click', {
            'event_category': 'engagement',
            'event_label': 'Botão Orçamento',
            'value': 1
        });
    }

    console.log('✅ Clique no botão de orçamento rastreado');
};

/**
 * Rastreia visualização do modal de confirmação
 */
export const trackModalView = (modalType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'modal_view', {
            'event_category': 'engagement',
            'event_label': modalType,
            'value': 1
        });
    }
};

export default {
    trackFormSubmission,
    trackWhatsAppClick,
    trackPageView,
    trackSocialClick,
    trackScroll,
    trackTimeOnPage,
    trackFormError,
    trackFormStart,
    trackQuoteButtonClick,
    trackModalView
};
