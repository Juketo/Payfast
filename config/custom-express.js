var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../servicos/logger')

module.exports = function()
{
    var app = express();

    // intercepta no momento das requisições para logar
    app.use(morgan('common', {
        stream: {
            write: function(mensagem){
                logger.info(mensagem);
            }
        }
    })); 

    // ensina express a fazer requisição html encoded (formato default navegador)
    app.use(bodyParser.urlencoded({extended: true})); 
    // ensina express a fazer requisição JSON
    app.use(bodyParser.json()); 

    app.use(expressValidator());

    consign().include('controllers')
             .then('persistencia')
             .then('servicos')
             .into(app);

    return app;
}