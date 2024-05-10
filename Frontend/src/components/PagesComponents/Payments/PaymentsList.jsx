import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";

export const PaymentsList = ( { payment } ) => {
  const paidDate = getNormalizedDate(payment.payment_date);
  const status = payment.payment_status
  let statusColor = '';
  let message = '';

  if (status === 'pending') { statusColor = 'orange'; message = "Pendiente";
} else if (status === 'cancelled') {statusColor = 'gray'; message = "Cancelado";
} else if (status === 'paid') { statusColor = 'green'; message = "Pagado";
}
  
  return (
      <>
        <h2 className="element_payment_title mainInsideTitle"><strong>Pago:</strong> {payment.paid_amount}€</h2>
        <p className="element_payment_subtitle mainInsideSub"><strong>Fecha de pago:</strong> {paidDate.toLocaleDateString()}</p>

        <h3 className="element_payment_section mainSubSection">Factura asociada</h3>
        <p>{payment.id_invoice}</p>

        <h3 className="element_payment_section mainSubSection">Cliente</h3>
        <p><strong>Nombre:</strong> {payment.customer}</p>
        <p><strong>Email:</strong> {payment.customer_email}</p>
        <p><strong>Telefono:</strong> {payment.customer_phone}</p>

        <h3 className="payment_status  mainStatusSection" style={{color: statusColor}}>{message}</h3>
      </>
  );
};
  