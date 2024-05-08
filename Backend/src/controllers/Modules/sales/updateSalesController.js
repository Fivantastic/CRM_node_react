import { selectCustomerModel } from '../../../models/Modules/sales/selectCustomerModel.js';
import { selectProductModel } from '../../../models/Modules/sales/selectProductModel.js';
import { selectSaleProducModel } from '../../../models/Modules/sales/selectSaleProducModel.js';
import { updateSaleProductModel } from '../../../models/Modules/sales/updateSaleProductModel.js';
import { updateSaleProductSchema } from '../../../schemas/Modules/sale/updateSaleProductSchema.js';
import { updateSalesService } from '../../../services/Modules/sales/updateSalesService.js';
import { limitedStock } from '../../../services/error/errorService.js';
import { controlStockProductService } from '../../../services/product/controlStockProductService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const updateSalesController = async (req, res, next) => {
  // Todo: All
  try {
    const id_sale = req.params.id_sale;
    const { product, quantity, customer, operation_status } = req.body;

    // Validamos el body
    await validateSchemaUtil(updateSaleProductSchema, req.body);

    // Obtengo el id del producto
    const seachProduct = await selectProductModel(product);

    // Obtengo el id del saleProducto
    const seachSaleProductId = await selectSaleProducModel(id_sale);

    // Obtengo el id del customer
    const seachCustomer = await selectCustomerModel(customer);

    //compruebo la cantidad del producto y si hay stock
    const checkQuantity = await controlStockProductService(
      seachProduct.id_product
    );

    const stock = JSON.parse(JSON.stringify(checkQuantity));

    if (stock < quantity) {
      limitedStock(quantity);
    }

    // Actualizo el saleProduct
    await updateSaleProductModel(
      seachSaleProductId.saleProduct_id,
      seachProduct.id_product,
      quantity
    );

    // Insertar que solo el user que la creó la modifique?
    const updatedSale = await updateSalesService(
      id_sale,
      seachSaleProductId.id_saleProduct,
      seachCustomer.id_customer,
      operation_status
    );

    res.status(200).send({
      status: 'ok',
      message: updatedSale,
    });
  } catch (error) {
    next(error);
  }
};
