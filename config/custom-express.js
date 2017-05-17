var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function()
{
    var app = express();

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