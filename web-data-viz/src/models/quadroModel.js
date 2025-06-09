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

function buscarComentarios(id_quadro) {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        SELECT u.nome, c.conteudo, c.data_comentario FROM comentario c INNER JOIN usuario u ON c.id_usuario = u.idusuario WHERE id_quadro = ${id_quadro} ORDER BY data_comentario ASC, idcomentario DESC;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function somarVisita(id_quadro) {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        UPDATE quadro SET visitas = visitas + 1 WHERE idquadro = ${id_quadro};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosKpiQuadros() {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        select q.nome, 
        (select count(*) from avaliacao a where a.fkquadro = q.idquadro and avaliacao = 1) as qtd_likes,
        (select count(*) from comentario c where c.id_quadro = q.idquadro) as qtd_comentarios,
        visitas
        from quadro q;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function buscarUsuarioComentario() {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        SELECT u.nome FROM usuario u INNER JOIN comentario c ON c.id_usuario = u.idusuario GROUP BY u.nome ORDER BY count(*) DESC LIMIT 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function buscarUltimoComentario() {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        SELECT conteudo FROM comentario WHERE data_comentario = (SELECT MAX(data_comentario) FROM comentario);
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function ordenarRankLikes() {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        SELECT q.nome, sum(a.avaliacao) qtd_likes FROM quadro q LEFT JOIN avaliacao a ON a.fkquadro = q.idquadro GROUP BY q.nome ORDER BY qtd_likes DESC LIMIT 5;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function ordenarRankVisitas() {
    console.log("ACESSEI O QUADRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n")
    var instrucaoSql = `
        SELECT nome, visitas FROM quadro ORDER BY visitas DESC LIMIT 5;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}



module.exports = {
    listar,
    enviarComentario,
    enviarAvaliacao,
    buscarComentarios,
    somarVisita,
    buscarDadosKpiQuadros,
    buscarUsuarioComentario,
    buscarUltimoComentario,
    ordenarRankLikes,
    ordenarRankVisitas
}