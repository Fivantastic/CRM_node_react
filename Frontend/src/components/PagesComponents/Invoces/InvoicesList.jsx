export const InvoicesList = ({ invoice }) => {
  return (
    <>
      <li>
        <h2>Factura</h2>
        <p>{invoice.id_invoice}</p>

        <h2>Referencia De Venta</h2>
        <p>{invoice.codigo_venta}</p>

        <h3>Nombre Del Agente</h3>
        <p>Nombre: {invoice.agent_name}</p>
        <p>Apellido: {invoice.agent_Last_name}</p>

        <h3>Producto</h3>
        <p>Nombre: {invoice.product}</p>
        <p>Precio: {invoice.product_price}</p>
        <p>Cantidad: {invoice.quantity} </p>

        <h3>Cliente</h3>
        <p>Nombre: {invoice.customer_name}</p>
        <p>Empresa: {invoice.company_name}</p>
        <p>NIF: {invoice.NIF}</p>
        <p>Dirección: {invoice.address}</p>

        <h3>Monto</h3>
        <p>Precio: {invoice.total_price}</p>
        <p>IVA: {invoice.including_tax}</p>
        <p>Total: {invoice.total_amount}</p>

        <h3>Método De Pago</h3>
        <p>Método: {invoice.payment_method}</p>

        <h3>Fecha De Vencimiento Del Pago</h3>
        <p>{invoice.due_date}</p>

        <h3>Estado De la Venta</h3>
        <p>{invoice.invoice_status}</p>

        <h3>Fecha De Creación</h3>
        <p>{invoice.creation_at}</p>
      </li>
    </>
  );
};
