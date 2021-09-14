
const express = require('express');
const router = express.Router();
const ApiController = require('./controllers/ApiController');

router.get('/ping', ApiController.ping);
router.get('/proventos/:tipo/:itensPagina/:page' , ApiController.proventos);
router.get('/relatorios/:tipo/:itensPagina/:page' , ApiController.relatorios);
router.get('/ipos/:tipo/:itensPagina/:page' , ApiController.IPOs);
router.get('/todos/:itensPagina/:page' , ApiController.verTodos);


router.get('/indicesAtual' , ApiController.indicesAtual);
router.get('/geral' , ApiController.geral);





module.exports = router;