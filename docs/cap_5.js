console.log(resultado); // automaticamente é feito um JSON.stringify(resultado)
// quando tem mais de um valor recebido, ele nao faz o stringify, que precisa ser manual
console.log('pagamento encontrado: ' + JSON.stringify(resultado));

// memchached serve para guardar consultas ao banco em memória
// versões adaptada para windows 
/*
    http://code.jellycan.com/files/memcached-1.2.5-win32-bin.zip
    http://code.jellycan.com/files/memcached-1.2.6-win32-bin.zip
    http://downloads.northscale.com/memcached-win32-1.4.4-14.zip
    http://downloads.northscale.com/memcached-win64-1.4.4-14.zip
    http://downloads.northscale.com/memcached-1.4.5-x86.zip
    http://downloads.northscale.com/memcached-1.4.5-amd64.zip
*/

// depois de baixar, tem que subí-lo
'memcached -vv'

// na sequencia, tem que habilitar usar no nodejs
'npm install --save memcached'

// configurar o Memcached para já executar sempre que o Windows iniciar (não fiz)
// schtasks /create /sc onstart /tn memcached /tr "'c:\memcached\memcached.exe' -m 512"
// para cancelar
// schtasks /delete /tn memcached

// funcionamento: checar aquivos memcachedClient.js e Pagamento.js