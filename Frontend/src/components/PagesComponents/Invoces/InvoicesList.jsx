import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";
import { ClosedInvoice } from "./ClosedInvoice.jsx";

export const InvoicesList = ({ 
  invoice,
  handleNewInvoiceStatus,
  token
 }) => {
  const dueDate = getNormalizedDate(invoice.due_date);
  const creationDate = getNormalizedDate(invoice.creation_at);

  const traducirEstadoFactura = (estado) => {
    switch (estado) {
      case 'pending':
        return { text: 'Pendiente', color: 'blue' };
      case 'processing':
        return { text: 'En proceso', color: 'orange' };
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
      default:
        return { text: 'Desconocido', color: 'black' };
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
    
  const invoiceStatus = traducirEstadoFactura(invoice.invoice_status);
  const invoiceMethod = traducirMetodoPago(invoice.payment_method);

  const moreInfoFields = [
    { label: 'Ref. Factura', value: invoice.ref_IN },
    { label: 'Ref. Venta', value: invoice.ref_SL },
    { label: 'Comercial', value: `${invoice.agent_name} ${invoice.agent_Last_name}` },
    { label: 'Producto', value: invoice.product },
    { label: 'Precio', value: invoice.product_price + ' €' },
    { label: 'Cantidad', value: invoice.quantity + ' u.' },
    { label: 'Cliente', value: invoice.customer_name },
    { label: 'Empresa', value: invoice.company_name },
    { label: 'NIF', value: invoice.NIF },
    { label: 'Dirección', value: invoice.address },
    { label: 'Importe', value: invoice.total_price + ' €' },
    { label: 'IVA', value: invoice.including_tax + ' €' },
    { label: 'Total', value: invoice.total_amount + ' €' },
    { label: 'Método De Pago', value: invoiceMethod.text },
    { label: 'Fecha De Vencimiento', value: dueDate.toLocaleDateString() },
    { label: 'Estado De la Venta', value: invoiceStatus.text, color: invoiceStatus.color },
    { label: 'Fecha De Creación', value: creationDate.toLocaleDateString() }
  ];

  const modalIds = {
    classState: 'font-bold'
  };
  
  return (
      <>
        <div id="element_customer_subtitle" className="mainInsideSub">
          <p className="refTitle">Ref: {invoice.ref_IN}</p>
        </div>
        <p className="mainInsideSub"><strong>Importe: </strong> {invoice.total_amount} €</p>

        <p className="mainInsideSub"> <strong>Ref. Venta: </strong>{invoice.ref_SL}</p>

        <p className="mainInsideSub"><strong>Empresa: </strong> {invoice.company_name}</p>

        <p className="mainInsideSub"><strong>Método De Pago: </strong>{invoiceMethod.text}</p>

        <p className="mainInsideSub"><strong>Fecha de Vencimiento: </strong>{dueDate.toLocaleDateString()}</p>

        <p id="invoice_status" className="mainInsideSub"><strong>Estado Factura: </strong><span style={{color: invoiceStatus.color, fontWeight: '600'}}>{invoiceStatus.text}</span></p>

        <span id="invoice_actions" className="main_actions">
          <MoreInfo fields={moreInfoFields} modalIds={modalIds} />
          <ClosedInvoice
            onUpdateInvoice={handleNewInvoiceStatus}
            invoice={invoice.id_invoice}
            token={token}
          />
        </span>
      </>
  );
};
