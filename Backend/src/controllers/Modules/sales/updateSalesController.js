import { updateSaleProductSchema } from '../../../schemas/Modules/sale/updateSaleProductSchema.js';
import { updateSalesService } from '../../../services/Modules/sales/updateSalesService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const updateSalesController = async (req, res, next) => {
  try {
    const id_sale = req.params.id_sale;
    // Validamos el body
    await validateSchemaUtil(updateSaleProductSchema, req.body);
    
    // Actualizamos la venta de producto en la base de datos
     const updatedSale = await updateSalesService(id_sale, req.body);

    res.status(200).send({
      status: 'ok',
      message: "Venta actualizada correctamente",
      data: updatedSale,
    });
  } catch (error) {
    next(error);
  }
};
