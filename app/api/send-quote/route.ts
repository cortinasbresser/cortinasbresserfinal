// Next.js 14 app router API route to receive quote form data, send email and respond
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateQuotePdf } from '@/lib/generateQuotePdf';
import fs from 'fs';
import path from 'path';

type QuoteData = {
    nome: string;
    telefone: string;
    parede: string;
    altura_parede: string;
    tecido: string;
    instalacao: string;
    observacoes?: string;
    endereco?: string;
};

export async function POST(request: Request) {
    try {
        console.log('API: Recebendo solicitação de orçamento...');
        const data: QuoteData = await request.json();
        console.log('API: Dados recebidos:', data);

        // Debug das variáveis de ambiente
        console.log('API: Verificando variáveis de ambiente...');
        console.log('SMTP_HOST:', process.env.SMTP_HOST ? 'Definido' : 'Ausente');
        console.log('SMTP_USER:', process.env.SMTP_USER ? 'Definido' : 'Ausente');
        console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'Definido (***)' : 'Ausente');
        console.log('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL ? 'Definido' : 'Ausente (Usando SMTP_USER)');

        // Validação básica de variáveis de ambiente
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.error('API Error: Variáveis de ambiente SMTP não configuradas.');
            return NextResponse.json({
                success: false,
                error: 'Configuração de servidor de e-mail ausente. Verifique os logs do servidor.'
            }, { status: 500 });
        }

        // 1. Gerar PDF (com fallback para não impedir o envio do email)
        console.log('API: Gerando PDF...');
        let pdfBuffer: Buffer | null = null;
        try {
            pdfBuffer = await generateQuotePdf(data);
        } catch (pdfError) {
            console.error('API Error: Falha ao gerar PDF:', pdfError);
            // Continuamos sem o PDF
        }

        // 2. Salvar PDF localmente (Backup) - Apenas se gerou com sucesso
        if (pdfBuffer) {
            try {
                const quotesDir = path.join(process.cwd(), 'quotes');
                // Tenta criar diretório apenas se possível
                if (!fs.existsSync(quotesDir)) {
                    try {
                        fs.mkdirSync(quotesDir, { recursive: true });
                    } catch (mkdirError) {
                        console.warn('API Warning: Não foi possível criar diretório quotes:', mkdirError);
                    }
                }

                if (fs.existsSync(quotesDir)) {
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                    const safeName = data.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                    const fileName = `orcamento_${safeName}_${timestamp}.pdf`;
                    const filePath = path.join(quotesDir, fileName);

                    fs.writeFileSync(filePath, pdfBuffer);
                    console.log('API: PDF salvo localmente em:', filePath);
                }
            } catch (fileError) {
                console.error('API Warning: Não foi possível salvar o PDF localmente:', fileError);
            }
        }

        // 3. Construir conteúdo do e-mail
        const mensagem = `
      <h2>Solicitação de Orçamento - Cortinas Bresser</h2>
      <p>Um novo orçamento foi solicitado pelo site.</p>
      ${!pdfBuffer ? '<p style="color: red;"><strong>Aviso:</strong> O PDF não pôde ser gerado automaticamente. Veja os dados abaixo.</p>' : '<p>Veja os detalhes abaixo ou no PDF anexo.</p>'}
      <hr>
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Telefone:</strong> ${data.telefone}</p>
      <p><strong>Parede:</strong> ${data.parede}m (largura) x ${data.altura_parede}m (altura)</p>
      <p><strong>Tecido:</strong> ${data.tecido}</p>
      <p><strong>Instalação:</strong> ${data.instalacao}</p>
      ${data.endereco ? `<p><strong>Endereço:</strong> ${data.endereco}</p>` : ''}
      ${data.observacoes ? `<p><strong>Observações:</strong> ${data.observacoes}</p>` : ''}
    `;

        // 4. Configurar transporte
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
            debug: true, // Habilita logs detalhados do SMTP
            logger: true // Loga no console
        });

        // 5. Enviar e-mail (com ou sem anexo)
        console.log('API: Tentando enviar e-mail...');

        const recipient = process.env.RECIPIENT_EMAIL || process.env.SMTP_USER;

        const mailOptions: any = {
            from: `"Cortinas Bresser" <${process.env.SMTP_USER}>`,
            to: recipient,
            subject: `Nova solicitação de orçamento: ${data.nome}`,
            html: mensagem,
        };

        if (pdfBuffer) {
            mailOptions.attachments = [
                {
                    filename: 'orcamento.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ];
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('API: E-mail enviado com sucesso! MessageID:', info.messageId);

        return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (error: any) {
        console.error('API Error: Erro ao processar solicitação de orçamento:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Erro interno no servidor',
            details: error.toString()
        }, { status: 500 });
    }
}
