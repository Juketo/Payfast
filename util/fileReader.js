var fs = require('fs');

// buffer mode
fs.readFile('imagem.gif', function(error, buffer)
{
    console.log('arquivo lido');

    fs.writeFile('imagem2.jpg', buffer, function(err)
    {
        console.log('arquivo escrito');
    });
});