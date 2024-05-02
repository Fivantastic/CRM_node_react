import { getDBPool } from '../../db/getPool.js';

export const selectModuleDetailModel = async (moduleId) => {
  const pool = getDBPool();

  // Obtener el detalle del servicio
  const result = await pool.query(
    `SELECT Modules.id_module, Users.name AS agent_name, Users.last_name AS agent_last_name, Users2.name AS delivery_name, Users2.last_name AS delivery_last_name, Modules.service_type, Modules.rating_module, Modules.rating_comment, Modules.create_at, Modules.update_at, Sales.id_sale, Customers.name AS customer_name, SalesProducts.quantity, DeliveryNotes.delivery_status, Shipments.shipment_status, Invoices.total_amount, Payments.amount, Payments.payment_status, Modules.service_type, Modules.rating_module, Modules.rating_comment
  FROM Modules
  LEFT JOIN Users ON Modules.agentUser_id = Users.id_user
  LEFT JOIN Users AS Users2 ON Modules.deliveryUser_id = Users.id_user
  LEFT JOIN Sales ON Modules.sale_id = Sales.id_sale
  LEFT JOIN Customers ON Sales.customer_id = Customers.id_customer
  LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
  LEFT JOIN DeliveryNotes ON Sales.id_sale = DeliveryNotes.sale_id
  LEFT JOIN Shipments ON DeliveryNotes.id_note = Shipments.deliveryNote_id
  LEFT JOIN Invoices ON Sales.id_sale = Invoices.sale_id
  LEFT JOIN Payments ON Invoices.id_invoice = Payments.invoice_id WHERE id_module = ?`,
    [moduleId]
  );

  return result[0];
};
