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

        // Validação básica de variáveis de ambiente
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.error('API Error: Variáveis de ambiente SMTP não configuradas.');
            return NextResponse.json({ success: false, error: 'Configuração de servidor de e-mail ausente.' }, { status: 500 });
        }

        // 1. Gerar PDF
        console.log('API: Gerando PDF...');
        const pdfBuffer = await generateQuotePdf(data);

        // 2. Salvar PDF localmente (Backup)
        try {
            const quotesDir = path.join(process.cwd(), 'quotes');
            if (!fs.existsSync(quotesDir)) {
                fs.mkdirSync(quotesDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const safeName = data.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const fileName = `orcamento_${safeName}_${timestamp}.pdf`;
            const filePath = path.join(quotesDir, fileName);

            fs.writeFileSync(filePath, pdfBuffer);
            console.log('API: PDF salvo localmente em:', filePath);
        } catch (fileError) {
            console.error('API Warning: Não foi possível salvar o PDF localmente:', fileError);
            // Não falha a requisição se não conseguir salvar o arquivo local
        }

        // 3. Construir conteúdo do e-mail
        const mensagem = `
      <h2>Solicitação de Orçamento - Cortinas Bresser</h2>
      <p>Um novo orçamento foi solicitado pelo site. Veja os detalhes abaixo ou no PDF anexo.</p>
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
        });

        // 5. Enviar e-mail com anexo
        console.log('API: Tentando enviar e-mail com anexo...');
        await transporter.sendMail({
            from: `"Cortinas Bresser" <${process.env.SMTP_USER}>`,
            to: process.env.RECIPIENT_EMAIL,
            subject: `Nova solicitação de orçamento: ${data.nome}`,
            html: mensagem,
            attachments: [
                {
                    filename: 'orcamento.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        });
        console.log('API: E-mail enviado com sucesso!');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error: Erro ao processar solicitação de orçamento:', error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
