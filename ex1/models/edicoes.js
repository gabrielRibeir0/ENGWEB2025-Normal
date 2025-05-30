const mongoose = require('mongoose');

const edicoesSchema = new mongoose.Schema({
    _id: String,
    organizacao: String,
    anoEdicao: String,
    vencedor: String
}, {versionKey: false});

module.exports = mongoose.model('edicoes', edicoesSchema);