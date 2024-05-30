import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { ChangeStatus } from '../../forms/ChangeStatus.jsx';
import './PaymentsListTable.css';

export const PaymentsListTable = ({payments, onUpdatePayment }) => {
  const token = useUser();

  const traducirEstadoPago = (estado) => {
    switch (estado) {
      case 'pending':
        return { text: 'Pendiente', color: 'blue' };
      case 'cancelled':
        return { text: 'Cancelado', color: 'red' };
      case 'paid':
        return { text: 'Pagado', color: 'green' };
      default:
        return { text: estado, color: 'black' };
    }
  };
  
  return (
    <section id="payments_table">
      <div id="paymentsTableHead">
        <div id="paymentsTableHeadRowRef">Ref. Pagos</div>
        <div id="paymentsTableHeadRowRefInvoice">Ref. Factura</div>
        <div id="paymentsTableHeadRowProduct">Importe</div>
        <div id="paymentsTableHeadRowDate">Fecha de Pago</div>
        <div id="paymentsTableHeadRowEstatus">Estado</div>
        <div id="paymentsTableHeadRowActions">Acciones</div>
      </div>
      <div id="paymentsTableBody">
        {payments && payments.length > 0 ? (
          payments.map((payment) => {
            const paidDate = getNormalizedDate(payment.payment_date);
            const estadoPago = traducirEstadoPago(payment.payment_status);
            
            const moreInfoFields = [
              { label: 'Ref. Pago', value: payment.ref_PM },
              { label: 'Importe', value: payment.paid_amount + '€'},
              { label: 'Ref. Albarán', value: payment.ref_IN },
              { label: 'Empresa', value: payment.company_name },
              { label: 'Email', value: payment.customer_email },
              { label: 'Teléfono', value: payment.customer_phone },
              { label: 'Fecha del pago', value: paidDate.toLocaleDateString() },
              { label: 'Estado', value: estadoPago.text, color: estadoPago.color },
            ];

            const modalIds = {
              classState: 'font-bold'
            };
            
            return (
              <div key={payment.id_payment} className="paymentsTableBodyRow">
                <div className="paymentsTableBodyRowRef">{payment.ref_PM}</div>
                <div className="paymentsTableBodyRowRefInvoice">{payment.ref_IN}</div>
                <div className="paymentsTableBodyProduct">
                  <strong>{payment.paid_amount}</strong> €
                </div>
                <div className="paymentsTableBodyDate">
                  {paidDate.toLocaleDateString()}
                </div>
                <div className="paymentsTableBodyRowEstatus">
                  <p style={{color: estadoPago.color}}>{estadoPago.text}</p>
                </div>
                <span className="paymentsTableBodyRowActions">
                  <MoreInfo fields={moreInfoFields} modalIds={modalIds} />
                  <ChangeStatus
                    id={payment.id_payment}
                    currentStatus={payment.payment_status}
                    onClick={onUpdatePayment}
                    token={token}
                  />
                </span>
              </div>
            );
          })
        ) : (
          <div className="noResult">No hay pagos disponibles</div>
        )}
      </div>
    </section>
  );
  
};
