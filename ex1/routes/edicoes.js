var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicoes');

/* GET Edicoes. */
router.get('/', function(req, res, next) {
  if(req.query.org) {
    Edicao.getEdicoesByOrganizacao(req.query.org)
      .then(dados => res.jsonp(dados)) //default status 200
      .catch(erro => res.status(500).jsonp(erro));
  }
  else{
    Edicao.getEdicoes()
      .then(dados => res.jsonp(dados)) //default status 200
      .catch(erro => res.status(500).jsonp(erro));
  }
});

//GET _ by id
router.get('/:id', function(req, res, next) {
  Edicao.getEdicaoById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});


//POST inserir novo
router.post('/', function(req, res, next) {
  Edicao.insert(req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

//PUT atualizar info
router.put('/:id', function(req, res, next) {
  Edicao.update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

//DELETE
router.delete('/:id', function(req, res, next) {
  Edicao.delete(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});


module.exports = router;