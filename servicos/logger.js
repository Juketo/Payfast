var winston = require('winston');
var fs = require('fs');

if (!fs.existsSync('logs')) // cria a pasta logs se não existir
{
    fs.mkdirSync('logs');
}

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            leve: 'info',
            filename: 'logs/payfast.log',
            maxsize: 100000, // 100mb
            maxFiles: 10
        })
    ]
});

// logger.log('info', 'Log utilizando winston e info');
// logger.info('log do info');