var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:25000/edicoes')
  .then(response => {
    res.render('index', { edicoes: response.data });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  });

});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  axios.get(`http://localhost:25000/edicoes/${id}`)
  .then(response => {
    axios.get(`http://localhost:25000/musicas/${id}`)
  .then(musicasResponse => {
      response.data.musicas = musicasResponse.data;
      res.render('edicao', { edicao: response.data, musicas: musicasResponse.data });
    })
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  });
});

module.exports = router;
