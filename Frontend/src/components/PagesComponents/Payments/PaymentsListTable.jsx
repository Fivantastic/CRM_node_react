import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { ChangeStatus } from '../../forms/ChangeStatus.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';

export const PaymentsListTable = ({payments, onUpdatePayment, onDelete}) => {
      const token = useUser();

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'payments';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Pagos';

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
    <section id="sales_table">
      <div id="salesTableHead">
        <div id="salesTableHeadRowNameSalesAgent">Ref</div>
        <div id="salesTableHeadRowProduct">Cantidad</div>
        <div id="salesTableHeadRowEstatus">Estado</div>
        <div id="salesTableHeadRowActions">Acciones</div>
      </div>
      <div id="salesTableBody">
        {payments.length > 0 &&
          payments.map((payment) => {
            console.log(payment);

            const paidDate = getNormalizedDate(payment.payment_date);
            const estadoPago = traducirEstadoPago(payment.payment_status)
          
            const moreInfoFields = [
              { label: 'Ref', value: payment.ref_PM },
              { label: 'Cantidad', value: payment.paid_amount + '€'},
              { label: 'Cliente', value: payment.customer},
              { label: 'Telefono', value: payment.customer_phone },
              { label: 'Email', value: payment.customer_email },
              { label: 'Fecha del pago', value: paidDate.toLocaleDateString() },
              { label: 'Estado', value: estadoPago.text, color: estadoPago.color },
              { label: 'Factura asociada', value: payment.ref_IN },
            ];
            
            return(
            <div key={payment.id_payment} id="salesTableBodyRow">
              <div id="salesTableBodyRowName">{payment.ref_PM}</div>
              <div id="salesTableBodyProduct">
                 <p>
                   <strong>{payment.paid_amount}</strong>  €
                </p>
              </div>
              <div id="salesTableBodyRowEstatus">
                <p style={{color:estadoPago.color}}>{estadoPago.text}</p>
              </div>
              <div id="salesTableBodyRowActions">
                <MoreInfo fields={moreInfoFields} modalIds={[]} />


                <ChangeStatus
                  id={payment.id_payment}
                  currentStatus={payment.payment_status}
                  onClick={onUpdatePayment}
                  token={token}
                />
                  {payment.payment_status === 'cancelled' && (
                    <DeleteGenericModal
                      id={payment.id_payment}
                      onDelete={onDelete}
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                  )}
              </div>
            </div>
            )
          })
        }
      </div>
    </section>
  );
};
