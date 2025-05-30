var express = require('express');
var router = express.Router();
var Musica = require('../controllers/musicas');

/* GET . */

router.get('/', function(req, res, next) {
  Musica.getMusicas()
    .then(dados => res.jsonp(dados)) //default status 200
    .catch(erro => res.status(500).jsonp(erro));
});

router.get('/:ed_id', function(req, res, next) {
  Musica.getMusicasByEdicao(req.params.ed_id)
    .then(dados => res.jsonp(dados)) //default status 200
    .catch(erro => res.status(500).jsonp(erro));
});


module.exports = router;