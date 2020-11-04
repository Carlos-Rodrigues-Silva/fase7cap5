const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Estacionamento} = require('../models/estacionamento');

// localhost:3000/estacionamentos/
// Obter todos os endereços de estacionamento
router.get('/', (req, res) => {
    Estacionamento.find((err, docs) => {
        if(!err) {res.send(docs); }
        else {console.log('Erro em receber estacionamentos :' + JSON.stringify(err, undefined, 2));}
    });
});

// Obter endereço de estacionamento com base no id
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`Nenhum registro com o id especificado : ${req.params.id}`);
    Estacionamento.findById(req.params.id, (err, doc) => {
        if (!err) {res.send(doc); }
        else {console.log('Erro ao retornar endereço de estacionamento ' + JSON.stringify(err, undefined, 2));}
    });
});

// Cadastrar endereço de estacionamento
router.post('/', (req, res) => {
    var enderecoEstacionamento = new Estacionamento({
        nomeLogradouro: req.body.nomeLogradouro,
        numero: req.body.numero,
        cep: req.body.cep,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
    });
    enderecoEstacionamento.save((err, doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Erro ao salvar endereço de estacionamento ' + JSON.stringify(err, undefined, 2));}
    });
});

// Atualizar endereço de estacionamento
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`Nenhum registro com o id especificado : ${req.params.id}`);

    var enderecoEstacionamento = {
        nomeLogradouro: req.body.nomeLogradouro,
        numero: req.body.numero,
        cep: req.body.cep,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
    };
    Estacionamento.findByIdAndUpdate(req.params.id, { $set: enderecoEstacionamento}, {new: true}, (err, doc) => {
        if (!err) {res.send(doc); }
        else {console.log('Erro ao atualizar o endereço de estacionamento :' + JSON.stringify(err, undefined, 2));}
    });
});

// Deletar endereço de estacionamento 
router.delete('/:id', (req, res) => {
if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`Nenhum registro com o id especificado : ${req.params.id}`);

    Estacionamento.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) { res.send(doc);}
        else {console.log('Erro ao deletar endereço de estacionamento ' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;