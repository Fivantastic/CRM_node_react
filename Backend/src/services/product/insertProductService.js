import { insertProductModel } from "../../models/products/insertProductModel.js";

export const insertProductService = async (name, description, price, stock, product_status) => {
   try{
    const id_product = crypto.randomUUID()
   
    await insertProductModel(id_product, name, description, price, stock, product_status)

   } catch(error) {
      error.statusCode = 500
      error.code = "Error al insertar el producto"
      throw error
   }
}