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

                {/* Google Analytics - Adicione seu ID */}
                {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-YR56WHH2D4"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-YR56WHH2D4');
                    `
                }} /> */}
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
