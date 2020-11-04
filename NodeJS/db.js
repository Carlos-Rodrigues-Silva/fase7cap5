const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/estacione', (err) => {
    if(!err){
        console.log('Conexão com o banco de dados bem sucedida');
    }
    else{
        console.log('Erro ao se conectar com banco de dados : ' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;