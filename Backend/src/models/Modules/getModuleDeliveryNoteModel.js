import { getDBPool } from '../../db/getPool.js';

export const getModuleDeliveryNoteModel = async (searchTerm) => {
  const pool = getDBPool();

  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT DeliveryNotes.id_note, DeliveryNotes.sale_id, Users.name AS deliverer, Users.last_name AS deliverer_last_name, Addresses.address AS delivery_address, Addresses.number AS address_number, Addresses.floor AS address_floor ,Addresses.letter_number AS address_letter_number, Addresses.city AS address_city, Addresses.zip_code AS address_zip_code, Addresses.country AS address_country, Products.name AS product_name, Products.description AS product_description, SalesProducts.quantity AS product_quantity, DeliveryNotes.delivery_status, DeliveryNotes.delivery_date, DeliveryNotes.create_at, DeliveryNotes.update_at
       FROM DeliveryNotes
       LEFT JOIN Users ON DeliveryNotes.deliverer_id = Users.id_user
       LEFT JOIN Addresses ON DeliveryNotes.address_id = Addresses.id_address
       LEFT JOIN SalesProducts ON DeliveryNotes.saleProduct_id = SalesProducts.id_saleProduct
       LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
       WHERE DeliveryNotes.delivery_status LIKE ?`,
      [`%${searchTerm}%`]
    );
    if (!result || result.length === 0) {
      notFoundError('DeliveryNotes');
    }
    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(
      `SELECT DeliveryNotes.id_note, DeliveryNotes.sale_id, Users.name AS deliverer, Users.last_name AS deliverer_last_name,  Addresses.address AS delivery_address, Addresses.number AS address_number, Addresses.floor AS address_floor ,Addresses.letter_number AS address_letter_number, Addresses.city AS address_city, Addresses.zip_code AS address_zip_code, Addresses.country AS address_country, Products.name AS product_name, Products.description AS product_description, SalesProducts.quantity AS product_quantity, DeliveryNotes.delivery_status, DeliveryNotes.delivery_date, DeliveryNotes.create_at, DeliveryNotes.update_at
       FROM DeliveryNotes
       LEFT JOIN Users ON DeliveryNotes.deliverer_id = Users.id_user
       LEFT JOIN Addresses ON DeliveryNotes.address_id = Addresses.id_address
       LEFT JOIN SalesProducts ON DeliveryNotes.saleProduct_id = SalesProducts.id_saleProduct
       LEFT JOIN Products ON SalesProducts.product_id = Products.id_product`
    );
    return result[0];
  }
};
