import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
import { ClosedInvoice } from "./ClosedInvoice.jsx";

export const InvoicesList = ({ 
  invoice,
  onDelete,
  handleNewInvoiceStatus,
  typeModule,
  typeModuleMessage,
  token
 }) => {
  const dueDate = getNormalizedDate(invoice.due_date);
  const creationDate = getNormalizedDate(invoice.creation_at);

  const traducirEstadoFactura = (estado) => {
    switch (estado) {
      case 'pending':
        return { text: 'Pendiente', color: 'blue' };
      case 'partially_paid':
      return { text: 'Pago Parcial', color: 'blue' };
      case 'overdue':
        return { text: 'Vencida', color: 'orange' };
      case 'paid':
        return { text: 'Pagada', color: 'green' };
      case 'cancelled':
        return { text: 'Cancelada', color: 'red' };
      case 'refunded':
        return { text: 'Reembolsada', color: 'black' };
      case 'disputed':
        return { text: 'Reclamada', color: 'black' };
      case 'sent':
        return { text: 'Enviada', color: 'black' };
   }
  };

  const traducirMetodoPago = (metodo) => {
    switch (metodo) {
      case 'cash':
        return { text: 'Efectivo', color: 'black' };
      case 'card':
        return { text: 'Tarjeta', color: 'black' };
      case 'transfer':
        return { text: 'Transferencia', color: 'black' };
      default:
        return { text: metodo, color: 'black' };
    }  
  }
    

  const invoiceStatus = traducirEstadoFactura(invoice.invoice_status)
  const invoiceMethod = traducirMetodoPago(invoice.payment_method)

  const moreInfoFields = [
    { label: 'Factura', value: invoice.id_invoice },
    { label: 'Referencia De Venta', value: invoice.codigo_venta },
    { label: 'Comercial', value: `${invoice.agent_name} ${invoice.agent_Last_name}` },
    { label: 'Producto', value: invoice.product },
    { label: 'Precio del Producto', value: invoice.product_price + ' €' },
    { label: 'Cantidad', value: invoice.quantity + ' u.' },
    { label: 'Cliente', value: invoice.customer_name },
    { label: 'Empresa', value: invoice.company_name },
    { label: 'NIF', value: invoice.NIF },
    { label: 'Dirección', value: invoice.address },
    { label: 'Importe', value: invoice.total_price + ' €' },
    { label: 'IVA', value: invoice.including_tax + ' €' },
    { label: 'Total', value: invoice.total_amount + ' €' },
    { label: 'Método De Pago', value: invoiceMethod.text },
    { label: 'Fecha De Vencimiento Del Pago', value: dueDate.toLocaleDateString() },
    { label: 'Estado De la Venta', value: invoiceMethod.text, color: invoiceMethod.color },
    { label: 'Fecha De Creación', value: creationDate.toLocaleDateString() }
  ];
  

  return (
      <>
         <div id="element_customer_subtitle" className="mainInsideSub">
        <p className="refTitle">Ref: {invoice.ref_IN}</p>
        </div>

        <h3><strong>Total:</strong> {invoice.total_amount} €</h3>
        <p><strong>Comercial: </strong> {invoice.agent_name} {invoice.agent_Last_name}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Producto</h3>
        <p><strong>Nombre: </strong> {invoice.product}</p>
        <p><strong>Precio: </strong> {invoice.product_price} €</p>
        <p><strong>Cantidad: </strong> {invoice.quantity} u.</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Cliente</h3>
        <p><strong>Nombre: </strong> {invoice.customer_name}</p>
        <p><strong>Empresa: </strong> {invoice.company_name}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Método De Pago</h3>
        <p>{invoiceMethod.text}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Fecha De Vencimiento Del Pago</h3>
        <p>{dueDate.toLocaleDateString()}</p>

        <h3 id="element_ivoice_section" className=" mainSubSection">Estado De la Venta</h3>
        <p id="invoice_status" style={{color: invoiceStatus.color}}><strong>{invoiceStatus.text}</strong></p>

        <span id="invoice_actions" className="main_actions">
          <MoreInfo fields={moreInfoFields} modalIds={[]} />
          <ClosedInvoice
            invoice={invoice.id_invoice}
            currentStatus={invoice.invoice_status}
            onUpdateInvoice={handleNewInvoiceStatus}
            token={token}
          />
          <DeleteGenericModal
            id={invoice.id_invoice}
            onDelete={onDelete}
            token={token}
            typeModule={typeModule}
            typeModuleMessage={typeModuleMessage}
          />
        </span>
      </>
  );
};
