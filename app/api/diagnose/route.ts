import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const diagnostics = {
        env: {
            NODE_ENV: process.env.NODE_ENV,
            SMTP_HOST: process.env.SMTP_HOST ? 'Configurado' : 'Ausente',
            SMTP_PORT: process.env.SMTP_PORT ? 'Configurado' : 'Ausente',
            SMTP_USER: process.env.SMTP_USER ? 'Configurado' : 'Ausente',
            SMTP_PASS: process.env.SMTP_PASS ? 'Configurado' : 'Ausente',
            RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? 'Configurado' : 'Ausente',
        },
        filesystem: {
            quotesDirExists: false,
            canWrite: false,
            error: null as string | null
        },
        smtp: {
            connected: false,
            error: null as string | null
        }
    };

    // Teste de Filesystem
    try {
        const quotesDir = path.join(process.cwd(), 'quotes');
        if (!fs.existsSync(quotesDir)) {
            try {
                fs.mkdirSync(quotesDir, { recursive: true });
            } catch (e) {
                // Ignora erro de criação se já existir ou falhar, vamos testar escrita
            }
        }
        diagnostics.filesystem.quotesDirExists = fs.existsSync(quotesDir);

        const testFile = path.join(quotesDir, 'test_write.txt');
        fs.writeFileSync(testFile, 'Teste de escrita');
        fs.unlinkSync(testFile);
        diagnostics.filesystem.canWrite = true;
    } catch (err: any) {
        diagnostics.filesystem.error = err.message;
    }

    // Teste de SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: Number(process.env.SMTP_PORT) === 465,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false // Ajuda em alguns casos de certificado auto-assinado
                }
            });

            await transporter.verify();
            diagnostics.smtp.connected = true;
        } catch (err: any) {
            diagnostics.smtp.error = err.message;
        }
    }

    return NextResponse.json(diagnostics);
}
