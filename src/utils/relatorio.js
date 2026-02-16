const fs = require('fs');
const path = require('path');

function gerarRelatorio(dados) {
    const dataHora = new Date();

    const conteudo = `
=======================================================================
Relatório de Processamento - ${dataHora.toLocaleString('pt-BR')}
=======================================================================

Sincronização de dados:
- Quantidade de registros processados: ${dados.totalProcessados}

-----------------------------------------------------------------------------------------
- Registros adicionados no banco de dados: ${preparaLinhaRelatorio(dados.adicionados)}
-----------------------------------------------------------------------------------------
- Registros atualizados no banco de dados: ${preparaLinhaRelatorio(dados.atualizados)}
-----------------------------------------------------------------------------------------
- Registros ignorados (menores de 18): ${preparaLinhaRelatorio(dados.ignorados)}
-----------------------------------------------------------------------
Detalhes da execução:\n${dados.detalhes}
=======================================================================
`;
    const caminhoArquivo = path.join(__dirname, `../../relatorio_processamento_${dataHora.toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).trim().replace(/:/g, '_')}.txt`);
    fs.writeFileSync(caminhoArquivo, conteudo);
    console.log(`Relatório gerado com sucesso: ${caminhoArquivo}`);
}

function preparaLinhaRelatorio(usuarios) {
    let linha = 1;
    return `${usuarios.length}
${usuarios.map(usuario => `${linha++} - Nome completo: ${usuario.first_name} ${usuario.last_name}, E-mail: ${usuario.email}, Idade: ${usuario.age}`).join('\n')}
    `;
}

module.exports = { gerarRelatorio };