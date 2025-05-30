const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:pais', async function(req, res) {
  const pais = req.params.pais;

  try {
    // Vai buscar todas as edições
    const edicoesRes = await axios.get('http://localhost:25000/edicoes');
    const edicoes = edicoesRes.data;

    // Vai buscar todas as músicas (interpretações)
    const musicasRes = await axios.get('http://localhost:25000/musicas');
    const todasMusicas = musicasRes.data;

    // Participações do país
    const participacoes = todasMusicas
      .filter(m => m.pais === pais)
      .map(m => {
        const ed = edicoes.find(e => e._id === m.id_edicao);
        return {
          id_edicao: m.id_edicao,
          anoEdicao: ed ? ed.anoEdicao : '?',
          titulo: m.titulo,
          interprete: m.interprete,
          vencedor: ed?.vencedor === pais
        };
      });

    // Edições organizadas pelo país (filtrar manualmente)
    const organizacoes = edicoes
      .filter(e => e.organizacao === pais)
      .map(e => ({
        id: e._id,
        anoEdicao: e.anoEdicao
      }));

    res.render('pais', {
      pais,
      participacoes,
      organizacoes
    });

  } catch (erro) {
    res.status(500).send('Erro ao obter dados do país: ' + erro.message);
  }
});

module.exports = router;
