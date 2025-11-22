import { Metadata } from 'next';

export const siteMetadata = {
    title: 'Cortinas Bresser - Cortinas Sob Medida Premium em São Paulo',
    description: 'Transforme seu ambiente com cortinas sob medida de alta qualidade. Tecidos premium (blackout, voil, linho), instalação profissional e orçamento em minutos. Atendemos toda São Paulo.',
    keywords: [
        'cortinas sob medida',
        'cortinas personalizadas',
        'cortinas blackout',
        'cortinas são paulo',
        'cortinas brás',
        'decoração cortinas',
        'instalação profissional cortinas',
        'cortinas premium',
        'cortinas elegantes',
        'cortinas voil',
        'cortinas linho',
        'cortinas seda'
    ],
    author: 'Cortinas Bresser',
    siteUrl: 'https://www.cortinasbresser.com.br',
    siteName: 'Cortinas Bresser',
    locale: 'pt_BR',
    type: 'website',

    // Informações de contato
    contact: {
        phone: '+55-11-2692-7865',
        whatsapp: '+55-11-99401-3938',
        whatsapp2: '+55-11-95661-6041',
        email: 'contato@cortinasbresser.com.br',
        address: {
            street: 'Rua Bresser, 1084',
            neighborhood: 'Brás',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '03053-000',
            country: 'Brasil'
        },
        geo: {
            latitude: -23.539637,
            longitude: -46.610689
        }
    },

    // Horário de funcionamento
    openingHours: [
        {
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00'
        },
        {
            days: ['Saturday'],
            opens: '09:00',
            closes: '16:00'
        }
    ],

    // Redes sociais
    social: {
        instagram: 'https://www.instagram.com/cortinasbresser/',
        facebook: 'https://www.facebook.com/profile.php?id=61577555679690'
    },

    // Imagens
    images: {
        logo: '/assets/cortinasbresser.svg',
        banner: '/assets/banner1.jpg',
        ogImage: '/assets/banner1.jpg'
    }
};

// Structured Data - LocalBusiness
export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteMetadata.siteName,
    image: siteMetadata.siteUrl + siteMetadata.images.logo,
    '@id': siteMetadata.siteUrl,
    url: siteMetadata.siteUrl,
    telephone: siteMetadata.contact.phone,
    priceRange: '$$',
    address: {
        '@type': 'PostalAddress',
        streetAddress: siteMetadata.contact.address.street,
        addressLocality: siteMetadata.contact.address.city,
        addressRegion: siteMetadata.contact.address.state,
        postalCode: siteMetadata.contact.address.zipCode,
        addressCountry: 'BR'
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: siteMetadata.contact.geo.latitude,
        longitude: siteMetadata.contact.geo.longitude
    },
    openingHoursSpecification: siteMetadata.openingHours.map(schedule => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: schedule.days,
        opens: schedule.opens,
        closes: schedule.closes
    })),
    sameAs: [
        siteMetadata.social.instagram,
        siteMetadata.social.facebook
    ]
};

// Structured Data - BreadcrumbList
export const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteMetadata.siteUrl
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Orçamento',
            item: siteMetadata.siteUrl + '/#orcamentoForm'
        }
    ]
};

// Structured Data - FAQ
export const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Como funciona o orçamento de cortinas sob medida?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Você preenche o formulário com as medidas do ambiente, escolhe o tecido desejado e recebe um orçamento personalizado via WhatsApp em minutos. Nossa equipe tira todas as dúvidas antes da compra.'
            }
        },
        {
            '@type': 'Question',
            name: 'Qual o prazo de entrega das cortinas?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'O prazo varia conforme o tipo de tecido e modelo escolhido, geralmente entre 7 a 15 dias úteis após aprovação do orçamento.'
            }
        },
        {
            '@type': 'Question',
            name: 'A instalação está incluída no orçamento?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sim, oferecemos serviço completo de instalação profissional com garantia de qualidade.'
            }
        },
        {
            '@type': 'Question',
            name: 'Quais tecidos estão disponíveis?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Trabalhamos com ampla variedade de tecidos nobres: blackout, voil, linho, seda, cetim e tecidos importados. Consulte nosso catálogo completo.'
            }
        },
        {
            '@type': 'Question',
            name: 'Vocês atendem toda São Paulo?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sim, atendemos toda a região metropolitana de São Paulo com instalação profissional incluída.'
            }
        }
    ]
};

// Structured Data - Product (Serviço)
export const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Cortinas Sob Medida Premium',
    description: 'Cortinas personalizadas com tecidos nobres, instalação profissional e garantia de qualidade.',
    brand: {
        '@type': 'Brand',
        name: 'Cortinas Bresser'
    },
    offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        priceRange: '$$'
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127'
    }
};

// Metadados para Next.js
export const metadata: Metadata = {
    title: {
        default: siteMetadata.title,
        template: `%s | ${siteMetadata.siteName}`
    },
    description: siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: [{ name: siteMetadata.author }],
    creator: siteMetadata.author,
    publisher: siteMetadata.author,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(siteMetadata.siteUrl),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: siteMetadata.siteUrl,
        siteName: siteMetadata.siteName,
        images: [
            {
                url: siteMetadata.images.ogImage,
                width: 1920,
                height: 600,
                alt: 'Cortinas Bresser - Cortinas Sob Medida Premium'
            }
        ],
        locale: siteMetadata.locale,
        type: siteMetadata.type,
    },
    twitter: {
        card: 'summary_large_image',
        title: siteMetadata.title,
        description: siteMetadata.description,
        images: [siteMetadata.images.ogImage],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'google-site-verification-code', // Adicionar código real
    },
};
