import { selectCustomerModel } from "../../../models/Modules/sales/selectCustomerModel.js";
import { selectProductIsSaleProductModel } from "../../../models/Modules/sales/selectProductIsSaleProductModel.js";
import { selectSaleByIdModel } from "../../../models/Modules/sales/selectSaleByIdModel.js";
import { selectSaleProducModel } from "../../../models/Modules/sales/selectSaleProducModel.js";
import { updateSaleModel } from "../../../models/Modules/sales/updateSaleModel.js";
import { updateSaleProductModel } from "../../../models/Modules/sales/updateSaleProductModel.js";
import { updateSalesQuantityModel } from "../../../models/Modules/sales/updateSalesQuantityModel.js";
import { limitedStock, notFoundError } from "../../error/errorService.js";
import { controlStockProductService } from "../../product/controlStockProductService.js";

export const updateSalesService = async (id_sale, body) => {

  // Verificar qué campos están presentes en el cuerpo de la solicitud
  const { quantity, customer  } = body;
  console.log(body);

  // Si la cantidad está presente, actualizarla
 
    // Obtengo el id de salesProduct
    if (quantity) {
      const seachSaleProductId = await selectSaleProducModel(id_sale);
  
      // Obtengo el id del producto de selasProduct
      const seachSaleProduct = await selectProductIsSaleProductModel(seachSaleProductId.saleProduct_id);
  
      const checkQuantity = await controlStockProductService(seachSaleProduct.product_id);
      const stock = JSON.parse(JSON.stringify(checkQuantity));
  
      if (stock < quantity) {
        limitedStock(quantity)
      }
  
      // Actualizar la cantidad en la venta
       await updateSalesQuantityModel(
        seachSaleProduct.product_id,
        quantity
      );

      
    // Actualizo el saleProduct
    await updateSaleProductModel(
      seachSaleProductId.saleProduct_id,
      seachSaleProduct.product_id,
      quantity
    );

    // Actualizo la venta 
     const response = await updateSaleModel(id_sale, seachSaleProductId.saleProduct_id );
     return response;
    }
    
  // Si el cliente está presente, actualizarlo
    if (customer) {
      const sale = await selectSaleByIdModel(id_sale);
      
      if (!sale || sale.id_sale !== id_sale) {
        notFoundError('Sale');
      }

      const seachCustomer = await selectCustomerModel(customer);
  
      if (!seachCustomer || seachCustomer.id_customer !== customer) {
        notFoundError('Customer');
      }

      // Actualizo la venta 
       const response = await updateSaleModel(id_sale, sale.seleProduct_id, customer );
       return response;
    }

    // Retornar la respuesta después de realizar todas las actualizaciones necesarias
    return response;
};
