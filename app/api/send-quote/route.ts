import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Validação básica
        if (!data.nome || !data.telefone) {
            return NextResponse.json(
                { status: 'error', message: 'Nome e telefone são obrigatórios' },
                { status: 400 }
            );
        }

        // Aqui você pode adicionar lógica para enviar email
        // Por enquanto, vamos apenas logar e retornar sucesso
        console.log('📧 Dados do orçamento recebidos:', {
            nome: data.nome,
            telefone: data.telefone,
            parede: data.parede,
            altura_parede: data.altura_parede,
            tecido: data.tecido,
            instalacao: data.instalacao,
            observacoes: data.observacoes,
            endereco: data.endereco,
            timestamp: new Date().toISOString()
        });

        // TODO: Implementar envio de email usando um serviço como:
        // - Nodemailer
        // - SendGrid
        // - Resend
        // - AWS SES

        // Por enquanto, retornar sucesso
        return NextResponse.json({
            status: 'success',
            message: 'Orçamento recebido com sucesso',
            data: {
                nome: data.nome,
                telefone: data.telefone
            }
        });

    } catch (error) {
        console.error('❌ Erro ao processar orçamento:', error);
        return NextResponse.json(
            { status: 'error', message: 'Erro ao processar orçamento' },
            { status: 500 }
        );
    }
}
