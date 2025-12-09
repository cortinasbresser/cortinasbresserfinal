'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PrivacidadePage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Header com Logo */}
            <header className="bg-[#0a0a0a] border-b border-[#8b7355]/20 py-6">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Link href="/" className="inline-block">
                        <Image
                            src="/assets/cortinasbresser.svg"
                            alt="Cortinas Bresser"
                            width={120}
                            height={48}
                            className="hover:opacity-80 transition-opacity"
                        />
                    </Link>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <article className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Título */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#d4b56f] mb-4">
                        Política de Privacidade
                    </h1>
                    <p className="text-gray-400">
                        Última atualização: 09 de dezembro de 2025
                    </p>
                </div>

                {/* Conteúdo */}
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* Introdução */}
                    <section className="mb-12">
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8 mb-8">
                            <p className="text-gray-300 leading-relaxed">
                                A <strong className="text-[#d4b56f]">Cortinas Bresser</strong>, inscrita no CNPJ sob o nº <strong>44.426.277/0001-56</strong>,
                                localizada na Rua Bresser, 1084 - Brás, São Paulo - SP, CEP 03053-000, está comprometida com a proteção
                                da privacidade e dos dados pessoais de seus clientes, visitantes e usuários do site.
                            </p>
                            <p className="text-gray-300 leading-relaxed mt-4">
                                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações
                                pessoais, em conformidade com a <strong className="text-[#d4b56f]">Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
                            </p>
                        </div>
                    </section>

                    {/* 1. Informações que Coletamos */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-info-circle-fill mr-3"></i>
                            1. Informações que Coletamos
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <h3 className="text-xl font-medium text-[#d4b56f] mb-4">1.1. Dados Fornecidos por Você</h3>
                            <p className="text-gray-300 mb-4">Coletamos informações que você nos fornece diretamente, incluindo:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li><strong>Nome completo</strong></li>
                                <li><strong>E-mail</strong></li>
                                <li><strong>Telefone/WhatsApp</strong></li>
                                <li><strong>Informações sobre o projeto</strong> (tipo de cortina, medidas, preferências)</li>
                                <li><strong>Mensagens e comunicações</strong> enviadas através de formulários de contato</li>
                            </ul>

                            <h3 className="text-xl font-medium text-[#d4b56f] mb-4 mt-8">1.2. Dados Coletados Automaticamente</h3>
                            <p className="text-gray-300 mb-4">Quando você visita nosso site, podemos coletar automaticamente:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li><strong>Endereço IP</strong></li>
                                <li><strong>Tipo de navegador e dispositivo</strong></li>
                                <li><strong>Páginas visitadas e tempo de permanência</strong></li>
                                <li><strong>Origem da visita</strong> (como você chegou ao nosso site)</li>
                                <li><strong>Cookies e tecnologias similares</strong></li>
                            </ul>
                        </div>
                    </section>

                    {/* 2. Como Usamos Suas Informações */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-gear-fill mr-3"></i>
                            2. Como Usamos Suas Informações
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300 mb-4">Utilizamos suas informações pessoais para:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-3 ml-4">
                                <li><strong>Processar e responder suas solicitações de orçamento</strong></li>
                                <li><strong>Entrar em contato</strong> para esclarecer dúvidas e fornecer informações sobre produtos e serviços</li>
                                <li><strong>Enviar propostas comerciais personalizadas</strong></li>
                                <li><strong>Melhorar nosso site e experiência do usuário</strong></li>
                                <li><strong>Realizar análises estatísticas e de marketing</strong></li>
                                <li><strong>Cumprir obrigações legais e regulatórias</strong></li>
                                <li><strong>Prevenir fraudes e garantir a segurança</strong></li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. Base Legal para Tratamento de Dados */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-shield-check mr-3"></i>
                            3. Base Legal para Tratamento de Dados
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300 mb-4">O tratamento de seus dados pessoais é realizado com base em:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-3 ml-4">
                                <li><strong>Consentimento:</strong> Ao preencher nossos formulários, você consente com o tratamento de seus dados</li>
                                <li><strong>Execução de contrato:</strong> Para processar orçamentos e prestar serviços solicitados</li>
                                <li><strong>Legítimo interesse:</strong> Para melhorar nossos serviços e comunicação</li>
                                <li><strong>Cumprimento de obrigação legal:</strong> Quando exigido por lei</li>
                            </ul>
                        </div>
                    </section>

                    {/* 4. Compartilhamento de Informações */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-people-fill mr-3"></i>
                            4. Compartilhamento de Informações
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300 mb-4">
                                A <strong className="text-[#d4b56f]">Cortinas Bresser</strong> não vende, aluga ou compartilha seus dados pessoais
                                com terceiros para fins de marketing sem seu consentimento explícito.
                            </p>
                            <p className="text-gray-300 mb-4">Podemos compartilhar informações com:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-3 ml-4">
                                <li><strong>Prestadores de serviços:</strong> Empresas que nos auxiliam em hospedagem, e-mail, análise de dados (ex: Google Analytics, Meta Pixel)</li>
                                <li><strong>WhatsApp/Meta:</strong> Para comunicação via WhatsApp Business</li>
                                <li><strong>Autoridades legais:</strong> Quando exigido por lei ou para proteger nossos direitos</li>
                            </ul>
                        </div>
                    </section>

                    {/* 5. Cookies e Tecnologias de Rastreamento */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-cookie mr-3"></i>
                            5. Cookies e Tecnologias de Rastreamento
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300 mb-4">
                                Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site.
                            </p>

                            <h3 className="text-xl font-medium text-[#d4b56f] mb-4 mt-6">Tipos de Cookies Utilizados:</h3>
                            <ul className="list-disc list-inside text-gray-300 space-y-3 ml-4">
                                <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site</li>
                                <li><strong>Cookies de Desempenho:</strong> Coletam informações sobre como você usa o site (Google Analytics)</li>
                                <li><strong>Cookies de Publicidade:</strong> Utilizados para campanhas de Google Ads e Meta Ads (Facebook Pixel)</li>
                            </ul>

                            <div className="bg-[#1a1a1a] border border-[#8b7355]/20 rounded-lg p-6 mt-6">
                                <p className="text-gray-300">
                                    <strong className="text-[#d4b56f]">Como gerenciar cookies:</strong> Você pode configurar seu navegador
                                    para recusar cookies ou alertá-lo quando cookies estiverem sendo enviados. No entanto, algumas partes
                                    do site podem não funcionar adequadamente sem cookies.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 6. Segurança dos Dados */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-lock-fill mr-3"></i>
                            6. Segurança dos Dados
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300 mb-4">
                                Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra
                                acesso não autorizado, alteração, divulgação ou destruição, incluindo:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li>Criptografia de dados em trânsito (HTTPS/SSL)</li>
                                <li>Controle de acesso restrito a dados pessoais</li>
                                <li>Monitoramento de segurança contínuo</li>
                                <li>Backups regulares</li>
                                <li>Treinamento de equipe sobre proteção de dados</li>
                            </ul>
                        </div>
                    </section>

                    {/* 7. Retenção de Dados */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-clock-history mr-3"></i>
                            7. Retenção de Dados
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300 mb-4">
                                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta
                                política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li><strong>Dados de orçamento:</strong> Até 5 anos após o último contato</li>
                                <li><strong>Dados de clientes:</strong> Durante a vigência do relacionamento comercial e conforme obrigações legais</li>
                                <li><strong>Dados de marketing:</strong> Até a revogação do consentimento</li>
                            </ul>
                        </div>
                    </section>

                    {/* 8. Seus Direitos (LGPD) */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-person-check-fill mr-3"></i>
                            8. Seus Direitos sob a LGPD
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300 mb-4">
                                De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-3 ml-4">
                                <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                                <li><strong>Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                                <li><strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
                                <li><strong>Portabilidade:</strong> Solicitar a portabilidade de seus dados a outro fornecedor</li>
                                <li><strong>Eliminação:</strong> Solicitar a eliminação de dados tratados com base em consentimento</li>
                                <li><strong>Revogação do consentimento:</strong> Retirar seu consentimento a qualquer momento</li>
                                <li><strong>Oposição:</strong> Opor-se ao tratamento de dados em determinadas situações</li>
                            </ul>

                            <div className="bg-[#1a1a1a] border border-[#8b7355]/20 rounded-lg p-6 mt-6">
                                <p className="text-gray-300">
                                    <strong className="text-[#d4b56f]">Como exercer seus direitos:</strong> Entre em contato conosco através
                                    dos canais indicados na seção "Contato" abaixo.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 9. Transferência Internacional de Dados */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-globe mr-3"></i>
                            9. Transferência Internacional de Dados
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300">
                                Alguns de nossos prestadores de serviços (como Google, Meta/Facebook) podem estar localizados fora do Brasil.
                                Garantimos que essas transferências sejam realizadas em conformidade com a LGPD e com medidas de segurança adequadas.
                            </p>
                        </div>
                    </section>

                    {/* 10. Menores de Idade */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-person-x-fill mr-3"></i>
                            10. Menores de Idade
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300">
                                Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente dados pessoais
                                de menores. Se você é pai/mãe ou responsável e acredita que seu filho nos forneceu dados pessoais,
                                entre em contato conosco.
                            </p>
                        </div>
                    </section>

                    {/* 11. Alterações nesta Política */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-arrow-repeat mr-3"></i>
                            11. Alterações nesta Política
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300">
                                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações
                                significativas publicando a nova política em nosso site com a data de "Última atualização" revisada.
                                Recomendamos que você revise esta política regularmente.
                            </p>
                        </div>
                    </section>

                    {/* 12. Contato e Encarregado de Dados */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-[#d4b56f] mb-6 flex items-center">
                            <i className="bi bi-envelope-fill mr-3"></i>
                            12. Contato e Encarregado de Dados
                        </h2>
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#8b7355]/30 rounded-xl p-8">
                            <p className="text-gray-300 mb-6">
                                Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos, entre em contato conosco:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-[#0a0a0a] border border-[#8b7355]/20 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-[#d4b56f] mb-4">Cortinas Bresser</h3>
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start">
                                            <i className="bi bi-building text-[#d4b56f] mr-3 mt-1"></i>
                                            <div>
                                                <strong>CNPJ:</strong> 44.426.277/0001-56
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="bi bi-geo-alt-fill text-[#d4b56f] mr-3 mt-1"></i>
                                            <div>
                                                Rua Bresser, 1084 - Brás<br />
                                                São Paulo - SP, CEP 03053-000
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-[#0a0a0a] border border-[#8b7355]/20 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-[#d4b56f] mb-4">Canais de Contato</h3>
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start">
                                            <i className="bi bi-envelope text-[#d4b56f] mr-3 mt-1"></i>
                                            <div>
                                                <strong>E-mail:</strong><br />
                                                <a href="mailto:loja@cortinasbresser.com.br" className="text-[#d4b56f] hover:underline">
                                                    loja@cortinasbresser.com.br
                                                </a>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="bi bi-telephone-fill text-[#d4b56f] mr-3 mt-1"></i>
                                            <div>
                                                <strong>Telefone:</strong> (11) 2692-7865
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="bi bi-whatsapp text-[#d4b56f] mr-3 mt-1"></i>
                                            <div>
                                                <strong>WhatsApp:</strong><br />
                                                (11) 95661-6041 | (11) 99401-3938
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-[#8b7355]/10 border border-[#8b7355]/30 rounded-lg">
                                <p className="text-sm text-gray-300 text-center">
                                    <i className="bi bi-info-circle text-[#d4b56f] mr-2"></i>
                                    Responderemos sua solicitação em até 15 dias úteis, conforme estabelecido pela LGPD.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Consentimento */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-br from-[#8b7355]/20 to-[#d4b56f]/10 border border-[#8b7355]/40 rounded-xl p-8 text-center">
                            <i className="bi bi-check-circle-fill text-[#d4b56f] text-5xl mb-4 block"></i>
                            <h3 className="text-2xl font-semibold text-[#d4b56f] mb-4">Consentimento</h3>
                            <p className="text-gray-300 max-w-2xl mx-auto">
                                Ao utilizar nosso site e fornecer seus dados pessoais, você declara ter lido, compreendido e
                                concordado com os termos desta Política de Privacidade.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Botão Voltar */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b7355] to-[#d4b56f] text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <i className="bi bi-arrow-left"></i>
                        Voltar para o Site
                    </Link>
                </div>
            </article>

            {/* Footer Simplificado */}
            <footer className="bg-[#0a0a0a] border-t border-[#8b7355]/20 py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 <strong className="text-[#d4b56f]">Cortinas Bresser</strong> - Todos os direitos reservados
                    </p>
                </div>
            </footer>
        </main>
    );
}
