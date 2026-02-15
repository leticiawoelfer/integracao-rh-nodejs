const fs = require('fs');
const path = require('path');

function gerarRelatorio(dados) {
    const dataHora = new Date();

    const conteudo = `
=======================================================================
Relatório de Processamento - ${dataHora.toLocaleString('pt-BR')}
-----------------------------------------------------------------------
Sincronização de dados:
- Quantidade de registros processados: ${dados.totalProcessados}
- Registros adicionados no banco de dados: ${dados.adicionados}
- Registros atualizados no banco de dados: ${dados.atualizados}
- Registros ignorados (menores de 18): ${dados.totalProcessados - dados.totalFiltrados}
-----------------------------------------------------------------------
Detalhes da execução:\n${dados.detalhes}
=======================================================================
`;
    const caminhoArquivo = path.join(__dirname, `../../relatorio_processamento_${dataHora.toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).trim().replace(/:/g, '_')}.txt`);
    fs.writeFileSync(caminhoArquivo, conteudo);
}

module.exports = { gerarRelatorio };