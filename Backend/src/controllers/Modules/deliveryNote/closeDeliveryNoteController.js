import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js'; // Modelo para insertar el albarán
import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js';
import { success, errorResponse } from '../../../utils/success.js';

import { getDBPool } from '../../../db/getPool.js';

export const closeDeliveryNoteController = async (req, res, next) => {
  const pool = getDBPool(); // Obtener la conexión con la base de datos.

  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchema, req.body);

    const { delivery_status } = req.body;
    const { id_note } = req.params;

    if (delivery_status === 'delivered') {
      // Si el estado de entrega es delivered, enviar un error a cliente
      res
        .status(400)
        .json(errorResponse({ message: 'El producto ha sido entregado' }));
      return;
    }

    // Llamar el id_note especifico
    const [closeDelivery] = await pool.query(
      `SELECT id_note FROM DeliveryNotes WHERE id_note = ?`,
      [id_note]
    );

    // Actualizar el estado del albarán
    const query = `
        UPDATE DeliveryNotes
        SET delivery.status = ?, created_at = NOW()
        WHERE id_note = ?
        `;

    await pool.query(query, [delivery_status, id_note]);

    // Mensaje al cliente para cerrando la operación exitosamente.
    res
      .status(200)
      .json(success({ message: 'Operación de entrega cerrada exitosamente' }));
  } catch (error) {
    next(error);

    // capturar cualquier error y enviar enviamos respuesta con el error al cliente
    // console.error('Error al cerrar la operación de entrega:', error);
    //res.status(500).json(errorResponse({ message: 'Error interno del servidor'}));
  }
};
