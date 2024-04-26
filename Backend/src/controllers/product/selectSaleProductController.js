import { insertSaleProductModel } from '../../models/products/insertSaleProductModel.js';
import { SaleProductSchema } from '../../schemas/product/SaleProductSchema.js';
import { limitedStock } from '../../services/error/errorService.js';
import { controlStockProductService } from '../../services/product/controlStockProductService.js';
import { selectSaleProductByIdService } from '../../services/product/selectSaleProductByIdService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const selectSaleProductController = async (req, res, next) => {
  try {
    // Obtengo el id del producto
    const productId = req.params.productId;
    const { quantity, description } = req.body;

    // Obtengo el producto
    await selectSaleProductByIdService(productId);

    //validamos el body
    await validateSchemaUtil(SaleProductSchema, req.body);

    //compruebo la cantidad del producto y si hay stock
    const checkQuantity = await controlStockProductService(productId);
    const stock = JSON.parse(JSON.stringify(checkQuantity));

    if (stock < quantity) {
      limitedStock(quantity);
    }

    // colocamos un id de venta
    const saleProduct_id = crypto.randomUUID();

    // Inserto el producto en la base de datos
    await insertSaleProductModel(
      saleProduct_id,
      productId,
      quantity,
      description
    );

    res.status(200).send({
      status: 'ok',
      message: 'venta realizada con exito.!',
      data: { checkQuantity },
    });
  } catch (error) {
    next(error);
  }
};
