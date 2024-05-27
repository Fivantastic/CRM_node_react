import { getDBPool } from '../../../db/getPool.js';

export const selectModuleByIdInvoiceModel = async (invoiceId) => {
  const pool = await getDBPool();

  // Comprobar si existe un cliente con el id proporcionado.
  // const [Modules] = await pool.query(
  //   `SELECT * FROM Modules WHERE invoice_id = ?`,
  //   [invoiceId]
  // );

  const Modules = await pool.query(
    `SELECT * FROM Modules WHERE invoice_id = ?`, [invoiceId]);

  console.log(Modules);

  // return Modules[0];
};
