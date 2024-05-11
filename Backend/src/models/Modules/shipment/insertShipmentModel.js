import { getDBPool } from '../../../db/getPool.js';

export const insertShipmentModel = async ({
  shipmentId, customer_id, address_id, product_name, 
  product_quantity, shipment_status, additional_notes
}) => {
  const pool = getDBPool();

  try {
    await pool.query('START TRANSACTION');

    // Primero, encontrar el producto correcto por nombre
    const [productResult] = await pool.query(
      `SELECT id_product, stock FROM Products WHERE name = ? AND product_status = 'active'`,
      [product_name]
    );
    if (productResult.length === 0) {
      await pool.query('ROLLBACK');
      throw new Error('Product not found or is inactive');
    }
    const productId = productResult[0].id_product;

    // Asegurar que hay suficiente stock
    if (productResult[0].stock < product_quantity) {
      await pool.query('ROLLBACK');
      throw new Error('Insufficient stock for the product');
    }

    // Actualizar el stock del producto
    await pool.query(
      `UPDATE Products SET stock = stock - ? WHERE id_product = ?`,
      [product_quantity, productId]
    );

    // Insertar los datos del envío en la tabla Shipments, usando el nombre correcto de la columna
    await pool.query(
      `INSERT INTO Shipments (id_shipment, customer_id, address_id, shipment_status, additional_notes) VALUES (?, ?, ?, ?, ?)`,
      [shipmentId, customer_id, address_id, shipment_status, additional_notes]
    );

    // Confirmar todas las inserciones como una transacción única
    await pool.query('COMMIT');

    return { message: 'Shipment successfully inserted into database and product stock updated.' };
  } catch (error) {
    // Asegurarse de revertir la transacción en caso de error
    await pool.query('ROLLBACK');
    throw new Error(`Error during shipment insertion: ${error.message}`);
  }
};
