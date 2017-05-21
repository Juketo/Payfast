var cluster = require('cluster');
var os = require('os'); // pega o sistema operacional

var cpus = os.cpus();
//console.log(cpus);

console.log('executando thread');

if (cluster.isMaster)
{
    console.log('thread master');

    cpus.forEach(function(){
        cluster.fork();
    });

    cluster.on('listening', function(worker){
        console.log('cluster conectado ' + worker.process.pid);
    });

    cluster.on('exit', worker => { // se alguém saiu inesperadamente
        console.log('cluster %d desconectado ' + worker.process.pid);
        cluster.fork();
    }); 

    //cluster.fork(); // cria nova thread filha (slave) que executa o mesmo arquivo
    // somente master pode invocar o fork
}
else
{
    console.log('thread slave');
    require('./index.js')
}