const mongoose = require('mongoose');

const musicasSchema = new mongoose.Schema({
    _id: String,
    id_edicao: String,
    titulo: String,
    link: String,
    compositor: String,
    letra: String,
    interprete: String,
    pais: String,
}, {versionKey: false});

module.exports = mongoose.model('musicas', musicasSchema);