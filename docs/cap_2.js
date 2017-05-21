// para ensinar a receber JSON
'npm install --save body-parser'
app.use(bodyParser.json());

// para persistir no banco
'npm install --save mysql'
// depois se cria o "connectionFactory" e o "pagamentoDao"

/* criar o banco

create database payfast;
use payfast;
CREATE TABLE `pagamentos` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
       `forma_de_pagamento` varchar(255) NOT NULL,
       `valor` decimal(10,2) NOT NULL,
       `moeda` varchar(3) NOT NULL,
       `status` varchar(255) NOT NULL,
       `data` DATE,
       `descricao` text,
        PRIMARY KEY (id)
       );
*/

// quando tem uma nova pasta no projeto, tem que informar o express via consign:
consign().include('controllers')
            .then('persistencia')
            .into(app);
// dai os dados estarão acessíveis via variável app

'npm install --save express-validator'
var expressValidator = require('express-validator');
app.use(expressValidator());
// para poder usar asserts

/* statusCode

100 Continue: o servidor recebeu a solicitação e o cliente pode continuar a comunicação.
200 Ok: tudo ocorreu como esperado.
201 Created: um novo recurso foi criado no servidor.
204 No content 
301 Moved: a url solicitada foi movida.
400 Bad Request: problemas na requisição do cliente.
404 Not Found: a url solicitada não foi encontrada.
500 Internal Server Error: algo inesperado aconteceu do lado do servidor.
*/

res.location('/pagamentos/pagamento/' + resultado.insertId);
// usado quando se cria algo novo e redireciona
// o próprio mysql já envia o id como resultado

/* Postman: plugin pro Chrome. Envia requisições html
ex: Post -> http://localhost:3000/pagamentos/pagamento - Body (raw) -> Text(JSON)
{
    "forma_de_pagamento": "payfast",
    "valor": "10.87",
    "moeda": "BRL",
    "descricao": "descrição do pagamento"
}

É bom para testar conexão post/get com o banco
*/