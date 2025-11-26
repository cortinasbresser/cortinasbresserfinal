require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSMTP() {
    console.log('--- Teste de Configuração SMTP ---');
    console.log(`Host: ${process.env.SMTP_HOST}`);
    console.log(`Port: ${process.env.SMTP_PORT}`);
    console.log(`User: ${process.env.SMTP_USER}`);
    console.log(`Secure: ${process.env.SMTP_PORT == 465}`);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false // Ignora erros de certificado auto-assinado (comum em alguns hosts)
        },
        debug: true, // Mostra logs detalhados
        logger: true // Loga no console
    });

    try {
        console.log('\nVerificando conexão...');
        await transporter.verify();
        console.log('✅ Conexão SMTP estabelecida com sucesso!');

        console.log('\nEnviando e-mail de teste...');
        const info = await transporter.sendMail({
            from: `"Teste Sistema" <${process.env.SMTP_USER}>`,
            to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
            subject: 'Teste de Envio - Cortinas Bresser',
            text: 'Se você recebeu este e-mail, o sistema de envio está funcionando corretamente.',
        });

        console.log('✅ E-mail enviado com sucesso!');
        console.log(`Message ID: ${info.messageId}`);
    } catch (error) {
        console.error('❌ Erro no teste SMTP:');
        console.error(error);
    }
}

testSMTP();
