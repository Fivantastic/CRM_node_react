import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";
import { ChangeStatus } from "../../forms/ChangeStatus.jsx";

export const PaymentsList = ({
  payment,
  handleNewPaymentStatus,
  token
}) => {
const paidDate = getNormalizedDate(payment.payment_date);

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

const estadoPago = traducirEstadoPago(payment.payment_status)

const moreInfoFields = [
  { label: 'Ref. Pago', value: payment.ref_PM },
  { label: 'Importe', value: payment.paid_amount + '€'},
  { label: 'Ref. Albarán', value: payment.ref_IN },
  { label: 'Empresa', value: payment.company_name},
  { label: 'Email', value: payment.customer_email },
  { label: 'Telefono', value: payment.customer_phone },
  { label: 'Fecha del pago', value: paidDate.toLocaleDateString() },
  { label: 'Estado', value: estadoPago.text, color: estadoPago.color },
];

const modalIds = {
  classState: 'font-bold'
};

  return (
      <>
        <div id="element_customer_subtitle" className="mainInsideSub">
          <p className="refTitle">Ref: {payment.ref_PM}</p>
        </div>
        <p className="mainInsideSub"><strong>Importe: </strong> {payment.paid_amount}€</p>

        <p className="mainInsideSub"><strong>Ref. Albarán: </strong> {payment.ref_IN}</p>
        <p className="mainInsideSub"><strong>Empresa: </strong> {payment.company_name}</p>
        <p className="mainInsideSub"><strong>Telefono: </strong> {payment.customer_phone}</p>

        <p className="mainInsideSub"><strong>Fecha de pago: </strong> {paidDate.toLocaleDateString()}</p>
        <p className="mainInsideSub"><strong>Estado: </strong><span style={{color: estadoPago.color, fontWeight: '600'}}>{estadoPago.text}</span></p>

        <span id="visit_actions" className="main_actions">

        <MoreInfo fields={moreInfoFields} modalIds={modalIds} />

        <ChangeStatus
          id={payment.id_payment}
          currentStatus={payment.payment_status}
          onClick={handleNewPaymentStatus}
          token={token}
        />
        </span>
      </>
  );
};
  