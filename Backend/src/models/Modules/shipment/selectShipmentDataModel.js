import { getDBPool } from '../../../db/getPool.js';

export const selectShipmentDataModel = async (shipmentId) => {
  const pool = await getDBPool();

  // Comprobar si existe un envio con el id proporcionado.
  const [shipment] = await pool.query(
    `SELECT 
    Shipments.id_shipment,
    Shipments.ref_SH,
    Shipments.customer_id, 
    Shipments.address_id, 
    Shipments.deliveryNote_id, 
    Shipments.shipment_status, 
    Shipments.tracking_number, 
    Shipments.additional_notes, 
    Shipments.create_at AS shipment_create_at, 
    Shipments.update_at AS shipment_update_at,
    Customers.name AS customer_name, 
    Customers.email AS customer_email, 
    Customers.phone AS customer_phone,
    Customers.company_name AS company_name,
    Customers.NIF AS NIF,
    Addresses.address AS delivery_address, 
    Addresses.number AS address_number, 
    Addresses.floor AS address_floor,
    Addresses.letter_number AS address_letter_number, 
    Addresses.city AS address_city, 
    Addresses.zip_code AS address_zip_code, 
    Addresses.country AS address_country, 
    DeliveryNotes.id_note, 
    DeliveryNotes.sale_id, 
    DeliveryNotes.ref_DN,
    Users.name AS deliverer, 
    Users.last_name AS deliverer_last_name,  
    Products.name AS product_name, 
    Products.description AS product_description, 
    SalesProducts.quantity AS product_quantity, 
    DeliveryNotes.delivery_status, 
    DeliveryNotes.delivery_date, 
    DeliveryNotes.create_at AS deliveryNote_create_at, 
    DeliveryNotes.update_at AS deliveryNote_update_at
FROM 
    Shipments
LEFT JOIN 
    Customers ON Shipments.customer_id = Customers.id_customer
LEFT JOIN 
    Addresses ON Shipments.address_id = Addresses.id_address
LEFT JOIN 
    DeliveryNotes ON Shipments.deliveryNote_id = DeliveryNotes.id_note
LEFT JOIN 
    Users ON DeliveryNotes.deliverer_id = Users.id_user
LEFT JOIN 
    SalesProducts ON DeliveryNotes.saleProduct_id = SalesProducts.id_saleProduct
LEFT JOIN 
    Products ON SalesProducts.product_id = Products.id_product  
    WHERE id_shipment = ? `,
    [shipmentId]
  );

  return shipment[0];
};