import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';

export const SalesList = ({ sale }) => {
  const dueDate = getNormalizedDate(sale.create_at);

  const traducirEstadoVenta = (estado) => {
    switch (estado) {
      case 'open':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'closed':
        return 'Cerrada';
      default:
        return estado;
    }
  };

  return (
    <>
      <h2 className="element_sale_title mainInsideTitle">Referencia de venta</h2>
      <h3 className="element_sale_section mainSubSection">Comercial</h3>
      <p><strong>Nombre:</strong> {sale.salesAgent}</p>
      <p><strong>Apellido:</strong> {sale.salesAgent_lastName}</p>

      <h3 className="element_sale_section mainSubSection">Producto</h3>
      <p><strong>Nombre:</strong> {sale.product_name}</p>
      <p><strong>Precio:</strong> {sale.product_price}€</p>
      <p><strong>Cantidad:</strong> {sale.quantity}u. </p>

      <h3 className="element_sale_section mainSubSection">Cliente</h3>
      <p><strong>Nombre:</strong> {sale.customer}</p>
      <p><strong>Email:</strong> {sale.customer_email}</p>
      <p><strong>Telefono:</strong> {sale.customer_phone}</p>

      <h3 className="element_sale_section mainSubSection">Estado De la Venta</h3>
      <p>{traducirEstadoVenta(sale.operation_status)}</p>
      <h3 className="element_sale_section mainSubSection">Fecha De Creación</h3>
      <p>{dueDate.toLocaleDateString()}</p>
    </>
  );
};
