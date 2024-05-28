const sql = require('mssql');
const logger = require('../config/logger.js');
const { connectToDatabase, closeDatabaseConnection } = require('../config/database.js');
const moment = require('moment');

/**
 * Prepara los datos para insertar en la tabla pedidosDet.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
async function crearDocumentoNotaVenta(req, res) {
    logger.info(`Iniciamos la funcion crearDocumentoNotaVenta nota de venta`);
    
    const oredenPedido = req.body;
    let result;
    console.log("ordenPedido" , oredenPedido);
    try {
        // Conecta a la base de datos
        await connectToDatabase('DTEBdQMakita');
    
        const { pedido: Correlativo, tipoDocumento: TipoDocumento, codigo_posto: RutCliente } = oredenPedido;
        const request = new sql.Request();
        // Ejecuta el procedimiento almacenado con los parámetros
        result = await request.query`
        EXEC Crea_NotaVenta_GE_Copia 
        @Empresa = 'Makita', 
        @TipoDocumento = ${TipoDocumento.trim()}, 
        @Correlativo = ${Correlativo}, 
        @RutCliente = ${RutCliente}`;
        
        
        // Cierra la conexión a la base de datos
        await closeDatabaseConnection();

        logger.info(`Fin de la funcion crearDocumentoNotaVenta ${JSON.stringify(result)}`);
        result.mensaje = 'Proceso exitoso , se creda nota venta';
        res.status(200).json({mensaje  : result.mensaje});
    } catch (err) {
        // Maneja los errores
        logger.error(`Error al crear la nota de venta:, ${JSON.stringify(err)}`);
        res.status(500).json({ error: `Error en la función crearDocumentoNotaVenta nota venta` });
        throw err;
    }
}



module.exports = {
    crearDocumentoNotaVenta
};
