
const express = require('express');
const router = express.Router();
const ApiController = require('./controllers/ApiController');

router.get('/ping', ApiController.ping);
// router.get('/proventos' , ApiController.proventos);
// router.get('/proventosFiltro' , ApiController.proventosFiltro);
// router.get('/provento/:id' , ApiController.umProvento);

// router.get('/ativo/:id' , ApiController.umAtivo);

// GET api/proventos -> 
// GET api/comunicados -> 



module.exports = router;