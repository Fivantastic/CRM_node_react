export const SalesList = ({ sale }) => {
  return (
    <>
      <h2 className="element_sale_title">Referencia de venta</h2>
      <h3 className="element_sale_section">Comercial</h3>
      <p>Nombre: {sale.salesAgent}</p>
      <p>Apellido: {sale.salesAgent_lastName}</p>

      <h3 className="element_sale_section">Producto En Venta</h3>
      <p>{sale.product_name}</p>
      <p>Precio: {sale.product_price}</p>
      <p>Cantidad: {sale.quantity} </p>

      <h3 className="element_sale_section">Cliente</h3>
      <p>Nombre: {sale.customer}</p>
      <p>Email: {sale.customer_email}</p>
      <p>Telefono: {sale.customer_phone}</p>

      <h3 className="element_sale_section">Estado De la Venta</h3>
      <p>{sale.operation_status}</p>
      <h3 className="element_sale_section">Fecha De Creación</h3>
      <p>{sale.create_at}</p>
    </>
  );
};
