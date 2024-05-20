const { selectShipmentsByUserIdService } = require('../../../services/Modules/shipment/selectShipmentsByUserIdService.js');

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

const shipmentUpdateController = async (req, res, next) => {
  // Implementación del controlador para actualizar envíos...
};

module.exports = {
  shipmentUpdateController,
  shipmentListByUserController,
};
