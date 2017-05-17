module.exports = function(app)
{
    app.get('/pagamentos', function(req, res)
    {
        console.log('recebida requisicao de teste na porta 3000');
        res.send('ok!');
    });

    app.delete('/pagamentos/pagamento/:id', function(req, res)
    {
        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function()
        {
            if (erro)
            {
                res.status(500).send(erro);
                return;
            }
            else 
            {
                console.log('pagamento cancelado');
                res.status(204).send(pagamento);
            }
        });
    });

    app.put('/pagamentos/pagamento/:id', function(req, res)
    {
        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function()
        {
            if (erro)
            {
                res.status(500).send(erro);
                return;
            }
            else 
            {
                console.log('pagamento atualizado');
                res.send(pagamento);
            }
        });
    });

    app.post('/pagamentos/pagamento', function(req, res)
    {
        req.assert('forma_de_pagamento', 'Forma de pagamento é obrigatório')
                    .notEmpty();
        req.assert('valor', 'valor é obrigatório e deve ser decimal')
                    .notEmpty().isFloat();
        req.assert("moeda", "Moeda é obrigatória e deve ter 3 caracteres")
                    .notEmpty().len(3,3);

        var erros = req.validationErrors();
        if (erros)
        {
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }

        var pagamento = req.body["pagamento"]; //pega só a chave pagamento do body
        console.log('processando requiusição de novo pagamento');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(erro, resultado)
        {
            if (erro)
            {
                console.log('erro ao inserir no banco: ' + erro);
                res.status(500).send(erro);
            }
            else 
            {
                pagamento.id = resultado.insertId;
                console.log('pagamento criado');

                if(pagamento.forma_de_pagamento == 'cartao')
                {
                    var cartao = req.body['cartao'];
                    console.log(cartao);

                    var clienteCartoes = new app.servicos.clienteCartoes();
                    clienteCartoes.autoriza(cartao, 
                                            function(exception, request, response, retorno)
                    {
                        if (exception)
                        {
                            console.log(exception);
                            res.status(400).send(exception);
                            return;
                        }

                        console.log(retorno);

                        res.location('/pagamentos/pagamento/' + pagamento.id);

                        var response = {
                            dados_do_pagamento: pagamento,
                            cartao: retorno,
                            links: [ 
                                {
                                    href: 'http://localhost:3000/pagamentos/pagamento/'
                                        + pagamento.id,
                                    rel: 'confirmar',
                                    method: 'PUT'
                                },
                                {
                                    href: 'http://localhost:3000/pagamentos/pagamento/'
                                        + pagamento.id,
                                    rel: 'cancelar',
                                    method: 'DELETE'
                                }
                            ]
                        };

                        res.status(201).json(retorno);
                        return;
                    });
                }
                else
                {
                    res.location('/pagamentos/pagamento/' + pagamento.id);
                    // usado quando se cria algo novo e redireciona

                    var response = {
                        dados_do_pagamento: pagamento,
                        links: [ 
                        // dois possíveis caminhos que serão tomados pelo user. Não é obrigado
                            {
                                href: 'http://localhost:3000/pagamentos/pagamento/'
                                    + pagamento.id,
                                rel: 'confirmar', // nome da relação
                                method: 'PUT'
                            },
                            {
                                href: 'http://localhost:3000/pagamentos/pagamento/'
                                    + pagamento.id,
                                rel: 'cancelar', // nome da relação
                                method: 'DELETE'
                            }
                        ]
                    };

                    res.status(201).json(response); /*pagamento*/
                }             
                
            }
        });
    });
}