const mongoose = require("mongoose");  //importando o mongoose

const pessoasModel = new mongoose.Schema({ //criando nosso modelo do banco
    nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
    altura: { type: Number, required: true },
    idade: { type: Number },
    dataCriacao: { type: Date, default: Date.now } //default, valor padrao caso nao seja passado
});

const Pessoa = mongoose.model("Pessoas",pessoasModel); // a criacao do modelo na colection Pessoas

module.exports = Pessoa; //exportando o modelo pronto