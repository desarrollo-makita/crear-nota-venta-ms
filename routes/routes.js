const express = require('express');
const router = express.Router();
const { crearDocumentoNotaVenta } = require('../controllers/crearDocumentoNotaVentaControllers');

router.post('/crear-documento-nota-venta', crearDocumentoNotaVenta);

module.exports = router;
