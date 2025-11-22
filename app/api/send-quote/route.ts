// Next.js 14 app router API route to receive quote form data, send email and respond
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

        // Build email content
        const mensagem = `
      <h2>Solicitação de Orçamento - Cortinas Bresser</h2>
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Telefone:</strong> ${data.telefone}</p>
      <p><strong>Parede:</strong> ${data.parede}m (largura) x ${data.altura_parede}m (altura)</p>
      <p><strong>Tecido:</strong> ${data.tecido}</p>
      <p><strong>Instalação:</strong> ${data.instalacao}</p>
      ${data.endereco ? `<p><strong>Endereço:</strong> ${data.endereco}</p>` : ''}
      ${data.observacoes ? `<p><strong>Observações:</strong> ${data.observacoes}</p>` : ''}
    `;

        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        console.log('API: Tentando enviar e-mail...');
        await transporter.sendMail({
            from: `"Cortinas Bresser" <${process.env.SMTP_USER}>`,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Nova solicitação de orçamento',
            html: mensagem,
        });
        console.log('API: E-mail enviado com sucesso!');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error: Erro ao processar solicitação de orçamento:', error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
