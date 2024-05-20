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
        <h2 id="element_payment_title" className=" mainInsideTitle">{payment.ref_PM}</h2>
        <h3 id="element_payment_paid" className=" mainInsideTitle"><strong>Pago: </strong> {payment.paid_amount}€</h3>
        <p id="element_payment_subtitle" className=" mainInsideSub"><strong>Fecha de pago: </strong> {paidDate.toLocaleDateString()}</p>

        <h3 id="element_payment_section" className=" mainSubSection">Factura asociada</h3>
        <p>{payment.id_invoice}</p>

        <h3 id="element_payment_section " className="mainSubSection">Cliente</h3>
        <p><strong>Nombre: </strong> {payment.customer}</p>
        <p><strong>Email: </strong> {payment.customer_email}</p>
        <p><strong>Telefono: </strong> {payment.customer_phone}</p>

        <h3 id="payment_status" className="mainStatusSection" style={{color: statusColor}}>{message}</h3>
      </>
  );
};
  