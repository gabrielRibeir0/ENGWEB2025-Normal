var express = require('express');
var router = express.Router();
var Musica = require('../controllers/musicas');

/* GET paises. */
router.get('/', function(req, res, next) {
  Musica.getInterpretes()
    .then(dados => res.jsonp(dados)) //default status 200
    .catch(erro => res.status(500).jsonp(erro));
});


module.exports = router;