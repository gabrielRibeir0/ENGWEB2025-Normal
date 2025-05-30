var Musica = require('../models/musicas');

module.exports.getInterpretes = () => {
    return Musica.aggregate([
            {
                $group: {
                    _id: "$interprete",
                    pais: { $first: "$pais" }
                }
            },
            {
                $project: {
                    nome: "$_id",
                    pais: 1,
                    _id: 0
                }
            },
            {
                $sort: { nome: 1 }
            }
        ])
        .exec();
}

module.exports.getMusicas = () => {
    return Musica.find({})
        .sort({ titulo: 1 })
        .exec();
}
module.exports.getMusicasByEdicao = (ed_id) => {
    return Musica.find({ id_edicao : ed_id })
        .sort({ titulo: 1 })
        .exec();
    }

module.exports.insertMany = (musicasArray) => {
  return Musica.insertMany(musicasArray);
}

module.exports.deleteMany = (filtro) => {
  return Musica.deleteMany(filtro);
}