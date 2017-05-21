// lib de logs
'npm install --save winston'

// depois executá-lo via
'node logger.js'

// para o express logar automaticamente quando as rotas são requisitadas
'npm install --save morgan'
app.use(morgan('common')); // common = requer a data, origem... tem outros

// funcionamento: checar file logger.js e custom-express.js