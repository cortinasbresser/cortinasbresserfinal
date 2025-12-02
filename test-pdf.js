const { generateQuotePdf } = require('./lib/generateQuotePdf');
const fs = require('fs');

async function test() {
    console.log('Iniciando teste de PDF...');
    try {
        const data = {
            nome: 'Teste User',
            telefone: '11999999999',
            parede: '3.00',
            altura_parede: '2.50',
            tecido: 'Voil',
            instalacao: 'Trilho',
            observacoes: 'Teste de observação'
        };

        const buffer = await generateQuotePdf(data);
        fs.writeFileSync('test_quote.pdf', buffer);
        console.log('PDF gerado com sucesso: test_quote.pdf');
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
    }
}

test();
