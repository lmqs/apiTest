require('dotenv').config();
// var https = require('https');
const fs = require('fs')

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json()); //envia e recebe formado json



server.use(fileupload());
//pasta pública, para imagens, icones etc (usado tb para upload), consigo acessar com link direto
server.use('/api', routes);


server.use('/api', express.static(__dirname + './../public'));


/**testar isso aqui depois, passando o endereço absoluto (endereço completo da pasta public) */
// server.use(path.join(__dirname, '../public'));




/**caso não encontre nenhuma rota disponível, ele entra nesse midleware */
// server.use( (req,res) => {
//     res.status(404).send('Página não encontrada');
// });



server.listen(process.env.PORT || 5000, () => {
    console.log(`servidor rodando em http://localhost:${process.env.PORT}`)
});