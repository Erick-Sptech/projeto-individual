var database = require("../database/config")

function listar() {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        SELECT * FROM quadro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function enviarComentario(conteudo, id_quadro, id_usuario) {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        INSERT INTO comentario (conteudo, id_quadro, id_usuario) VALUE ("${conteudo}", ${id_quadro}, ${id_usuario});
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function enviarAvaliacao(avaliacao, id_quadro, id_usuario) {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        INSERT INTO avaliacao (avaliacao, fkquadro, fkusuario)
        VALUES (${avaliacao}, ${id_quadro}, ${id_usuario})
        ON DUPLICATE KEY UPDATE avaliacao = VALUES(avaliacao);
    `
    // Essa lógica executa o insert em caso de uma nova avalicao e caso ja aja uma avaliacao ele da update
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    enviarComentario,
    enviarAvaliacao
}