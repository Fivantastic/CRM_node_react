import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";

export const InvoicesList = ({ invoice }) => {
  const dueDate = getNormalizedDate(invoice.due_date);
  const creationDate = getNormalizedDate(invoice.creation_at);

  const traducirEstadoVenta = (estado) => {
    switch (estado) {
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      case 'delivering':
        return 'En reparto';
      case 'delivered':
        return 'Entregado';
      default:
        return estado;
    }
  };

  return (
      <>
        <h2 className="element_ivoice_title mainInsideTitle">Factura</h2>
        <p className="element_invoice_subtitle mainInsideSub">{invoice.id_invoice}</p>

        <h3 className="element_ivoice_section mainSubSection">Referencia De Venta</h3>
        <p>{invoice.codigo_venta}</p>

        <h3 className="element_ivoice_section mainSubSection">Comercial</h3>
        <p><strong>Nombre:</strong> {invoice.agent_name}</p>
        <p><strong>Apellido:</strong> {invoice.agent_Last_name}</p>

        <h3 className="element_ivoice_section mainSubSection">Producto</h3>
        <p><strong>Nombre:</strong> {invoice.product}</p>
        <p><strong>Precio:</strong> {invoice.product_price}</p>
        <p><strong>Cantidad:</strong> {invoice.quantity} </p>

        <h3 className="element_ivoice_section mainSubSection">Cliente</h3>
        <p><strong>Nombre:</strong> {invoice.customer_name}</p>
        <p><strong>Empresa:</strong> {invoice.company_name}</p>
        <p><strong>NIF:</strong> {invoice.NIF}</p>
        <p><strong>Dirección:</strong> {invoice.address}</p>

        <h3 className="element_ivoice_section mainSubSection">Monto</h3>
        <p><strong>Precio:</strong> {invoice.total_price}</p>
        <p><strong>IVA:</strong> {invoice.including_tax}</p>
        <p><strong>Total:</strong> {invoice.total_amount}</p>

        <h3 className="element_ivoice_section mainSubSection">Método De Pago</h3>
        <p><strong>Método:</strong> {invoice.payment_method}</p>

        <h3 className="element_ivoice_section mainSubSection">Fecha De Vencimiento Del Pago</h3>
        <p>{dueDate.toLocaleDateString()}</p>

        <h3 className="element_ivoice_section mainSubSection">Estado De la Venta</h3>
        <p>{traducirEstadoVenta(invoice.invoice_status)}</p>

        <h3 className="element_ivoice_section mainSubSection">Fecha De Creación</h3>
        <p>{creationDate.toLocaleDateString()}</p>
      </>
  );
};
