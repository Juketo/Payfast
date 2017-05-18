var fs = require('fs');

// stream mode
fs.createReadStream('imagem.gif')
  .pipe(fs.createWriteStream('imagem-com-stream.gif'))
  .on('finish', function()
  {
      // esse callback só entra quando o create e o pipe terminarem
      console.log('arquivo escrito com stream');
  }); 