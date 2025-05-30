var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicoes');

/* GET paises. */
router.get('/', function(req, res, next) {
  if(req.query.papel == 'org') {
    Edicao.getPaisesOrg()
      .then(dados => res.jsonp(dados)) //default status 200
      .catch(erro => res.status(500).jsonp(erro));
  }
  else if(req.query.papel == 'venc') {
    Edicao.getPaisesVenc()
      .then(dados => res.jsonp(dados)) //default status 200
      .catch(erro => res.status(500).jsonp(erro));
  }
});


module.exports = router;