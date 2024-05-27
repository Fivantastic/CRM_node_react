const { selectShipmentsByUserIdService } = require('../../../services/Modules/shipment/selectShipmentsByUserIdService.js');
/* Este import esta mal por que estamos usando S6 con import. No con require */

// Controlador para obtener envíos por repartidor
const shipmentListByUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const shipments = await selectShipmentsByUserIdService(userId);
    res.send({
      status: 'ok',
      data: shipments,
    });
  } catch (error) {
    next(error);
  }
};

const shipmentUpdateController = async (req, res, next) => { // Y esta linea que hace ???
  // Implementación del controlador para actualizar envíos...
};

module.exports = {
  shipmentUpdateController,
  shipmentListByUserController,
};
