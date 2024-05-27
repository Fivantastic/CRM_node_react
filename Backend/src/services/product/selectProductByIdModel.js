import { selectProductById } from '../../models/products/selectProductById.js';
import { updateProductModel } from '../../models/products/updateProductModel.js';

export const updateProductService = async (id_product, body) => {
  const { name, description, price, stock } = body;

  // Comprobar si el producto existe.
  const existProduct = await selectProductById(id_product);

  // si existe, comprobar si es el mismo producto.
  if (existProduct && existProduct.id_product !== id_product) {
    productAlreadyRegisteredError();
  }

  // Actualizar el producto en la base de datos.
  await updateProductModel(
    id_product,
    name,
    description,
    price,
    stock
  );

  // devolver el producto actualizado.
  const product = await selectProductById(id_product);
  return product;
};
