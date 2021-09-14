require('dotenv').config();
const fs = require('fs')

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json())



server.use(fileupload());
server.use('/api', routes);
server.use('/api', express.static(__dirname + './../public'));


server.listen(process.env.PORT || 5000, () => {
    console.log(`servidor rodando em http://localhost:${process.env.PORT}`)
});