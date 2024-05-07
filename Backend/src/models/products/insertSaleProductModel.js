import { getDBPool } from '../../db/getPool.js';
import { controlStockProductService } from '../../services/product/controlStockProductService.js';

export const insertSaleProductModel = async (
  saleProduct_id,
  id_product,
  quantity,
  description
) => {
  const pool = await getDBPool();

  // Comprobar si existe un producto con el id proporcionado.
  const [result] = await pool.query(
    `INSERT INTO SalesProducts  (id_saleProduct, product_id, quantity , description) VALUES (?,?,?,?)`,
    [saleProduct_id, id_product, quantity, description]
  );

  // Actualizo el stock del producto
  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  // Obtengo el stock de base de datos
  const stock = await controlStockProductService(id_product);

  // Convierto la info ha numeros
  const numberStock = Number(stock.stock);
  const number = Number(quantity);

  const namberModify = (storage, number) => {
    return storage - number;
  };

  // Le resto la cantidad vendida
  const update = namberModify(numberStock, number);

  addToUpdate(`stock`, update);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Products SET ${fieldsToUpdate.join(', ')} WHERE id_product = ?`;
  values.push(id_product);

  const [updateStock] = await pool.query(query, values);

  // Si no se ha insertado ningún producto, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el producto');
    error.httpStatus = 500;
    error.code = 'INSERT_PRODUCT_ERROR';
    throw error;
  }
};
