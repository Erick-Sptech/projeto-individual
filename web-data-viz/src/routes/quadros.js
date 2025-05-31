var express = require("express");
var router = express.Router();

var quadroController = require("../controllers/quadroController");

router.get("/listar", function (req, res) {
    quadroController.listar(req, res);
});

router.post("/enviarComentario", function (req, res) {
    quadroController.enviarComentario(req, res);
});

router.post("/enviarAvaliacao", function (req, res) {
    quadroController.enviarAvaliacao(req, res);
});

module.exports = router;