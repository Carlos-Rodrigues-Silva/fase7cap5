const mongoose = require('mongoose');

var Estacionamento = mongoose.model('Estacionamento', {
    nomeLogradouro: {type: String},
    numero: {type: String},
    cep: {type: String},
    bairro: {type: String},
    cidade: {type: String},
    estado: {type: String}
});

module.exports = {Estacionamento};