import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";

export const InvoicesList = ({ invoice }) => {
  const dueDate = getNormalizedDate(invoice.due_date);
  const creationDate = getNormalizedDate(invoice.creation_at);

  const traducirEstadoVenta = (estado) => {
    switch (estado) {
      case 'pending':
        return 'Pendiente';
      case 'paid':
        return 'Pagado';
      case 'overdue':
        return 'Atrasado';
      case 'cancelled':
        return 'Cancelado';
      case 'partially_paid':
        return 'Parcialmente pagado';
      case 'refunded':
        return 'Reembolsado';
      case 'disputed':
        return 'Reclamado';
      case 'sent':
        return 'Enviado';  
      case 'delivering':
        return 'En reparto';
      case 'delivered':
        return 'Entregado';
      case 'cash':
        return 'Efectivo';
      case 'card':
        return 'Tarjeta';
      case 'transfer':
        return 'Transferencia';
      default:
        return estado;
    }
  };

  return (
      <>
        <h2 id="element_ivoice_title" className=" mainInsideTitle">Factura</h2>
        <p id="element_invoice_subtitle" className=" mainInsideSub">{invoice.id_invoice}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Referencia De Venta</h3>
        <p>{invoice.codigo_venta}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Comercial</h3>
        <p><strong>Nombre: </strong> {invoice.agent_name} {invoice.agent_Last_name}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Producto</h3>
        <p><strong>Nombre: </strong> {invoice.product}</p>
        <p><strong>Precio: </strong> {invoice.product_price} €</p>
        <p><strong>Cantidad: </strong> {invoice.quantity} u.</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Cliente</h3>
        <p><strong>Nombre: </strong> {invoice.customer_name}</p>
        <p><strong>Empresa: </strong> {invoice.company_name}</p>
        <p><strong>NIF: </strong> {invoice.NIF}</p>
        <p><strong>Dirección: </strong> {invoice.address}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Monto</h3>
        <p><strong>Precio: </strong> {invoice.total_price} €</p>
        <p><strong>IVA: </strong> {invoice.including_tax} €</p>
        <p><strong>Total: </strong> {invoice.total_amount} €</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Método De Pago</h3>
        <p><strong>Método: </strong> {traducirEstadoVenta(invoice.payment_method)}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Fecha De Vencimiento Del Pago</h3>
        <p>{dueDate.toLocaleDateString()}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Estado De la Venta</h3>
        <p id="invoice_status">{traducirEstadoVenta(invoice.invoice_status)}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Fecha De Creación</h3>
        <p id="invoice_date">{creationDate.toLocaleDateString()}</p>
      </>
  );
};
