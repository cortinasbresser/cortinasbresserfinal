import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { metadata as seoMetadata, localBusinessSchema, breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-inter"
});

export const metadata: Metadata = seoMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={inter.variable}>
            <head>
                {/* Preconnect for Performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Bootstrap Icons */}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" crossOrigin="anonymous" />

                {/* Favicon */}
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/bresser_icon.png" />
                <meta name="msapplication-TileColor" content="#d4af37" />
                <meta name="theme-color" content="#000000" />

                {/* Meta Tags para Google Ads */}
                <meta name="google-site-verification" content="ADICIONE_SEU_CODIGO_AQUI" />

                {/* Meta Tags para Meta Ads (Facebook/Instagram) */}
                <meta name="facebook-domain-verification" content="ADICIONE_SEU_CODIGO_AQUI" />

                {/* Open Graph otimizado para Meta Ads */}
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="fb:app_id" content="ADICIONE_SEU_APP_ID" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://www.cortinasbresser.com.br/" />

                {/* Structured Data - LocalBusiness */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />

                {/* Structured Data - Breadcrumb */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />

                {/* Structured Data - FAQ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                {/* Structured Data - Product */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
                />

                {/* Google Analytics & Google Ads - IMPORTANTE: Adicione seus IDs reais */}
                {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-YR56WHH2D4"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-YR56WHH2D4');
                        
                        // Google Ads Conversion Tracking
                        gtag('config', 'AW-XXXXXXXXXX');
                    `
                }} /> */}

                {/* Meta Pixel (Facebook Pixel) - IMPORTANTE: Adicione seu Pixel ID real */}
                {/* <script dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', 'SEU_PIXEL_ID_AQUI');
                        fbq('track', 'PageView');
                    `
                }} />
                <noscript>
                    <img height="1" width="1" style={{display: 'none'}}
                        src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1"
                    />
                </noscript> */}

            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
