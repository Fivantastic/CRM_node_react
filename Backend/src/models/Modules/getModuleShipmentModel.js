import { getDBPool } from '../../db/getPool.js';

export const getModuleShipmentModel = async (searchTerm) => {
  const pool = getDBPool();

  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT Customers.name AS customer, Customers.name AS customer, Customers.email AS customer_email, Customers.phone AS customer_phone, Addresses.address AS address, Addresses.number AS address_number, Addresses.floor AS address_floor ,Addresses.letter_number AS address_letter_number, Addresses.city AS address_city, Addresses.zip_code AS address_zip_code, Addresses.country AS address_country, DeliveryNotes.delivery_status AS delivery_status, Shipments.shipment_status, Shipments.tracking_number, Shipments.deliveryNote_id, Shipments.additional_notes, Shipments.create_at, Shipments.update_at
       FROM Shipments
       LEFT JOIN Customers ON Shipments.customer_id = Customers.id_customer
       LEFT JOIN Addresses ON Shipments.address_id = Addresses.id_address
       LEFT JOIN DeliveryNotes ON Shipments.deliveryNote_id = DeliveryNotes.id_note
       WHERE Shipments.shipment_status LIKE ?`,
      [`%${searchTerm}%`]
    );
    if (!result || result.length === 0) {
      notFoundError('Shipments');
    }
    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(
      `SELECT Customers.name AS customer, Customers.name AS customer, Customers.email AS customer_email, Customers.phone AS customer_phone, Addresses.address AS address, Addresses.number AS address_number, Addresses.floor AS address_floor ,Addresses.letter_number AS address_letter_number, Addresses.city AS address_city, Addresses.zip_code AS address_zip_code, Addresses.country AS address_country, DeliveryNotes.delivery_status AS delivery_status, Shipments.shipment_status, Shipments.tracking_number, Shipments.deliveryNote_id, Shipments.additional_notes, Shipments.create_at, Shipments.update_at
       FROM Shipments
       LEFT JOIN Customers ON Shipments.customer_id = Customers.id_customer
       LEFT JOIN Addresses ON Shipments.address_id = Addresses.id_address
       LEFT JOIN DeliveryNotes ON Shipments.deliveryNote_id = DeliveryNotes.id_note`
    );
    return result[0];
  }
};
