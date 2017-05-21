// REST é 

// verbos mais famosos do http: delete, post, get e put (altera)

// HATEOAS (hypermedia): Usando hypermedia como motor de estados da aplicação.
// Response: (dois) possíveis caminhos que serão tomados pelo user.
// Ele não será obrigado a seguir.
var response = {
    dados_do_pagamento: pagamento,
    links: [ 
        {
            href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
            rel: 'confirmar', // nome da relação
            method: 'PUT'
        },
        {
            href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
            rel: 'cancelar', // nome da relação
            method: 'DELETE'
        }
    ]
};
res.status(201).json(response);

// consumir um serviço REST (como em outro nível do projeto)
'npm install --save restify'

// webservice SOAP correios -> wsdl
// wsdl trabalha sempre com XML, normalmente em http
'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx'
// CalcPrazo recebe 3 parâmetros (nCdServico, aCepOrigem e aCepDestino) todos strings
// tem que passar um XML que implementa esses 3

// para falar com SOAP precisa instalar o pacote:
'npm install soap --save'

// soap, sempre que invoca uma function, obrigatoriamente tem que fazer um get do wsdl

/* REST não é uma especificação nem uma tecnologia, é um modelo arquitetural.
Usamos os verbos disponíveis (GET, POST, PUT e outros) para manipular recursos.
Aproveitar ao máximo o protocolo de comunicação (HTTP).
Protocolos menos complexos. As requisições são menores. Trabalhamos com menos protocolos.

URI (Uniform Resource Identifier): cada recurso tem um identificador único perante os usúarios.

Sistemas Restful (POST -> INSERT, GET -> SELECT, PUT -> UPDATE, DELETE -> DELETE).

Hipermídia: representações devem ser interligadas umas com a outras, seguindo os 
princípios RESTful.
*/

/*
HATEOAS: um recurso informe ao cliente quais os próximos passos ou relacionamentos, e 
atrás de cada relacionamento há um serviço transformador de dados. Ex:

{"id":3,"status":"CRIADO","valor":29.9,
  "links":[
    {"rel":"confirmar","uri":"/pagamentos/pagamento/3","method":"PUT"},
    {"rel":"cancelar","uri":"/pagamentos/pagamento/3","method":"DELETE"}
  ]
}
{"id":3,"status":"CONFIRMADO","valor":29.9,
  "links":[
    {"rel":"self","uri":"/pagamentos/pagamento/3","method":"GET"}
  ]
}
*/

/*
Web Services SOAP é baseado em HTTP e XML.

*/