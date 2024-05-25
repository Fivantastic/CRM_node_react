import { selectCustomerModel } from '../../../models/Modules/sales/selectCustomerModel.js';
import { selectProductModel } from '../../../models/Modules/sales/selectProductModel.js';
import { selectQuantityModel } from '../../../models/Modules/sales/selectQuantityModel.js';
import { insertSaleProductModel } from '../../../models/products/insertSaleProductModel.js';
import { newSaleProductSchema } from '../../../schemas/Modules/sale/newSaleProductSchema.js';
import { insertSalesService } from '../../../services/Modules/sales/insertSalesService.js';
import { limitedStock } from '../../../services/error/errorService.js';
import { controlStockProductService } from '../../../services/product/controlStockProductService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const insertSalesController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newSaleProductSchema, req.body);

    const id_user = req.user.id_user;

    const { product, quantity, customer } = req.body;
    /* console.log(req.body); */

    // Busco el producto
    const seachSaleProduct = await selectProductModel(product);

    // Busco el cliente
    const seachCustomer = await selectCustomerModel(customer);

    //compruebo la cantidad del producto y si hay stock
    const checkQuantity = await controlStockProductService(
      seachSaleProduct.id_product
    );

    const stock = JSON.parse(JSON.stringify(checkQuantity));

    if (stock < quantity) {
      limitedStock(quantity);
    }

    // colocamos un id de producto ha la venta
    const saleProduct_id = crypto.randomUUID();

    // Insarto el producto en saleProduct
    await insertSaleProductModel(
      saleProduct_id,
      seachSaleProduct.id_product,
      quantity,
      seachSaleProduct.description
    );

    // Obtengo el producto ha lla venta y la cantidad
    const seachQuantity = await selectQuantityModel(
      quantity,
      seachSaleProduct.id_product
    );

    // Inserto la venta en la base de datos
    const sale = await insertSalesService(
      id_user,
      seachQuantity.id_saleProduct,
      seachCustomer.id_customer
    );

    res.status(200).send({
      status: 'ok',
      message: { sale },
    });
  } catch (error) {
    next(error);
  }
};
