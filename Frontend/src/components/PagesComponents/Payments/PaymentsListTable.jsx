import { useUser } from '../../../context/authContext.jsx';
import { ChangeStatus } from '../../forms/ChangeStatus.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
// import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
// import '../Payments/PaymentsListTable.css';
// import { MorePayments } from './MorePayments.jsx';
// import { UpdatePayment } from './UpdatePayment.jsx';

export const PaymentsListTable = ({payment, onUpdatePayment, onDelete}) => {
      const token = useUser();

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'payments';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Pagos';

  const traducirEstadoPago = (estado) => {
    switch (estado) {
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      case 'paid':
        return 'Cerrado';
      default:
        return estado;
    }
  };
  
//   const nameComplete = `${payment.paymentsAgent} ${payment.last_name}`;
  
  return (
    <section id="sales_table">
      <div id="salesTableHead">
        <div id="salesTableHeadRowNameSalesAgent">Ref</div>
        <div id="salesTableHeadRowProduct">Cantidad</div>
        <div id="salesTableHeadRowEstatus">Estado</div>
        <div id="salesTableHeadRowActions">Acciones</div>
      </div>
      <div id="salesTableBody">
        {payment.length > 0 &&
          payment.map((payment) => {
            const status = payment.payment_status
            let statusColor = '';

            if (status === 'pending') { statusColor = 'orange';
            } else if (status === 'cancelled') {statusColor = 'gray';
            } else if (status === 'paid') { statusColor = 'green';
            }
            
            return(
            <div key={payment.id_payment} id="salesTableBodyRow">
              <div id="salesTableBodyRowName">{payment.ref_PM}</div>
              <div id="salesTableBodyProduct">
                 <p>
                   <strong>{payment.paid_amount}</strong>  €
                </p>
              </div>
              <div id="salesTableBodyRowEstatus">
                <p style={{color:statusColor, fontWeight:"bold"}}>{traducirEstadoPago(payment.payment_status)}</p>
              </div>
              <div id="salesTableBodyRowActions">
                {/* <MorePayments payment={payment} /> */}
                {status !== 'cancelled' && (
                    <ChangeStatus
                      id={payment.id_payment}
                      onClick={onUpdatePayment}
                      newStatus={'cancelled'}
                      newStatusMessage="Cancelar"
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                  )}
                  {status !== 'paid' &&
                    status !== 'cancelled' && (
                      <ChangeStatus
                        id={payment.id_payment}
                        onClick={onUpdatePayment}
                        newStatus={'paid'}
                        newStatusMessage="Resolver"
                        token={token}
                        typeModule={typeModule}
                        typeModuleMessage={typeModuleMessage}
                      />
                    )}
                  {status !== 'pending' && status !== 'paid' && (
                    <ChangeStatus
                      id={payment.id_payment}
                      onClick={onUpdatePayment}
                      newStatus={'pending'}
                      newStatusMessage="Restaurar"
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                  )}
                  {status === 'cancelled' && (
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
