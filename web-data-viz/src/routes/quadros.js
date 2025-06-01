var express = require("express");
var router = express.Router();

var quadroController = require("../controllers/quadroController");

router.get("/listar", function (req, res) {
    quadroController.listar(req, res);
});

router.get("/buscarDadosKpiQuadros", function (req, res) {
    quadroController.buscarDadosKpiQuadros(req, res);
});

router.get("/buscarUsuarioComentario", function (req, res) {
    quadroController.buscarUsuarioComentario(req, res);
});

router.get("/buscarUltimoComentario", function (req, res) {
    quadroController.buscarUltimoComentario(req, res);
});

router.post("/enviarComentario", function (req, res) {
    quadroController.enviarComentario(req, res);
});

router.post("/enviarAvaliacao", function (req, res) {
    quadroController.enviarAvaliacao(req, res);
});

router.post("/buscarComentarios", function (req, res) {
    quadroController.buscarComentarios(req, res);
});

router.post("/somarVisita", function (req, res) {
    quadroController.somarVisita(req, res);
});

module.exports = router;