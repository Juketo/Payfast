/* buffer mode
 
 Faz com que todos os dados oriundos da requisição fiquem armazenados em um buffer.
 Para que então seja passado para algum callback tão somente todo o recurso tenha 
 sido lido.
*/

/* stream mode
Processa os dados conforme eles fossem chegando, ao invés de ter que esperar a leitura 
do dado por inteiro.

Não usa callback.

Pipe a partir de uma funcao anterior, deve receber como entrada a saída da função de 
onde foi invocada.

Utilizar Streams nessa situação reduz em muito o uso de memória da aplicação.

.on('finish') para saber quando termina

Não existem mais callbacks, e queremos que essas execuções sejam assíncronas. O ideal 
é que fosse criado um pipeline de execuções. A função dele é a de criar um novo canal 
para que um novo fluxo possa ser criado e passe a executar ações concorrentemente à que 
já estava sendo executada e, possivelmente trabalhando sobre o mesmo conjunto de dados.
.pipe(fs.createWriteStream('arquivo.txt'))
*/