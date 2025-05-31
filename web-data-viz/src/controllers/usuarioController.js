var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    usuarioModel.autenticar().then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function(erro) {
        console.log("Erro Controller: ", erro);
        res.status(500).json(erro.sqlMessage)
    })
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer
    var email = req.body.emailServer
    var senha = req.body.senhaServer

    if (nome == undefined) {
        res.status(400).send("Nome está indefinido")
    }
    else if (email == undefined) {
        res.status(400).send("Email está indefinido")
    }
    else if (senha == undefined) {
        res.status(400).send("Senha está indefinido")
    }

    usuarioModel.cadastrar(nome, email, senha).then(function(resposta) {
        res.status(200).send("Usuário cadastrado")
    }).catch(function(erro) {
        res.status(500).json(erro.sqlMessage)
    })
}   

module.exports = {
    autenticar,
    cadastrar
}