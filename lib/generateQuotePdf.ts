import PDFDocument from 'pdfkit';

interface QuoteData {
    nome: string;
    telefone: string;
    parede: string;
    altura_parede: string;
    tecido: string;
    instalacao: string;
    observacoes?: string;
    endereco?: string;
}

export async function generateQuotePdf(data: QuoteData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        // Header
        // Tenta usar uma cor dourada para o título se possível, ou preto padrão
        doc.fillColor('#C9A961').fontSize(26).font('Helvetica-Bold').text('CORTINAS BRESSER', { align: 'center' });
        doc.fillColor('black').moveDown(0.5);
        doc.fontSize(16).font('Helvetica').text('Solicitação de Orçamento', { align: 'center' });
        doc.moveDown();

        // Separator
        doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#C9A961').stroke();
        doc.moveDown(2);

        // Date
        doc.fillColor('black').fontSize(10).text(`Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, { align: 'right' });
        doc.moveDown(2);

        // Content Helper
        const addSection = (title: string, content: string[]) => {
            doc.fontSize(14).font('Helvetica-Bold').fillColor('#C9A961').text(title);
            doc.moveDown(0.5);
            doc.fontSize(12).font('Helvetica').fillColor('black');
            content.forEach(line => doc.text(line));
            doc.moveDown(1.5);
        };

        addSection('Dados do Cliente', [
            `Nome: ${data.nome}`,
            `Telefone: ${data.telefone}`
        ]);

        addSection('Detalhes do Orçamento', [
            `Dimensões da Parede: ${data.parede}m (L) x ${data.altura_parede}m (A)`,
            `Tecido Escolhido: ${data.tecido}`,
            `Tipo de Instalação: ${data.instalacao}`
        ]);

        if (data.endereco) {
            addSection('Endereço de Instalação', [data.endereco]);
        }

        if (data.observacoes) {
            addSection('Observações', [data.observacoes]);
        }

        // Footer
        const footerY = 700; // Posição fixa próxima ao rodapé
        doc.fontSize(10).fillColor('gray');
        doc.text('Cortinas Bresser - Especialistas em Cortinas Sob Medida', 50, footerY, { align: 'center', width: 500 });
        doc.text('Rua Bresser, 1084 - Brás - São Paulo/SP', { align: 'center', width: 500 });
        doc.text('Tel: (11) 2692-7865 | WhatsApp: (11) 95661-6041', { align: 'center', width: 500 });

        doc.end();
    });
}
