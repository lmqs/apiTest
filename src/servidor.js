require('dotenv').config();
var https = require('https');
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
server.use(express.static('public'));
// server.use('/api2', routes);


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const httpsOptions = {
  key: fs.readFileSync('./security/certificado.key'),
  cert: fs.readFileSync('./security/certificado.cert')
}
const server2 = https.createServer(httpsOptions, server)
  .listen(5001, () => {
    console.log(`servidor rodando em http://localhost:5001`)
  });


 