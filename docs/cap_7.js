// excabilidade via adição de threads
var cluster = require('cluster'); // já no core do node
// nodsjs trabalha muito bem com somente uma thread, entretanto, pode trabalhar com mais

// ver file cluster.js
cluster.fork(); // cria nova thread filha (slave) que executa o mesmo arquivo
// somente master pode invocar o fork

// o master faz automaticamente a organização de requisição entre as slaves, 
// garantindo, por exemplo, que o código só será executado uma vez, 
// mesmo quando chamado 4 núcleos

// Se o cluster não for o master, ele deve somente executar o index.js
// subindo o objeto do express e ficando no ar para receber requisições.