import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { ClosedInvoice } from './ClosedInvoice.jsx';
import './InvoicesListTable.css';

export const InvoicesListTable = ({invoices, onUpdate }) => {
  const token = useUser();

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
        return { text: estado, color: 'black' };
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

  return (
    <section id="invoices_table" className='invoicesTable'>
      <div id="invoicesTableHead">
        <div id="invoicesTableHeadRowRef">Ref. Factura</div>
        <div id="invoicesTableHeadRowRefSales">Ref. Venta</div>
        <div id="invoicesTableHeadRowPrice">Importe</div>
        <div id="invoicesTableHeadRowDate">Fecha</div>
        <div id="invoicesTableHeadRowEstatus">Estado</div>
        <div id="invoicesTableHeadRowActions">Acciones</div>
      </div>
      <div id="invoicesTableBody">
        {invoices && invoices.length > 0 ? (
          invoices.map((invoice) => {
            const dueDate = getNormalizedDate(invoice.due_date);
            const creationDate = getNormalizedDate(invoice.creation_at);
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
              <div key={invoice.id_invoice} className="invoicesTableBodyRow">
                <div className="invoicesTableBodyRowRef">{invoice.ref_IN}</div>
                <div className="invoicesTableBodyRowRefSales">{invoice.ref_SL}</div>
                <div className="invoicesTableBodyPrice"><strong>{invoice.total_price}</strong> €</div>
                <div className='invoicesTavleBodyRowDate'>
                  {dueDate.toLocaleDateString()}
                </div>
                <div className="invoicesTableBodyRowEstatus" style={{color:invoiceStatus.color}}>
                  {invoiceStatus.text}
                </div>
                <div className="invoicesTableBodyRowActions">
                  <MoreInfo fields={moreInfoFields} modalIds={modalIds} />
                  <ClosedInvoice
                    onUpdateInvoice={onUpdate}
                    invoice={invoice.id_invoice}
                    token={token}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="noResult">No hay facturas disponibles</div>
        )}
      </div>
    </section>
  );
  
};
