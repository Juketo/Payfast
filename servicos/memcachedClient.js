var memchached = require('memcached');

module.exports = function()
{
    return createMemcachedClient;
}

function createMemcachedClient()
{
    var cliente = new memcached('localhost:11211', 
    {
        retries: 10, //nº retentativas por request
        retry: 10000, // tempo de espera entre falha de server e tentativa pra subir
        remove: true, // autoriza a remover do cluster um nó que está morto
    });

    return cliente;
}