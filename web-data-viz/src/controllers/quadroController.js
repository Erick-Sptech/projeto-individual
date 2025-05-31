var quadroModel = require("../models/quadroModel");

function listar(req, res) {
    quadroModel.listar().then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function(erro) {
        console.log("Erro Controller: ", erro);
        res.status(500).json(erro.sqlMessage)
    })
}

function enviarAvaliacao(req, res) {
    var avaliacao = req.body.avaliacaoServer
    var id_quadro = req.body.id_quadroServer
    var id_usuario = req.body.id_usuarioServer

    if (avaliacao == undefined || id_quadro == undefined || id_usuario == undefined) {
        res.status(400).send('Os dados não chegaram corretamente')
        console.log(`conteudo: ${avaliacao}, id_quadro: ${id_quadro}, id_usuario: ${id_usuario}`);
    }
    else {
        quadroModel.enviarAvaliacao(avaliacao, id_quadro, id_usuario)
        .then(
            function (resultado) {
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
    }
}

function enviarComentario(req, res) {
    var conteudo = req.body.conteudoServer
    var id_quadro = req.body.id_quadroServer
    var id_usuario = req.body.id_usuarioServer

    if (conteudo == undefined || id_quadro == undefined || id_usuario == undefined) {
        res.status(400).send('Os dados não chegaram corretamente')
        console.log(`conteudo: ${conteudo}, id_quadro: ${id_quadro}, id_usuario: ${id_usuario}`);
    }
    else {
        quadroModel.enviarComentario(conteudo, id_quadro, id_usuario)
        .then(
            function (resultado) {
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
    }
    
}
module.exports = {
    listar,
    enviarComentario,
    enviarAvaliacao
}