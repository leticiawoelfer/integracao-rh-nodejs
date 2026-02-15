const apiService = require('./services/apiService');
const usuarioRepository = require('./repositories/usuarioRepository');
const relatorio = require('./utils/relatorio');

async function executarIntegracao() {
    try {
        let log = `${dataLog()} - Iniciando Requisição na API.\n`;
        const usuarios = await apiService.buscarUsuarios();
        log += `${dataLog()} - Sucesso: ${usuarios.length} usuários recebidos da API.\n`;

        const usuariosFiltrados = usuarios.filter(user => maiorDe18(user.dob));
        log += `${dataLog()} - filtrados usuários maiores de 18 anos.\n`;

        log += `${dataLog()} - Iniciando a persistência no banco de dados.\n`;
        const processamentoBanco = await usuarioRepository.salvarUsuarios(usuariosFiltrados);
        log += `${dataLog()} - Conectado ao banco de dados SQLite.\n`;
        log += `${dataLog()} - Persistência concluída com sucesso.`;

        const dadosRelatorio = {
            totalProcessados: usuarios.length,
            totalFiltrados: usuariosFiltrados.length,
            adicionados: processamentoBanco.adicionados,
            atualizados: processamentoBanco.atualizados,
            detalhes: log
        };
        relatorio.gerarRelatorio(dadosRelatorio);

    } catch (error) {
        console.error('Erro ao executar a integração:', error.message);
    }
}

function maiorDe18(dob) {
    const dataNasc = new Date(dob);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    if (hoje.getMonth() < dataNasc.getMonth() || (hoje.getMonth() === dataNasc.getMonth() && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }
    return idade >= 18;
}

function dataLog() {
    return new Date().toLocaleString('pt-BR');
}

executarIntegracao();